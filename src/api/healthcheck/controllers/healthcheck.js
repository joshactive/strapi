module.exports = {
  async healthcheck(ctx) {
    try {
      // Simple healthcheck - just return OK if Strapi is running
      ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
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

