/**
 * Tennis Holiday Lifecycle Hooks
 * Auto-syncs Featured Locations when displayOnFrontEnd is toggled
 */

const featuredLocationSync = require('../../../utils/featured-location-sync');

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    // If created with displayOnFrontEnd: true, create Featured Location
    if (result.displayOnFrontEnd === true) {
      await featuredLocationSync.createFeaturedLocation({
        holidayId: result.id,
        holidayType: 'tennis-holiday',
        relation: 'tennis_holiday',
        ordering: result.ordering
      });
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;
    
    // Check if displayOnFrontEnd was changed
    const displayOnFrontEnd = result.displayOnFrontEnd;
    
    if (displayOnFrontEnd === true) {
      // Toggled ON - create/activate Featured Location
      await featuredLocationSync.createFeaturedLocation({
        holidayId: result.id,
        holidayType: 'tennis-holiday',
        relation: 'tennis_holiday',
        ordering: result.ordering
      });
    } else if (displayOnFrontEnd === false) {
      // Toggled OFF - remove Featured Location
      await featuredLocationSync.removeFeaturedLocation({
        holidayId: result.id,
        relation: 'tennis_holiday'
      });
    }
  },

  async afterDelete(event) {
    const { result } = event;
    
    // When holiday is deleted, remove its Featured Location
    await featuredLocationSync.removeFeaturedLocation({
      holidayId: result.id,
      relation: 'tennis_holiday'
    });
  }
};

