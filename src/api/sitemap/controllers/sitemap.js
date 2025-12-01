'use strict';

/**
 * A set of functions called "actions" for `sitemap`
 */

module.exports = {
  index: async (ctx, next) => {
    try {
      // 1. Fetch Sitemap Configuration
      const config = await strapi.documents('api::sitemap-config.sitemap-config').findFirst();
      
      if (!config) {
        ctx.status = 404;
        ctx.body = 'Sitemap configuration not found. Please configure it in the Admin Panel.';
        return;
      }

      const { baseUrl, includeHomepage } = config;
      const urls = [];

      // Add Homepage if configured
      if (includeHomepage) {
        urls.push({
          loc: baseUrl,
          priority: '1.0',
          changefreq: 'weekly',
        });
      }

      // 2. Fetch all Sitemap Patterns
      const patterns = await strapi.documents('api::sitemap-pattern.sitemap-pattern').findMany();

      // 3. Loop through patterns and fetch entries
      for (const patternEntry of patterns) {
        const { collectionName, pattern, priority, changeFrequency } = patternEntry;

        try {
          // Check if the collection type exists
          if (!strapi.contentTypes[collectionName]) {
            console.warn(`Sitemap: Collection type ${collectionName} not found.`);
            continue;
          }

          // Fetch all published entries for this collection type
          // We only need fields used in the pattern (e.g. slug) and updatedAt
          // But fetching all fields is safer for now unless we parse the pattern
          const entries = await strapi.documents(collectionName).findMany({
            status: 'published',
            populate: [], // Don't populate relations to keep it light
          });

          for (const entry of entries) {
            let urlPath = pattern;
            let validUrl = true;

            // Replace placeholders like [slug] with actual values
            // Supports multiple placeholders like /blog/[category]/[slug]
            const placeholders = urlPath.match(/\[([^\]]+)\]/g) || [];
            
            for (const placeholder of placeholders) {
              const fieldName = placeholder.replace('[', '').replace(']', '');
              const fieldValue = entry[fieldName];

              if (!fieldValue) {
                console.warn(`Sitemap: Field ${fieldName} missing for entry ID ${entry.id} in ${collectionName}. Skipping.`);
                validUrl = false;
                break;
              }

              urlPath = urlPath.replace(placeholder, fieldValue);
            }

            if (validUrl) {
              urls.push({
                loc: `${baseUrl}${urlPath}`,
                lastmod: entry.updatedAt,
                priority: priority,
                changefreq: changeFrequency,
              });
            }
          }
        } catch (err) {
          console.error(`Sitemap: Error processing pattern for ${collectionName}:`, err);
        }
      }

      // 4. Generate XML
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => {
    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date(url.lastmod || Date.now()).toISOString()}</lastmod>
    <changefreq>${url.changefreq || 'monthly'}</changefreq>
    <priority>${url.priority || '0.5'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

      ctx.set('Content-Type', 'application/xml');
      ctx.body = xml;

    } catch (err) {
      ctx.body = err;
    }
  }
};

