const crypto = require('crypto');

const warnMissingEnv = (key, helpText) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  console.warn(
    `⚠️  Missing ${key}. Generated an ephemeral value at runtime.${helpText ? ` ${helpText}` : ''}`
  );
};

const ensureSecret = (env, key, byteLength, helpText) => {
  const existing = env(key);

  if (existing) {
    return existing;
  }

  const generated = crypto.randomBytes(byteLength).toString('hex');
  process.env[key] = generated;
  warnMissingEnv(key, helpText);

  return generated;
};

module.exports = ({ env }) => {
  const adminJwtSecret = ensureSecret(
    env,
    'ADMIN_JWT_SECRET',
    32,
    'Set this in your environment to keep admin sessions stable across restarts.'
  );
  const apiTokenSalt = ensureSecret(
    env,
    'API_TOKEN_SALT',
    16,
    'Set this to avoid regenerating API tokens on each boot.'
  );
  const transferTokenSalt = ensureSecret(
    env,
    'TRANSFER_TOKEN_SALT',
    16,
    'Set this to keep transfer tokens consistent.'
  );

  return {
    auth: {
      secret: adminJwtSecret,
    },
    apiToken: {
      salt: apiTokenSalt,
    },
    transfer: {
      token: {
        salt: transferTokenSalt,
      },
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};
