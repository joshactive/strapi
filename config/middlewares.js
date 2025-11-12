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
  // Support both old R2 dev URL and custom domain during transition
  const r2CustomOrigin = toOrigin(env('R2_CUSTOM_DOMAIN', 'https://files.activeaway.com'));
  const r2PublicOrigin = toOrigin(env('R2_PUBLIC_URL'));
  const cloudflareImagesBaseOrigin = toOrigin(env('CF_IMAGES_BASE_URL'));
  const imageDeliveryOrigin = 'https://imagedelivery.net';

  const imgSrc = ["'self'", 'data:', 'blob:', imageDeliveryOrigin];
  const mediaSrc = ["'self'", 'data:', 'blob:'];
  const connectSrc = ["'self'", 'https:'];

  // Add custom domain
  if (r2CustomOrigin) {
    imgSrc.push(r2CustomOrigin);
    mediaSrc.push(r2CustomOrigin);
    connectSrc.push(r2CustomOrigin);
  }

  // Also add old R2 public URL for backwards compatibility with existing files
  if (r2PublicOrigin && r2PublicOrigin !== r2CustomOrigin) {
    imgSrc.push(r2PublicOrigin);
    mediaSrc.push(r2PublicOrigin);
    connectSrc.push(r2PublicOrigin);
  }

  if (cloudflareImagesBaseOrigin) {
    imgSrc.push(cloudflareImagesBaseOrigin);
    connectSrc.push(cloudflareImagesBaseOrigin);
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
    {
      name: 'strapi::cors',
      config: {
        origin: [
          'http://localhost:4321',
          'https://active-away-astro.pages.dev',
          'https://*.active-away-astro.pages.dev', // Preview deployments
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
