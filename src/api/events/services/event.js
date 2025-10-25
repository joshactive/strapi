'use strict';

/**
 * event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::events.event');
