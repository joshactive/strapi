'use strict';

/**
 * pre-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pre-order.pre-order');
