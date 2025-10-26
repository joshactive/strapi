const { syncFeaturedLocation, deleteFeaturedLocation } = require('../../../utils/sync-featured-location');

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    
    if (params?.data?.publishedAt === null) return;
    
    await syncFeaturedLocation({
      holidayType: 'tennis-holiday',
      relationField: 'tennis_holiday',
      documentId: result.documentId,
      displayOnFrontEnd: result.displayOnFrontEnd,
      ordering: result.ordering,
      title: result.title
    });
  },

  async afterUpdate(event) {
    const { result } = event;
    
    if (result.displayOnFrontEnd === undefined && result.ordering === undefined) return;
    
    await syncFeaturedLocation({
      holidayType: 'tennis-holiday',
      relationField: 'tennis_holiday',
      documentId: result.documentId,
      displayOnFrontEnd: result.displayOnFrontEnd,
      ordering: result.ordering,
      title: result.title
    });
  },

  // afterDelete intentionally not implemented - see pickleball-holiday for explanation
};
