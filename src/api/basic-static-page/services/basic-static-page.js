'use strict';

/**
 * basic-static-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::basic-static-page.basic-static-page');

