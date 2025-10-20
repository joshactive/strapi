'use strict';

const createHybridUploadProvider = require('./providers/upload-hybrid-cloudflare');

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    const uploadPlugin = strapi.plugin('upload');

    if (!uploadPlugin || !uploadPlugin.provider) {
      strapi.log.error('Cloudflare hybrid upload: base upload provider missing.');
      return;
    }

    const env = (key, fallback) => {
      const value = process.env[key];
      return value === undefined || value === '' ? fallback : value;
    };

    const hybridConfig = {
      cfAccountId: env('CF_ACCOUNT_ID'),
      cfImagesToken: env('CF_IMAGES_TOKEN'),
      r2AccessKeyId: env('R2_ACCESS_KEY_ID'),
      r2SecretAccessKey: env('R2_SECRET_ACCESS_KEY'),
      r2Endpoint: env('R2_ENDPOINT'),
      r2Bucket: env('R2_BUCKET'),
      r2PublicUrl: env('R2_PUBLIC_URL'),
      r2RootPath: env('R2_ROOT_PATH', ''),
      r2ACL: env('R2_ACL', 'private'),
    };

    const hybridProvider = createHybridUploadProvider.init(hybridConfig);

    Object.assign(uploadPlugin.provider, hybridProvider);

    try {
      strapi.config.set('plugin::upload.provider', 'cloudflare-hybrid');
    } catch (error) {
      strapi.log.debug(
        `Cloudflare hybrid upload: unable to set provider name (${error.message}).`
      );
    }

    strapi.log.info('Cloudflare hybrid upload provider initialized.');
  },
};
