const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const FormData = require("form-data");
const fetch = require("node-fetch");

module.exports = {
  init(config) {
    // S3 client for R2
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: config.r2AccessKeyId,
        secretAccessKey: config.r2SecretAccessKey,
      },
      endpoint: config.r2Endpoint,
      region: "auto",
    });

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

    return {
      async upload(file) {
        if (isImage(file)) {
          // Upload to Cloudflare Images
          try {
            const formData = new FormData();
            formData.append("file", file.stream || file.buffer, {
              filename: file.name,
              contentType: file.mime,
            });

            const response = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${config.cfAccountId}/images/v1`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config.cfImagesToken}`,
                },
                body: formData,
              }
            );

            const data = await response.json();

            if (!data.success) {
              throw new Error(`Cloudflare Images upload failed: ${JSON.stringify(data.errors)}`);
            }

            // Store the image ID and variants
            file.url = data.result.variants[0]; // Default variant
            file.cfImageId = data.result.id;
            file.cfVariants = data.result.variants;
            file.provider = "cloudflare-images";
            file.provider_metadata = {
              imageId: data.result.id,
              variants: data.result.variants,
            };
          } catch (error) {
            console.error("Cloudflare Images upload error:", error);
            throw error;
          }
        } else {
          // Upload to R2 for non-image files
          try {
            const key = `${config.r2RootPath ? config.r2RootPath + "/" : ""}${file.hash}${file.ext}`;

            await s3Client.send(
              new PutObjectCommand({
                Bucket: config.r2Bucket,
                Key: key,
                Body: file.stream || file.buffer,
                ContentType: file.mime,
                ACL: config.r2ACL || "private",
              })
            );

            file.url = `${config.r2PublicUrl}/${key}`;
            file.provider = "cloudflare-r2";
            file.provider_metadata = {
              bucket: config.r2Bucket,
              key: key,
            };
          } catch (error) {
            console.error("R2 upload error:", error);
            throw error;
          }
        }
      },

      async delete(file) {
        if (file.provider === "cloudflare-images" && file.cfImageId) {
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
        } else if (file.provider === "cloudflare-r2" && file.provider_metadata?.key) {
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

