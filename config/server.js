const crypto = require('crypto');

const buildAppKeys = (env) => {
  const existingKeys = env.array('APP_KEYS');

  if (Array.isArray(existingKeys) && existingKeys.length > 0) {
    return existingKeys;
  }

  const generatedKeys = Array.from({ length: 2 }, () =>
    crypto.randomBytes(32).toString('hex')
  );

  process.env.APP_KEYS = generatedKeys.join(',');

  if (process.env.NODE_ENV !== 'test') {
    console.warn(
      '⚠️  Missing APP_KEYS. Generated ephemeral keys; set APP_KEYS in your environment for stable cookies.'
    );
  }

  return generatedKeys;
};

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: buildAppKeys(env),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('URL'),
  proxy: true
});
