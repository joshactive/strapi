const crypto = require('crypto');

const ensureJwtSecret = (env) => {
  const existing = env('JWT_SECRET');

  if (existing) {
    return existing;
  }

  const generated = crypto.randomBytes(32).toString('hex');
  process.env.JWT_SECRET = generated;

  if (process.env.NODE_ENV !== 'test') {
    console.warn(
      '⚠️  Missing JWT_SECRET. Generated an ephemeral secret; set JWT_SECRET to keep user tokens valid across restarts.'
    );
  }

  return generated;
};

module.exports = ({ env }) => {
  const jwtSecret = ensureJwtSecret(env);

  return {
    "users-permissions": {
      config: {
        jwtSecret,
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
          // Use custom Active Away domain for public URLs
          baseUrl: env("R2_CUSTOM_DOMAIN", "https://files.activeaway.com"),
          rootPath: env("R2_ROOT_PATH", ""),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
