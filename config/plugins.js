module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: require("../src/providers/upload-hybrid-cloudflare"),
      providerOptions: {
        // Cloudflare Images configuration
        cfAccountId: env("CF_ACCOUNT_ID"),
        cfImagesToken: env("CF_IMAGES_TOKEN"),
        
        // R2 configuration for non-image files (PDFs, docs, etc.)
        r2AccessKeyId: env("R2_ACCESS_KEY_ID"),
        r2SecretAccessKey: env("R2_SECRET_ACCESS_KEY"),
        r2Endpoint: env("R2_ENDPOINT"), // e.g., https://ACCOUNT_ID.r2.cloudflarestorage.com
        r2Bucket: env("R2_BUCKET"),
        r2PublicUrl: env("R2_PUBLIC_URL"), // e.g., https://pub-xxx.r2.dev
        r2RootPath: env("R2_ROOT_PATH", ""),
        r2ACL: env("R2_ACL", "private"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
