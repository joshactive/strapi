/**
 * Junior Tennis Camp Lifecycle Hooks
 * Auto-syncs Featured Locations when displayOnFrontEnd is toggled
 */

const featuredLocationSync = require('../../../utils/featured-location-sync');

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    if (result.displayOnFrontEnd === true) {
      await featuredLocationSync.createFeaturedLocation({
        holidayId: result.id,
        holidayType: 'junior-tennis-camp',
        relation: 'junior_tennis_camp',
        ordering: result.ordering
      });
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    
    if (result.displayOnFrontEnd === true) {
      await featuredLocationSync.createFeaturedLocation({
        holidayId: result.id,
        holidayType: 'junior-tennis-camp',
        relation: 'junior_tennis_camp',
        ordering: result.ordering
      });
    } else if (result.displayOnFrontEnd === false) {
      await featuredLocationSync.removeFeaturedLocation({
        holidayId: result.id,
        relation: 'junior_tennis_camp'
      });
    }
  },

  async afterDelete(event) {
    const { result } = event;
    
    await featuredLocationSync.removeFeaturedLocation({
      holidayId: result.id,
      relation: 'junior_tennis_camp'
    });
  }
};

