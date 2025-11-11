module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/healthcheck',
      handler: 'healthcheck.healthcheck',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};

