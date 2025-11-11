module.exports = {
  async healthcheck(ctx) {
    try {
      // Check if Strapi is ready
      if (!strapi.isLoaded) {
        ctx.body = {
          status: 'starting',
          message: 'Strapi is still initializing'
        };
        ctx.status = 503; // Service Unavailable
        return;
      }

      // Optional: Quick database check
      try {
        await strapi.db.connection.raw('SELECT 1');
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
      ctx.body = {
        status: 'error',
        message: error.message
      };
      ctx.status = 500;
    }
  },
};

