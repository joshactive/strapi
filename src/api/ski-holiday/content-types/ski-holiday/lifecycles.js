/**
 * Ski Holiday Lifecycle Hooks
 * Auto-syncs Featured Locations when displayOnFrontEnd is toggled
 */

const featuredLocationSync = require('../../../utils/featured-location-sync');

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    if (result.displayOnFrontEnd === true) {
      await featuredLocationSync.createFeaturedLocation({
        holidayId: result.id,
        holidayType: 'ski-holiday',
        relation: 'ski_holiday',
        ordering: result.ordering
      });
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    
    if (result.displayOnFrontEnd === true) {
      await featuredLocationSync.createFeaturedLocation({
        holidayId: result.id,
        holidayType: 'ski-holiday',
        relation: 'ski_holiday',
        ordering: result.ordering
      });
    } else if (result.displayOnFrontEnd === false) {
      await featuredLocationSync.removeFeaturedLocation({
        holidayId: result.id,
        relation: 'ski_holiday'
      });
    }
  },

  async afterDelete(event) {
    const { result } = event;
    
    await featuredLocationSync.removeFeaturedLocation({
      holidayId: result.id,
      relation: 'ski_holiday'
    });
  }
};

