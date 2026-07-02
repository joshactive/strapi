'use strict';

const DEFAULT_TTL_MS = 60 * 1000;
const DEFAULT_MAX_ENTRIES = 250;
const DEFAULT_MAX_BODY_BYTES = 2 * 1024 * 1024;
const CACHEABLE_METHODS = new Set(['GET', 'HEAD']);

const toNonNegativeInt = (value, fallback) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

const toPositiveInt = (value, fallback) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const getBodySize = (body) => {
  if (body === null || body === undefined) {
    return 0;
  }

  if (Buffer.isBuffer(body)) {
    return body.byteLength;
  }

  if (typeof body === 'string') {
    return Buffer.byteLength(body);
  }

  return Buffer.byteLength(JSON.stringify(body));
};

const cloneBody = (body) => {
  if (body === null || body === undefined) {
    return body;
  }

  if (Buffer.isBuffer(body)) {
    return Buffer.from(body);
  }

  if (typeof body === 'object') {
    return JSON.parse(JSON.stringify(body));
  }

  return body;
};

const isCacheableRequest = (ctx) => {
  if (!CACHEABLE_METHODS.has(ctx.method)) {
    return false;
  }

  if (!ctx.path.startsWith('/api/')) {
    return false;
  }

  if (ctx.path.startsWith('/api/auth') || ctx.path.startsWith('/api/users')) {
    return false;
  }

  if (ctx.get('authorization')) {
    return false;
  }

  if (ctx.query?.publicationState === 'preview' || ctx.query?.status === 'draft') {
    return false;
  }

  return true;
};

const isCacheableResponse = (ctx) => {
  if (ctx.status < 200 || ctx.status >= 300) {
    return false;
  }

  if (!ctx.body || typeof ctx.body.pipe === 'function') {
    return false;
  }

  const contentType = ctx.response.get('content-type');

  return !contentType || contentType.includes('application/json');
};

module.exports = (config = {}) => {
  const ttlMs = toNonNegativeInt(config.ttlMs, DEFAULT_TTL_MS);
  const maxEntries = toPositiveInt(config.maxEntries, DEFAULT_MAX_ENTRIES);
  const maxBodyBytes = toPositiveInt(config.maxBodyBytes, DEFAULT_MAX_BODY_BYTES);
  const cache = new Map();

  const prune = () => {
    const now = Date.now();

    for (const [key, entry] of cache) {
      if (entry.expiresAt <= now) {
        cache.delete(key);
      }
    }

    while (cache.size > maxEntries) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }
  };

  return async (ctx, next) => {
    if (ttlMs === 0) {
      await next();
      return;
    }

    if (!isCacheableRequest(ctx)) {
      await next();
      return;
    }

    const key = `${ctx.method}:${ctx.originalUrl || ctx.url}`;
    const now = Date.now();
    const cached = cache.get(key);

    if (cached && cached.expiresAt > now) {
      ctx.status = cached.status;
      ctx.type = cached.type;
      ctx.body = cloneBody(cached.body);
      ctx.set('Cache-Control', cached.cacheControl);
      ctx.set('X-API-Cache', 'HIT');
      return;
    }

    if (cached) {
      cache.delete(key);
    }

    await next();

    if (!isCacheableResponse(ctx)) {
      return;
    }

    const body = cloneBody(ctx.body);
    const bodySize = getBodySize(body);

    if (bodySize > maxBodyBytes) {
      ctx.set('X-API-Cache', 'SKIP');
      return;
    }

    const cacheControl = `public, max-age=${Math.floor(ttlMs / 1000)}`;

    cache.set(key, {
      body,
      cacheControl,
      expiresAt: now + ttlMs,
      status: ctx.status,
      type: ctx.type,
    });

    prune();
    ctx.set('Cache-Control', cacheControl);
    ctx.set('X-API-Cache', 'MISS');
  };
};
