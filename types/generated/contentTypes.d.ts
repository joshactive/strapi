import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiEventsEvent extends Struct.CollectionTypeSchema {
  collectionName: 'events';
  info: {
    displayName: 'Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    boardBasisEvent: Schema.Attribute.String;
    bookingLink: Schema.Attribute.String;
    buttonColour: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    countryEvents: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dateFrom: Schema.Attribute.Date & Schema.Attribute.Required;
    dateText: Schema.Attribute.String;
    dateUntil: Schema.Attribute.Date & Schema.Attribute.Required;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    isSoldOut: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::events.event'> &
      Schema.Attribute.Private;
    price: Schema.Attribute.Decimal;
    product: Schema.Attribute.String;
    productLink: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    singleOccupancyPriceEvent: Schema.Attribute.Decimal;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueLink: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiFeaturedLocationFeaturedLocation
  extends Struct.CollectionTypeSchema {
  collectionName: 'featured_locations';
  info: {
    description: 'Manage featured locations for homepage carousel';
    displayName: 'Featured Location';
    pluralName: 'featured-locations';
    singularName: 'featured-location';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    holiday_type: Schema.Attribute.Enumeration<
      [
        'tennis-holiday',
        'pickleball-holiday',
        'junior-tennis-camp',
        'padel-tennis-holiday',
        'play-and-watch',
        'ski-holiday',
      ]
    > &
      Schema.Attribute.Required;
    junior_tennis_camp: Schema.Attribute.Relation<
      'oneToOne',
      'api::junior-tennis-camp.junior-tennis-camp'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::featured-location.featured-location'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    padel_tennis_holiday: Schema.Attribute.Relation<
      'oneToOne',
      'api::padel-tennis-holiday.padel-tennis-holiday'
    >;
    pickleball_holiday: Schema.Attribute.Relation<
      'oneToOne',
      'api::pickleball-holiday.pickleball-holiday'
    >;
    play_and_watch: Schema.Attribute.Relation<
      'oneToOne',
      'api::play-and-watch.play-and-watch'
    >;
    publishedAt: Schema.Attribute.DateTime;
    ski_holiday: Schema.Attribute.Relation<
      'oneToOne',
      'api::ski-holiday.ski-holiday'
    >;
    tennis_holiday: Schema.Attribute.Relation<
      'oneToOne',
      'api::tennis-holiday.tennis-holiday'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGroupOrganiserGroupOrganiser
  extends Struct.CollectionTypeSchema {
  collectionName: 'group_organisers';
  info: {
    description: 'Group organiser venues and packages';
    displayName: 'Group Organiser';
    pluralName: 'group-organisers';
    singularName: 'group-organiser';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    airport: Schema.Attribute.String;
    airportTransfer: Schema.Attribute.String;
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.RichText;
    boardBasisLg: Schema.Attribute.String;
    bookCardioImage: Schema.Attribute.Media<'images'>;
    bookCardioInfo: Schema.Attribute.RichText;
    bookCardioLink: Schema.Attribute.String;
    bookCourtsImage: Schema.Attribute.Media<'images'>;
    bookCourtsInfo: Schema.Attribute.RichText;
    bookCourtsLink: Schema.Attribute.String;
    bookLessonsImage: Schema.Attribute.Media<'images'>;
    bookLessonsInfo: Schema.Attribute.RichText;
    bookLessonsLink: Schema.Attribute.String;
    bookRacketsImage: Schema.Attribute.Media<'images'>;
    bookRacketsInfo: Schema.Attribute.RichText;
    bookRacketsLink: Schema.Attribute.String;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    countryLg: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diningRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    emailAddress: Schema.Attribute.Email;
    eventInformation: Schema.Attribute.RichText;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    facilitiesExtraInfo: Schema.Attribute.Text;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    fullScreenVideo: Schema.Attribute.String;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.String;
    groupOrganiserImage: Schema.Attribute.Media<'images'>;
    groupOrganiserName: Schema.Attribute.String;
    groupOrganiserName2: Schema.Attribute.String;
    groupOrganiserOtherUrl: Schema.Attribute.String;
    groupOrganiserProduct: Schema.Attribute.String;
    groupOrganiserWhatsappUrl: Schema.Attribute.String;
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    headingText: Schema.Attribute.String;
    howWeGetAround: Schema.Attribute.RichText;
    internalRating: Schema.Attribute.Decimal;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.String;
    itineraryDownloadUrl2: Schema.Attribute.String;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::group-organiser.group-organiser'
    > &
      Schema.Attribute.Private;
    lunchInfo: Schema.Attribute.RichText;
    mainGallery: Schema.Attribute.Media<'images', true>;
    mainHeader: Schema.Attribute.String;
    mainHeaderImage: Schema.Attribute.Media<'images'>;
    maximumGroupSize: Schema.Attribute.Integer;
    otherFaqsUrl: Schema.Attribute.String;
    ourRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    padelCourtsInfo: Schema.Attribute.RichText;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    residentialType: Schema.Attribute.String;
    restaurants: Schema.Attribute.RichText;
    schoolToursAvailableMonths: Schema.Attribute.String;
    schoolToursLengthOfTrip: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancyFrom: Schema.Attribute.Decimal;
    singleOccupancyRange: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    tennisCoachImage: Schema.Attribute.Media<'images'>;
    tennisCoachInfo: Schema.Attribute.RichText;
    tennisCoachName: Schema.Attribute.String;
    tennisCoachWhatsappUrl: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.Integer;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venue: Schema.Attribute.String & Schema.Attribute.Required;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whereWeStay: Schema.Attribute.RichText;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiHomeHome extends Struct.SingleTypeSchema {
  collectionName: 'homes';
  info: {
    displayName: 'Home';
    pluralName: 'homes';
    singularName: 'home';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    header_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::home.home'> &
      Schema.Attribute.Private;
    main_heading: Schema.Attribute.String;
    main_sub_heading: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiJuniorTennisCampJuniorTennisCamp
  extends Struct.CollectionTypeSchema {
  collectionName: 'junior_tennis_camps';
  info: {
    displayName: 'Junior Tennis Camp';
    pluralName: 'junior-tennis-camps';
    singularName: 'junior-tennis-camp';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ageGroups: Schema.Attribute.String;
    airport: Schema.Attribute.String;
    barInformation: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diningInformation: Schema.Attribute.RichText;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.String;
    googleMapsUrl: Schema.Attribute.String;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    introductionText: Schema.Attribute.RichText;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.String;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::junior-tennis-camp.junior-tennis-camp'
    > &
      Schema.Attribute.Private;
    lunchInformation: Schema.Attribute.RichText;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    maximumGroupSize: Schema.Attribute.Integer;
    monthAvailable: Schema.Attribute.String;
    numberOfCourts: Schema.Attribute.String;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.String;
    ourRating: Schema.Attribute.Decimal;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    residentialOrNonResidential: Schema.Attribute.String;
    restaurantInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'>;
    tennisCourtsInfo: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiPadelTennisHolidayPadelTennisHoliday
  extends Struct.CollectionTypeSchema {
  collectionName: 'padel_tennis_holidays';
  info: {
    displayName: 'Padel Tennis Holiday';
    pluralName: 'padel-tennis-holidays';
    singularName: 'padel-tennis-holiday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    airport: Schema.Attribute.String;
    arrivalDepartureDay: Schema.Attribute.String;
    barInformation: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    boardBasisIncluded: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    departureMonth: Schema.Attribute.String;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    distanceFromAirport: Schema.Attribute.String;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.Text;
    googleMapsUrl: Schema.Attribute.Text;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.Text;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::padel-tennis-holiday.padel-tennis-holiday'
    > &
      Schema.Attribute.Private;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    moreInformation: Schema.Attribute.RichText;
    numberOfPadelCourts: Schema.Attribute.String;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.Text;
    ourRating: Schema.Attribute.Decimal;
    padelCourtsInfo: Schema.Attribute.RichText;
    padelCourtSurface: Schema.Attribute.String;
    padelStandard: Schema.Attribute.String;
    perfectFor: Schema.Attribute.String;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    restaurantInformation: Schema.Attribute.RichText;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiPickleballHolidayPickleballHoliday
  extends Struct.CollectionTypeSchema {
  collectionName: 'pickleball_holidays';
  info: {
    displayName: 'Pickleball Holiday';
    pluralName: 'pickleball-holidays';
    singularName: 'pickleball-holiday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    airport: Schema.Attribute.String;
    arrivalDepartureDay: Schema.Attribute.String;
    barInformation: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    boardBasisIncluded: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    departureMonth: Schema.Attribute.String;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    distanceFromAirport: Schema.Attribute.String;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.Text;
    googleMapsUrl: Schema.Attribute.Text;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.Text;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pickleball-holiday.pickleball-holiday'
    > &
      Schema.Attribute.Private;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    moreInformation: Schema.Attribute.RichText;
    numberOfPickleballCourts: Schema.Attribute.String;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.Text;
    ourRating: Schema.Attribute.Decimal;
    perfectFor: Schema.Attribute.String;
    pickleballCourtsInfo: Schema.Attribute.RichText;
    pickleballCourtSurface: Schema.Attribute.String;
    pickleballStandard: Schema.Attribute.String;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    restaurantInformation: Schema.Attribute.RichText;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiPlayAndWatchPlayAndWatch
  extends Struct.CollectionTypeSchema {
  collectionName: 'play_and_watches';
  info: {
    displayName: 'Play & Watch';
    pluralName: 'play-and-watches';
    singularName: 'play-and-watch';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arrivalDepartureDay: Schema.Attribute.String;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    boardBasisIncluded: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    destinationAirport: Schema.Attribute.String;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    flightSearching: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsUrl: Schema.Attribute.Text;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    howWeGetAround: Schema.Attribute.RichText;
    importantInfoAboutFlights: Schema.Attribute.RichText;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.Text;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-and-watch.play-and-watch'
    > &
      Schema.Attribute.Private;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    mapsAddress: Schema.Attribute.Text;
    moreInformation: Schema.Attribute.RichText;
    nonPlayerInformation: Schema.Attribute.RichText;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.Text;
    ourRating: Schema.Attribute.Decimal;
    perfectFor: Schema.Attribute.String;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourts: Schema.Attribute.String;
    tennisEvent: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    theEvent: Schema.Attribute.RichText;
    tickets: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whereWeStay: Schema.Attribute.RichText;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiPreOrderPreOrder extends Struct.CollectionTypeSchema {
  collectionName: 'pre_orders';
  info: {
    displayName: 'Pre-Order';
    pluralName: 'pre-orders';
    singularName: 'pre-order';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pre-order.pre-order'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    displayName: 'Product';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    excerpt: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    priceFrom: Schema.Attribute.Decimal;
    productDescription: Schema.Attribute.RichText;
    productImage: Schema.Attribute.Media<'images'>;
    productTitle: Schema.Attribute.String;
    productUrl: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiReviewReview extends Struct.CollectionTypeSchema {
  collectionName: 'reviews';
  info: {
    displayName: 'Review';
    pluralName: 'reviews';
    singularName: 'review';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    excerpt: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::review.review'
    > &
      Schema.Attribute.Private;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    publishedAt: Schema.Attribute.DateTime;
    reviewApplyTo: Schema.Attribute.Text;
    reviewDate: Schema.Attribute.Date;
    reviewerText: Schema.Attribute.RichText;
    reviewName: Schema.Attribute.String;
    reviewUniqueId: Schema.Attribute.String;
    reviewUrl: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiSchoolTennisTourSchoolTennisTour
  extends Struct.CollectionTypeSchema {
  collectionName: 'school_tennis_tours';
  info: {
    displayName: 'School Tennis Tour';
    pluralName: 'school-tennis-tours';
    singularName: 'school-tennis-tour';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ageGroups: Schema.Attribute.String;
    airport: Schema.Attribute.String;
    availableMonths: Schema.Attribute.String;
    barInformation: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diningInformation: Schema.Attribute.RichText;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    distanceFromAirport: Schema.Attribute.String;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.String;
    googleMapsUrl: Schema.Attribute.String;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    introductionText: Schema.Attribute.RichText;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.String;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::school-tennis-tour.school-tennis-tour'
    > &
      Schema.Attribute.Private;
    lunchInformation: Schema.Attribute.RichText;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    maximumGroupSize: Schema.Attribute.Integer;
    monthAvailable: Schema.Attribute.String;
    numberOfCourts: Schema.Attribute.String;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.String;
    ourRating: Schema.Attribute.Decimal;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    residentialOrNonResidential: Schema.Attribute.String;
    restaurantInformation: Schema.Attribute.RichText;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourtsInfo: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiSkiHolidaySkiHoliday extends Struct.CollectionTypeSchema {
  collectionName: 'ski_holidays';
  info: {
    displayName: 'Ski Holiday';
    pluralName: 'ski-holidays';
    singularName: 'ski-holiday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    airport: Schema.Attribute.String;
    arrivalDepartureDay: Schema.Attribute.String;
    averageGroupSize: Schema.Attribute.String;
    barInformation: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    boardBasisIncluded: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    departureMonth: Schema.Attribute.String;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    distanceFromAirport: Schema.Attribute.String;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsUrl: Schema.Attribute.Text;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.Text;
    lengthOfTrip: Schema.Attribute.String;
    levelOfSkiing: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ski-holiday.ski-holiday'
    > &
      Schema.Attribute.Private;
    locationAddress: Schema.Attribute.Text;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    moreInformation: Schema.Attribute.RichText;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.Text;
    ourRating: Schema.Attribute.Decimal;
    perfectFor: Schema.Attribute.String;
    pistes: Schema.Attribute.String;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    restaurantInformation: Schema.Attribute.RichText;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    skiHolidayType: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiTennisAcademyTennisAcademy
  extends Struct.CollectionTypeSchema {
  collectionName: 'tennis_academies';
  info: {
    displayName: 'Tennis Academy';
    pluralName: 'tennis-academies';
    singularName: 'tennis-academy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutTennisProgramme: Schema.Attribute.RichText;
    adultGroupLessonInfo: Schema.Attribute.RichText;
    airport: Schema.Attribute.String;
    barInformation: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    bookingTheHotel: Schema.Attribute.RichText;
    bookingTheTennis: Schema.Attribute.RichText;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    courtRental: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    distanceFromAirport: Schema.Attribute.String;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.String;
    googleMapsUrl: Schema.Attribute.String;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    hittingPartner: Schema.Attribute.String;
    hittingPartnerInfo: Schema.Attribute.RichText;
    hittingPartnerUrl: Schema.Attribute.String;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    individualLessonInfo: Schema.Attribute.RichText;
    individualLessons: Schema.Attribute.String;
    individualLessonsUrl: Schema.Attribute.String;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.String;
    kidsAndAdults: Schema.Attribute.String;
    kidsGroupLessonInfo: Schema.Attribute.RichText;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tennis-academy.tennis-academy'
    > &
      Schema.Attribute.Private;
    locationForMap: Schema.Attribute.String;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    maximumGroupSize: Schema.Attribute.Integer;
    numberOfCourts: Schema.Attribute.String;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.String;
    ourRating: Schema.Attribute.Decimal;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    racketRental: Schema.Attribute.String;
    racketRentalInfo: Schema.Attribute.RichText;
    racketRentalUrl: Schema.Attribute.String;
    restaurantInformation: Schema.Attribute.RichText;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisAvailability: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    tennisFacilities: Schema.Attribute.RichText;
    theHotel: Schema.Attribute.RichText;
    theTennis: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiTennisClinicTennisClinic
  extends Struct.CollectionTypeSchema {
  collectionName: 'tennis_clinics';
  info: {
    displayName: 'Tennis Clinic';
    pluralName: 'tennis-clinics';
    singularName: 'tennis-clinic';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.Text;
    availableMonths: Schema.Attribute.String;
    belowHeadingText: Schema.Attribute.RichText;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    clinicMonth: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    county: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dateClinic: Schema.Attribute.Text;
    daysAvailable: Schema.Attribute.String;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsUrl: Schema.Attribute.String;
    headerImage: Schema.Attribute.Media<'images'>;
    headingText: Schema.Attribute.Text;
    inclusions: Schema.Attribute.Component<'shared.inclusion-item', true>;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tennis-clinic.tennis-clinic'
    > &
      Schema.Attribute.Private;
    locationForPage: Schema.Attribute.String;
    mainHeader: Schema.Attribute.String;
    mainInformation: Schema.Attribute.RichText;
    maximumGroupSize: Schema.Attribute.Integer;
    numberOfCourts: Schema.Attribute.String;
    oneDayOrTwoDay: Schema.Attribute.String;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    otherFaqsUrl: Schema.Attribute.String;
    ourRating: Schema.Attribute.Decimal;
    perfectFor: Schema.Attribute.String;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    saturdayItineraryUrl: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    shortLocationName: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'>;
    sundayItineraryUrl: Schema.Attribute.String;
    tennisCourtSurface: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueFacilities: Schema.Attribute.RichText;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
  };
}

export interface ApiTennisHolidayTennisHoliday
  extends Struct.CollectionTypeSchema {
  collectionName: 'tennis_holidays';
  info: {
    description: 'Tennis holiday destinations and packages';
    displayName: 'Tennis Holiday';
    pluralName: 'tennis-holidays';
    singularName: 'tennis-holiday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    airport: Schema.Attribute.String;
    airportTransfer: Schema.Attribute.String;
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.RichText;
    boardBasisLg: Schema.Attribute.String;
    bookCardioImage: Schema.Attribute.Media<'images'>;
    bookCardioInfo: Schema.Attribute.RichText;
    bookCardioLink: Schema.Attribute.String;
    bookCourtsImage: Schema.Attribute.Media<'images'>;
    bookCourtsInfo: Schema.Attribute.RichText;
    bookCourtsLink: Schema.Attribute.String;
    bookLessonsImage: Schema.Attribute.Media<'images'>;
    bookLessonsInfo: Schema.Attribute.RichText;
    bookLessonsLink: Schema.Attribute.String;
    bookRacketsImage: Schema.Attribute.Media<'images'>;
    bookRacketsInfo: Schema.Attribute.RichText;
    bookRacketsLink: Schema.Attribute.String;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    countryLg: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diningRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    emailAddress: Schema.Attribute.Email;
    eventInformation: Schema.Attribute.RichText;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    facilitiesExtraInfo: Schema.Attribute.Text;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    featuredImageLg: Schema.Attribute.Media<'images'>;
    fullScreenVideo: Schema.Attribute.String;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.String;
    groupOrganiserImage: Schema.Attribute.Media<'images'>;
    groupOrganiserName: Schema.Attribute.String;
    groupOrganiserName2: Schema.Attribute.String;
    groupOrganiserOtherUrl: Schema.Attribute.String;
    groupOrganiserProduct: Schema.Attribute.String;
    groupOrganiserWhatsappUrl: Schema.Attribute.String;
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    headingText: Schema.Attribute.String;
    howWeGetAround: Schema.Attribute.RichText;
    internalRating: Schema.Attribute.Decimal;
    itinerary: Schema.Attribute.Component<'shared.itinerary-item', true>;
    itineraryDownloadUrl: Schema.Attribute.String;
    itineraryDownloadUrl2: Schema.Attribute.String;
    keyInformation: Schema.Attribute.Component<'shared.key-information', true>;
    lengthOfTrip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tennis-holiday.tennis-holiday'
    > &
      Schema.Attribute.Private;
    lunchInfo: Schema.Attribute.RichText;
    mainGallery: Schema.Attribute.Media<'images', true>;
    mainHeader: Schema.Attribute.String;
    mainHeaderImage: Schema.Attribute.Media<'images'>;
    maximumGroupSize: Schema.Attribute.Integer;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<99>;
    otherFaqsUrl: Schema.Attribute.String;
    ourRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    padelCourtsInfo: Schema.Attribute.RichText;
    priceFrom: Schema.Attribute.Decimal;
    productType: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    residentialType: Schema.Attribute.String;
    restaurants: Schema.Attribute.RichText;
    schoolToursAvailableMonths: Schema.Attribute.String;
    schoolToursLengthOfTrip: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancyFrom: Schema.Attribute.Decimal;
    singleOccupancyRange: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    tennisCoachImage: Schema.Attribute.Media<'images'>;
    tennisCoachInfo: Schema.Attribute.RichText;
    tennisCoachName: Schema.Attribute.String;
    tennisCoachWhatsappUrl: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    typicalGroupSize: Schema.Attribute.Integer;
    uniqueValue: Schema.Attribute.String;
    uniqueValueForGrid: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venue: Schema.Attribute.String & Schema.Attribute.Required;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whereWeStay: Schema.Attribute.RichText;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiVideoVideo extends Struct.CollectionTypeSchema {
  collectionName: 'videos';
  info: {
    displayName: 'Video';
    pluralName: 'videos';
    singularName: 'video';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    excerpt: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::video.video'> &
      Schema.Attribute.Private;
    ordering: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<50>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoCategory: Schema.Attribute.String;
    videoDescription: Schema.Attribute.Text;
    videoTitle: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    youtubeUrl: Schema.Attribute.String;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginStrapi5SitemapPluginStrapi5SitemapPluginContentType
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_5_sitemap_plugin_content_types';
  info: {
    displayName: 'strapi-5-sitemap-plugin-content-type';
    pluralName: 'strapi-5-sitemap-plugin-content-types';
    singularName: 'strapi-5-sitemap-plugin-content-type';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    frequency: Schema.Attribute.String;
    langcode: Schema.Attribute.String;
    lastModified: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type'
    > &
      Schema.Attribute.Private;
    pattern: Schema.Attribute.String;
    priority: Schema.Attribute.Float;
    publishedAt: Schema.Attribute.DateTime;
    thumbnail: Schema.Attribute.String;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginStrapi5SitemapPluginStrapi5SitemapPluginContentTypeSingleUrl
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_5_sitemap_plugin_content_type_single_urls';
  info: {
    displayName: 'strapi-5-sitemap-plugin-content-type-single-url';
    pluralName: 'strapi-5-sitemap-plugin-content-type-single-urls';
    singularName: 'strapi-5-sitemap-plugin-content-type-single-url';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    frequency: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Float;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginStrapi5SitemapPluginStrapi5SitemapPluginOption
  extends Struct.SingleTypeSchema {
  collectionName: 'strapi_5_sitemap_plugin_options';
  info: {
    displayName: 'strapi-5-sitemap-plugin-options';
    pluralName: 'strapi-5-sitemap-plugin-options';
    singularName: 'strapi-5-sitemap-plugin-option';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    baseUrl: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::events.event': ApiEventsEvent;
      'api::featured-location.featured-location': ApiFeaturedLocationFeaturedLocation;
      'api::group-organiser.group-organiser': ApiGroupOrganiserGroupOrganiser;
      'api::home.home': ApiHomeHome;
      'api::junior-tennis-camp.junior-tennis-camp': ApiJuniorTennisCampJuniorTennisCamp;
      'api::padel-tennis-holiday.padel-tennis-holiday': ApiPadelTennisHolidayPadelTennisHoliday;
      'api::pickleball-holiday.pickleball-holiday': ApiPickleballHolidayPickleballHoliday;
      'api::play-and-watch.play-and-watch': ApiPlayAndWatchPlayAndWatch;
      'api::pre-order.pre-order': ApiPreOrderPreOrder;
      'api::product.product': ApiProductProduct;
      'api::review.review': ApiReviewReview;
      'api::school-tennis-tour.school-tennis-tour': ApiSchoolTennisTourSchoolTennisTour;
      'api::ski-holiday.ski-holiday': ApiSkiHolidaySkiHoliday;
      'api::tennis-academy.tennis-academy': ApiTennisAcademyTennisAcademy;
      'api::tennis-clinic.tennis-clinic': ApiTennisClinicTennisClinic;
      'api::tennis-holiday.tennis-holiday': ApiTennisHolidayTennisHoliday;
      'api::video.video': ApiVideoVideo;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type': PluginStrapi5SitemapPluginStrapi5SitemapPluginContentType;
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url': PluginStrapi5SitemapPluginStrapi5SitemapPluginContentTypeSingleUrl;
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option': PluginStrapi5SitemapPluginStrapi5SitemapPluginOption;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
