module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/sitemap.xml',
      handler: 'sitemap.index',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};

