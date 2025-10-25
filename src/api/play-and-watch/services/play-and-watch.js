'use strict';

/**
 * play-and-watch service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::play-and-watch.play-and-watch');
