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

const mb = (value) => value * 1024 * 1024;

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
    {
      name: 'strapi::compression',
      config: {
        br: true,
        gzip: true,
        deflate: true,
        threshold: '1kb',
      },
    },
    {
      name: 'global::public-api-cache',
      config: {
        ttlMs: env.int('API_RESPONSE_CACHE_TTL_MS', 60 * 1000),
        maxEntries: env.int('API_RESPONSE_CACHE_MAX_ENTRIES', 250),
        maxBodyBytes: env.int('API_RESPONSE_CACHE_MAX_BODY_BYTES', 2 * 1024 * 1024),
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    {
      name: 'strapi::body',
      config: {
        multipart: true,
        jsonLimit: env('BODY_JSON_LIMIT', '10mb'),
        formLimit: env('BODY_FORM_LIMIT', '10mb'),
        textLimit: env('BODY_TEXT_LIMIT', '1mb'),
        formidable: {
          maxFileSize: env.int('UPLOAD_MAX_FILE_SIZE_BYTES', env.int('UPLOAD_MAX_FILE_SIZE', mb(250))),
          maxTotalFileSize: env.int(
            'UPLOAD_MAX_TOTAL_FILE_SIZE_BYTES',
            env.int('UPLOAD_MAX_TOTAL_FILE_SIZE', mb(750))
          ),
        },
      },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
