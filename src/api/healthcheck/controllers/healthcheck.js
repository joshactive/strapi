module.exports = {
  async healthcheck(ctx) {
    try {
      // Check if Strapi global is available and loaded
      if (typeof strapi === 'undefined' || !strapi) {
        ctx.body = {
          status: 'starting',
          message: 'Strapi is initializing'
        };
        ctx.status = 503;
        return;
      }

      if (!strapi.isLoaded) {
        ctx.body = {
          status: 'starting',
          message: 'Strapi is loading'
        };
        ctx.status = 503;
        return;
      }

      // Quick database check
      try {
        if (strapi.db && strapi.db.connection) {
          await strapi.db.connection.raw('SELECT 1');
        }
      } catch (dbError) {
        ctx.body = {
          status: 'degraded',
          message: 'Database connection issue',
          error: dbError.message
        };
        ctx.status = 503;
        return;
      }

      // Everything is healthy
      ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'production'
      };
      ctx.status = 200;
    } catch (error) {
      // Log error for debugging
      console.error('Healthcheck error:', error);
      ctx.body = {
        status: 'error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      };
      ctx.status = 500;
    }
  },
};

