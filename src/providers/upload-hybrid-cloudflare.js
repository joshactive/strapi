const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const FormData = require("form-data");
const fetch = require("node-fetch");

const DEFAULT_UPLOAD_CONCURRENCY = 4;
const DEFAULT_UPLOAD_TIMEOUT_MS = 300000;

const toPositiveInt = (value, fallback) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const createLimiter = (maxConcurrent) => {
  const limit = toPositiveInt(maxConcurrent, DEFAULT_UPLOAD_CONCURRENCY);
  const queue = [];
  let active = 0;

  const runNext = () => {
    if (active >= limit || queue.length === 0) {
      return;
    }

    const { fn, resolve, reject } = queue.shift();
    active += 1;

    Promise.resolve()
      .then(fn)
      .then(resolve, reject)
      .finally(() => {
        active -= 1;
        runNext();
      });
  };

  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      runNext();
    });
};

module.exports = {
  init(config) {
    // Check if configuration is complete
    const hasCloudflareImages = config.cfAccountId && config.cfImagesToken;
    const hasR2Config = config.r2AccessKeyId && config.r2SecretAccessKey && config.r2Endpoint && config.r2Bucket;

    if (!hasCloudflareImages && !hasR2Config) {
      console.warn("⚠️  Cloudflare upload provider: No credentials configured. Upload functionality will be limited.");
      console.warn("⚠️  Please set CF_ACCOUNT_ID, CF_IMAGES_TOKEN, R2_* environment variables in Railway.");
    }

    const uploadTimeoutMs = toPositiveInt(config.uploadTimeoutMs, DEFAULT_UPLOAD_TIMEOUT_MS);
    const runLimitedUpload = createLimiter(config.uploadConcurrency);

    const withUploadTimeout = async (label, operation) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), uploadTimeoutMs);

      try {
        return await operation(controller.signal);
      } catch (error) {
        if (error.name === "AbortError") {
          throw new Error(`${label} timed out after ${uploadTimeoutMs}ms`);
        }

        throw error;
      } finally {
        clearTimeout(timeout);
      }
    };

    // S3 client for R2 (only if configured)
    let s3Client = null;
    if (hasR2Config) {
      try {
        s3Client = new S3Client({
          credentials: {
            accessKeyId: config.r2AccessKeyId,
            secretAccessKey: config.r2SecretAccessKey,
          },
          endpoint: config.r2Endpoint,
          region: "auto",
        });
      } catch (error) {
        console.error("Failed to initialize R2 client:", error.message);
      }
    }

    const isImage = (file) => {
      const imageMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/bmp",
        "image/tiff",
      ];
      return imageMimeTypes.includes(file.mime);
    };

    const getFileBody = (file) => {
      if (typeof file.stream === "function") {
        return file.stream();
      }

      return file.stream || file.buffer;
    };

    const normalizeBaseUrl = (rawUrl) => {
      if (!rawUrl) {
        return null;
      }

      try {
        const url = new URL(rawUrl);
        return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
      } catch (error) {
        console.warn(
          `⚠️  Cloudflare upload provider: Invalid CF_IMAGES_BASE_URL "${rawUrl}". Falling back to default variants.`
        );
        return null;
      }
    };

    const buildImageVariantUrls = (result, baseUrl) => {
      if (!baseUrl) {
        return {
          defaultUrl: result.variants[0],
          variants: result.variants,
          metadataVariants: result.variants.map((url) => ({ name: null, url, originalUrl: url })),
        };
      }

      const sanitizedBase = normalizeBaseUrl(baseUrl);

      if (!sanitizedBase) {
        return {
          defaultUrl: result.variants[0],
          variants: result.variants,
          metadataVariants: result.variants.map((url) => ({ name: null, url, originalUrl: url })),
        };
      }

      const rewrittenVariants = result.variants.map((variantUrl) => {
        try {
          const url = new URL(variantUrl);
          const segments = url.pathname.split("/").filter(Boolean);
          const variantName = segments.pop() || "public";
          const customUrl = `${sanitizedBase}/${result.id}/${variantName}`;

          return {
            name: variantName,
            url: customUrl,
            originalUrl: variantUrl,
          };
        } catch (error) {
          console.warn("⚠️  Cloudflare upload provider: unable to parse variant URL:", variantUrl);
          return {
            name: null,
            url: variantUrl,
            originalUrl: variantUrl,
          };
        }
      });

      return {
        defaultUrl: rewrittenVariants[0]?.url || result.variants[0],
        variants: rewrittenVariants.map((item) => item.url),
        metadataVariants: rewrittenVariants,
      };
    };

    return {
      async upload(file) {
        return runLimitedUpload(async () => {
          if (isImage(file) && hasCloudflareImages) {
            // Upload to Cloudflare Images
            try {
              const formData = new FormData();
              const fileBody = getFileBody(file);

              if (!fileBody) {
                throw new Error("No readable file body was provided by Strapi.");
              }

              formData.append("file", fileBody, {
                filename: file.name,
                contentType: file.mime,
              });

              const response = await withUploadTimeout("Cloudflare Images upload", (signal) =>
                fetch(
                  `https://api.cloudflare.com/client/v4/accounts/${config.cfAccountId}/images/v1`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${config.cfImagesToken}`,
                    },
                    body: formData,
                    signal,
                  }
                )
              );

              const data = await response.json();

              if (!data.success) {
                throw new Error(`Cloudflare Images upload failed: ${JSON.stringify(data.errors)}`);
              }

              // Store the image ID and variants
              const { defaultUrl, variants, metadataVariants } = buildImageVariantUrls(
                data.result,
                config.cfImagesBaseUrl
              );

              file.url = defaultUrl;
              file.cfImageId = data.result.id;
              file.cfVariants = variants;
              file.provider = "cloudflare-images";
              file.provider_metadata = {
                imageId: data.result.id,
                variants,
                originalVariants: data.result.variants,
                variantMetadata: metadataVariants,
              };
            } catch (error) {
              console.error("Cloudflare Images upload error:", error);
              throw new Error(`Failed to upload image to Cloudflare Images: ${error.message}`);
            }
          } else if (!isImage(file) && hasR2Config && s3Client) {
            // Upload to R2 for non-image files
            try {
              const key = `${config.r2RootPath ? config.r2RootPath + "/" : ""}${file.hash}${file.ext}`;
              const fileBody = getFileBody(file);

              if (!fileBody) {
                throw new Error("No readable file body was provided by Strapi.");
              }

              await withUploadTimeout("R2 upload", (abortSignal) =>
                s3Client.send(
                  new PutObjectCommand({
                    Bucket: config.r2Bucket,
                    Key: key,
                    Body: fileBody,
                    ContentType: file.mime,
                    ACL: config.r2ACL || "private",
                  }),
                  { abortSignal }
                )
              );

              file.url = `${config.r2PublicUrl}/${key}`;
              file.provider = "cloudflare-r2";
              file.provider_metadata = {
                bucket: config.r2Bucket,
                key: key,
              };
            } catch (error) {
              console.error("R2 upload error:", error);
              throw new Error(`Failed to upload file to R2: ${error.message}`);
            }
          } else {
            // No valid configuration available
            throw new Error(
              `Upload failed: Cloudflare credentials not configured. ` +
              `Please set CF_ACCOUNT_ID, CF_IMAGES_TOKEN, and R2_* environment variables in Railway. ` +
              `See HYBRID_SETUP.md for instructions.`
            );
          }
        });
      },

      async delete(file) {
        if (file.provider === "cloudflare-images" && file.cfImageId && hasCloudflareImages) {
          // Delete from Cloudflare Images
          try {
            const response = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${config.cfAccountId}/images/v1/${file.cfImageId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${config.cfImagesToken}`,
                },
              }
            );

            const data = await response.json();

            if (!data.success) {
              console.error("Cloudflare Images delete failed:", data.errors);
            }
          } catch (error) {
            console.error("Cloudflare Images delete error:", error);
          }
        } else if (file.provider === "cloudflare-r2" && file.provider_metadata?.key && hasR2Config && s3Client) {
          // Delete from R2
          try {
            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: config.r2Bucket,
                Key: file.provider_metadata.key,
              })
            );
          } catch (error) {
            console.error("R2 delete error:", error);
          }
        }
      },

      uploadStream(file) {
        return this.upload(file);
      },

      async isPrivate() {
        return false;
      },

      async getSignedUrl(file) {
        // Cloudflare Images are always public
        // R2 files can use signed URLs if needed
        return { url: file.url };
      },
    };
  },
};
