module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("R2_ACCESS_KEY_ID"),
            secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
          },
          endpoint: env("R2_ENDPOINT"),
          region: "auto",
          params: {
            Bucket: env("R2_BUCKET"),
          },
        },
        baseUrl: env("R2_PUBLIC_URL"),
        rootPath: env("R2_ROOT_PATH", ""),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
