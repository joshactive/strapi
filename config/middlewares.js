const toOrigin = (value) => {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return value;
  }
};

module.exports = ({ env }) => {
  const r2PublicOrigin = toOrigin(env('R2_PUBLIC_URL'));
  const imageDeliveryOrigin = 'https://imagedelivery.net';

  const imgSrc = ["'self'", 'data:', 'blob:', imageDeliveryOrigin];
  const mediaSrc = ["'self'", 'data:', 'blob:'];
  const connectSrc = ["'self'", 'https:'];

  if (r2PublicOrigin) {
    imgSrc.push(r2PublicOrigin);
    mediaSrc.push(r2PublicOrigin);
    connectSrc.push(r2PublicOrigin);
  }

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': connectSrc,
            'img-src': imgSrc,
            'media-src': mediaSrc,
            'script-src': ["'self'", "'unsafe-inline'", 'https:'],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
