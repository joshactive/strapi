const { syncFeaturedLocation, deleteFeaturedLocation } = require('../../../utils/sync-featured-location');

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    
    // Only sync for published documents
    if (params?.data?.publishedAt === null) {
      console.log(`⏭️  Skipping sync for draft: ${result.title}`);
      return;
    }
    
    await syncFeaturedLocation({
      holidayType: 'pickleball-holiday',
      relationField: 'pickleball_holiday',
      documentId: result.documentId,
      displayOnFrontEnd: result.displayOnFrontEnd,
      ordering: result.ordering,
      title: result.title
    });
  },

  async afterUpdate(event) {
    const { result } = event;
    
    // Only sync if displayOnFrontEnd or ordering fields are present
    if (result.displayOnFrontEnd === undefined && result.ordering === undefined) {
      console.log(`⏭️  Skipping sync (no relevant fields changed): ${result.title}`);
      return;
    }
    
    await syncFeaturedLocation({
      holidayType: 'pickleball-holiday',
      relationField: 'pickleball_holiday',
      documentId: result.documentId,
      displayOnFrontEnd: result.displayOnFrontEnd,
      ordering: result.ordering,
      title: result.title
    });
  },

  // afterDelete is intentionally not implemented
  // Strapi v5 triggers delete events during publish operations
  // The syncFeaturedLocation function handles cleanup when displayOnFrontEnd = false
};
