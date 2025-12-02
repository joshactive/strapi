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

export interface ApiAboutPageAboutPage extends Struct.SingleTypeSchema {
  collectionName: 'about_pages';
  info: {
    description: 'About Us page content';
    displayName: 'About Page';
    pluralName: 'about-pages';
    singularName: 'about-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    benefits: Schema.Attribute.Component<'sections.benefits-grid', false>;
    contentBlocks: Schema.Attribute.Component<
      'sections.flexible-content-block',
      true
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    dragonsDen: Schema.Attribute.Component<'sections.dragons-den', false>;
    faq: Schema.Attribute.Component<'sections.faq-section', false>;
    hero: Schema.Attribute.Component<'sections.about-hero', false>;
    history: Schema.Attribute.Component<'sections.history-timeline', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-page.about-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    showInstagram: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showWhatWeOffer: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    stats: Schema.Attribute.Component<'sections.stats-grid', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAirportTransfersPageAirportTransfersPage
  extends Struct.SingleTypeSchema {
  collectionName: 'airport_transfers_page';
  info: {
    description: 'Single page for airport transfers information';
    displayName: 'Airport Transfers Page';
    pluralName: 'airport-transfers-pages';
    singularName: 'airport-transfers-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contentsItems: Schema.Attribute.Component<'content.content-item', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    importantContent: Schema.Attribute.RichText;
    importantEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'IMPORTANT'>;
    keyInfoAccordions: Schema.Attribute.Component<
      'content.accordion-item',
      true
    >;
    keyInfoSubtitle: Schema.Attribute.Text;
    keyInfoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Key Information'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::airport-transfers-page.airport-transfers-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    pricingSubtitle: Schema.Attribute.Text;
    pricingTable: Schema.Attribute.Component<'content.pricing-row', true>;
    pricingTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Pricing'>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    showContents: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAnnouncementBarAnnouncementBar
  extends Struct.SingleTypeSchema {
  collectionName: 'announcement_bars';
  info: {
    description: 'Announcement bar displayed above header sitewide';
    displayName: 'Announcement Bar';
    pluralName: 'announcement-bars';
    singularName: 'announcement-bar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundColorEnd: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#0a1539'>;
    backgroundColorStart: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#0D1C4E'>;
    cookieName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'announcement-dismissed'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaHoverColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#ad986c'>;
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    ctaTextColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#FFFFFF'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isDismissible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::announcement-bar.announcement-bar'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    textColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#FFFFFF'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBasicStaticPageBasicStaticPage
  extends Struct.CollectionTypeSchema {
  collectionName: 'basic_static_pages';
  info: {
    description: 'Simple content pages (legal, info, etc.)';
    displayName: 'Basic Static Page';
    pluralName: 'basic-static-pages';
    singularName: 'basic-static-page';
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
    importantContent: Schema.Attribute.RichText;
    importantEyebrow: Schema.Attribute.String;
    importantHeading: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::basic-static-page.basic-static-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    pageType: Schema.Attribute.Enumeration<
      ['product-page', 'static-page', 'landing-page', 'campaign-page']
    > &
      Schema.Attribute.DefaultTo<'static-page'>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogPageBlogPage extends Struct.SingleTypeSchema {
  collectionName: 'blog_page';
  info: {
    description: 'Blog index page content';
    displayName: 'Blog Page';
    pluralName: 'blog-pages';
    singularName: 'blog-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    categories: Schema.Attribute.Component<'blog.category-item', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blog-page.blog-page'
    > &
      Schema.Attribute.Private;
    pageSubtitle: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Blog'>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogBlog extends Struct.CollectionTypeSchema {
  collectionName: 'blogs';
  info: {
    description: 'Blog posts with SEO optimization';
    displayName: 'Blog';
    pluralName: 'blogs';
    singularName: 'blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    authorFullName: Schema.Attribute.String & Schema.Attribute.Required;
    blogExcerpt: Schema.Attribute.Text;
    CategoryImport: Schema.Attribute.String;
    categorySlug: Schema.Attribute.Enumeration<
      [
        'tennis-coaching',
        'grand-slam-tennis',
        'padel-tennis',
        'ski-holidays',
        'tennis-camps',
        'tennis-clinics',
        'tennis-courts',
        'tennis-fitness',
        'tennis-holidays',
        'tennis-injuries',
        'tennis-rackets',
        'travel-tips',
        'uncategorized',
      ]
    > &
      Schema.Attribute.Required;
    content: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    CreationDate: Schema.Attribute.DateTime;
    headerImage: Schema.Attribute.Media<'images'>;
    image1600x400: Schema.Attribute.Media<'images'>;
    image2600x400: Schema.Attribute.Media<'images'>;
    imageForSocials1000x1000: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::blog.blog'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    seoMetaDescription: Schema.Attribute.Text;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    WPID: Schema.Attribute.String;
    wpOldUrl: Schema.Attribute.String;
    WPURL: Schema.Attribute.String;
    youtubeVideoUrl: Schema.Attribute.String;
  };
}

export interface ApiBookingProcessPageBookingProcessPage
  extends Struct.SingleTypeSchema {
  collectionName: 'booking_process_page';
  info: {
    description: 'Single page for booking process information with tabs';
    displayName: 'Booking Process Page';
    pluralName: 'booking-process-pages';
    singularName: 'booking-process-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accommodationExcludedContent: Schema.Attribute.RichText;
    accommodationExcludedTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Accommodation Excluded'>;
    accommodationIncludedContent: Schema.Attribute.RichText;
    accommodationIncludedTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Accommodation Included'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    generalInfoContent: Schema.Attribute.RichText;
    generalInfoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'General Info'>;
    introSubtitle: Schema.Attribute.Text;
    introTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'How to Book'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::booking-process-page.booking-process-page'
    > &
      Schema.Attribute.Private;
    makingChangesContent: Schema.Attribute.RichText;
    makingChangesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Making Changes'>;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoGuideTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Video Guide'>;
    videoGuideUrl: Schema.Attribute.String;
  };
}

export interface ApiDragonsDenPageDragonsDenPage
  extends Struct.SingleTypeSchema {
  collectionName: 'dragons_den_pages';
  info: {
    description: "Dragons' Den page content";
    displayName: "Dragons' Den Page";
    pluralName: 'dragons-den-pages';
    singularName: 'dragons-den-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contentBlock: Schema.Attribute.Component<
      'sections.flexible-content-block',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    faq: Schema.Attribute.Component<'sections.faq-section', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::dragons-den-page.dragons-den-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Component<'sections.quote-section', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    showProductsGrid: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    video1: Schema.Attribute.Component<'sections.video-content-block', false>;
    video2: Schema.Attribute.Component<'sections.video-content-block', false>;
  };
}

export interface ApiEventsPageEventsPage extends Struct.SingleTypeSchema {
  collectionName: 'events_pages';
  info: {
    description: 'Content for the /events page including hero section and SEO metadata';
    displayName: 'Events Page';
    pluralName: 'events-pages';
    singularName: 'events-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EVENTS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Browse All Events'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::events-page.events-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    day_off_guide: Schema.Attribute.String;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    isSoldOut: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    itinerary_url: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::events.event'> &
      Schema.Attribute.Private;
    price: Schema.Attribute.Decimal;
    product: Schema.Attribute.String;
    productLink: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    singleOccupancyPriceEvent: Schema.Attribute.Decimal;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venue_plain_text: Schema.Attribute.String;
    venueLink: Schema.Attribute.String;
    what_to_bring: Schema.Attribute.String;
    whatsapp_url: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiFaqCategoryFaqCategory extends Struct.CollectionTypeSchema {
  collectionName: 'faq_categories';
  info: {
    description: 'FAQ categories for different topics';
    displayName: 'FAQ Category';
    pluralName: 'faq-categories';
    singularName: 'faq-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    eyebrow: Schema.Attribute.String;
    faqSections: Schema.Attribute.Component<
      'sections.faq-category-section',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faq-category.faq-category'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqsIndexPageFaqsIndexPage extends Struct.SingleTypeSchema {
  collectionName: 'faqs_index_pages';
  info: {
    description: 'Main FAQs index page content';
    displayName: 'FAQs Index Page';
    pluralName: 'faqs-index-pages';
    singularName: 'faqs-index-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    gridHeading: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faqs-index-page.faqs-index-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
        'tennis-clinic',
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
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    ski_holiday: Schema.Attribute.Relation<
      'oneToOne',
      'api::ski-holiday.ski-holiday'
    >;
    tennis_clinic: Schema.Attribute.Relation<
      'oneToOne',
      'api::tennis-clinic.tennis-clinic'
    >;
    tennis_holiday: Schema.Attribute.Relation<
      'oneToOne',
      'api::tennis-holiday.tennis-holiday'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiFlightsPageFlightsPage extends Struct.SingleTypeSchema {
  collectionName: 'flights_pages';
  info: {
    description: 'Flights booking page content';
    displayName: 'Flights Page';
    pluralName: 'flights-pages';
    singularName: 'flights-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    formDescription: Schema.Attribute.RichText;
    formHeading: Schema.Attribute.String;
    introHeading: Schema.Attribute.String;
    introText: Schema.Attribute.RichText;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::flights-page.flights-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<'flights'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFormForm extends Struct.CollectionTypeSchema {
  collectionName: 'forms';
  info: {
    description: 'Dynamic forms with webhook integration';
    displayName: 'Form';
    pluralName: 'forms';
    singularName: 'form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    descriptionTitle: Schema.Attribute.String;
    displayOnArchive: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    excerpt: Schema.Attribute.Text & Schema.Attribute.Required;
    formFields: Schema.Attribute.JSON;
    formHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Submit Your Information'>;
    formLayout: Schema.Attribute.Enumeration<['one-column', 'two-column']> &
      Schema.Attribute.DefaultTo<'one-column'>;
    formSubtitle: Schema.Attribute.Text;
    formWebhookUrl: Schema.Attribute.Text;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroKicker: Schema.Attribute.String;
    heroSubtitle: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::form.form'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    showOtherOptions: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    submitButtonConditional: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    submitButtonConditionalField: Schema.Attribute.String;
    submitButtonConditionalOperator: Schema.Attribute.Enumeration<
      [
        'equals',
        'not_equals',
        'contain',
        'not_contain',
        'not_empty',
        'empty',
        'greater',
        'less',
      ]
    >;
    submitButtonConditionalValue: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    webhookFormat: Schema.Attribute.Enumeration<['labels', 'names']> &
      Schema.Attribute.DefaultTo<'labels'>;
  };
}

export interface ApiFormsPageFormsPage extends Struct.SingleTypeSchema {
  collectionName: 'forms_pages';
  info: {
    description: 'Content for the /forms archive page including hero section and SEO metadata';
    displayName: 'Forms Page';
    pluralName: 'forms-pages';
    singularName: 'forms-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GET IN TOUCH'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Get in touch with us using one of our contact forms below.'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Forms'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::forms-page.forms-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGroupOrganiserPageGroupOrganiserPage
  extends Struct.SingleTypeSchema {
  collectionName: 'group_organiser_pages';
  info: {
    description: 'Content for the /group-organiser page including hero section and SEO metadata';
    displayName: 'Group Organiser Page';
    pluralName: 'group-organiser-pages';
    singularName: 'group-organiser-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GROUP ORGANISERS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Group Organisers'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::group-organiser-page.group-organiser-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
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
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    eventsquerycommaseperated: Schema.Attribute.String;
    groupOrganiserImage: Schema.Attribute.Media<'images'>;
    groupOrganiserName: Schema.Attribute.String;
    groupOrganiserName2: Schema.Attribute.String;
    groupOrganiserOtherUrl: Schema.Attribute.String;
    groupOrganiserProduct: Schema.Attribute.String;
    groupOrganiserWhatsappUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::group-organiser.group-organiser'
    > &
      Schema.Attribute.Private;
    masterPageSlug: Schema.Attribute.String;
    masterPageType: Schema.Attribute.Enumeration<
      [
        'tennis-holiday',
        'padel-tennis-holiday',
        'pickleball-holiday',
        'tennis-clinic',
      ]
    >;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wpId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
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
    aboutContent: Schema.Attribute.Text;
    aboutDescription: Schema.Attribute.Text;
    aboutImage1: Schema.Attribute.Media<'images'>;
    aboutImage2: Schema.Attribute.Media<'images'>;
    aboutKicker: Schema.Attribute.String;
    aboutStat1: Schema.Attribute.String;
    aboutStat2: Schema.Attribute.String;
    aboutStat3: Schema.Attribute.String;
    aboutStat4: Schema.Attribute.String;
    aboutTitle: Schema.Attribute.String;
    accordion10Content: Schema.Attribute.RichText;
    accordion10Title: Schema.Attribute.String;
    accordion11Content: Schema.Attribute.RichText;
    accordion11Title: Schema.Attribute.String;
    accordion12Content: Schema.Attribute.RichText;
    accordion12Title: Schema.Attribute.String;
    accordion1Content: Schema.Attribute.RichText;
    accordion1Title: Schema.Attribute.String;
    accordion2Content: Schema.Attribute.RichText;
    accordion2Title: Schema.Attribute.String;
    accordion3Content: Schema.Attribute.RichText;
    accordion3Title: Schema.Attribute.String;
    accordion4Content: Schema.Attribute.RichText;
    accordion4Title: Schema.Attribute.String;
    accordion5Content: Schema.Attribute.RichText;
    accordion5Title: Schema.Attribute.String;
    accordion6Content: Schema.Attribute.RichText;
    accordion6Title: Schema.Attribute.String;
    accordion7Content: Schema.Attribute.RichText;
    accordion7Title: Schema.Attribute.String;
    accordion8Content: Schema.Attribute.RichText;
    accordion8Title: Schema.Attribute.String;
    accordion9Content: Schema.Attribute.RichText;
    accordion9Title: Schema.Attribute.String;
    accordionTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    headerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    headerImageMultiple: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    jamieMurrayButtonText: Schema.Attribute.String;
    jamieMurrayDescription: Schema.Attribute.Text;
    jamieMurrayImage: Schema.Attribute.Media<'images'>;
    jamieMurrayTitle: Schema.Attribute.String;
    jamieMurrayVideoUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::home.home'> &
      Schema.Attribute.Private;
    main_heading: Schema.Attribute.String;
    main_sub_heading: Schema.Attribute.String;
    partner1Logo: Schema.Attribute.Media<'images'>;
    partner1Name: Schema.Attribute.String;
    partner2Logo: Schema.Attribute.Media<'images'>;
    partner2Name: Schema.Attribute.String;
    partner3Logo: Schema.Attribute.Media<'images'>;
    partner3Name: Schema.Attribute.String;
    partner4Logo: Schema.Attribute.Media<'images'>;
    partner4Name: Schema.Attribute.String;
    partner5Logo: Schema.Attribute.Media<'images'>;
    partner5Name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    racketSpecialistBgImage: Schema.Attribute.Media<'images'>;
    racketSpecialistBullet1: Schema.Attribute.String;
    racketSpecialistBullet2: Schema.Attribute.String;
    racketSpecialistBullet3: Schema.Attribute.String;
    racketSpecialistBullet4: Schema.Attribute.String;
    racketSpecialistBullet5: Schema.Attribute.String;
    racketSpecialistBullet6: Schema.Attribute.String;
    racketSpecialistBullet7: Schema.Attribute.String;
    racketSpecialistBullet8: Schema.Attribute.String;
    racketSpecialistButtonText: Schema.Attribute.String;
    racketSpecialistDescription: Schema.Attribute.Text;
    racketSpecialistQuote: Schema.Attribute.Text;
    racketSpecialistQuoteAuthor: Schema.Attribute.String;
    racketSpecialistTitle: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    storiesGoogleIcon: Schema.Attribute.Media<'images'>;
    storiesSubtitle: Schema.Attribute.String;
    storiesTitle: Schema.Attribute.String;
    story1Avatar: Schema.Attribute.Media<'images'>;
    story1Date: Schema.Attribute.String;
    story1Name: Schema.Attribute.String;
    story1Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story1Text: Schema.Attribute.Text;
    story2Avatar: Schema.Attribute.Media<'images'>;
    story2Date: Schema.Attribute.String;
    story2Name: Schema.Attribute.String;
    story2Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story2Text: Schema.Attribute.Text;
    story3Avatar: Schema.Attribute.Media<'images'>;
    story3Date: Schema.Attribute.String;
    story3Name: Schema.Attribute.String;
    story3Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story3Text: Schema.Attribute.Text;
    story4Avatar: Schema.Attribute.Media<'images'>;
    story4Date: Schema.Attribute.String;
    story4Name: Schema.Attribute.String;
    story4Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story4Text: Schema.Attribute.Text;
    story5Avatar: Schema.Attribute.Media<'images'>;
    story5Date: Schema.Attribute.String;
    story5Name: Schema.Attribute.String;
    story5Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story5Text: Schema.Attribute.Text;
    story6Avatar: Schema.Attribute.Media<'images'>;
    story6Date: Schema.Attribute.String;
    story6Name: Schema.Attribute.String;
    story6Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story6Text: Schema.Attribute.Text;
    story7Avatar: Schema.Attribute.Media<'images'>;
    story7Date: Schema.Attribute.String;
    story7Name: Schema.Attribute.String;
    story7Rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    story7Text: Schema.Attribute.Text;
    testimonialImage1: Schema.Attribute.Media<'images'>;
    testimonialImage2: Schema.Attribute.Media<'images'>;
    testimonialImage3: Schema.Attribute.Media<'images'>;
    testimonialImage4: Schema.Attribute.Media<'images'>;
    thrivingCommunityBgImage: Schema.Attribute.Media<'images'>;
    thrivingCommunityBullet1: Schema.Attribute.String;
    thrivingCommunityBullet2: Schema.Attribute.String;
    thrivingCommunityBullet3: Schema.Attribute.String;
    thrivingCommunityBullet4: Schema.Attribute.String;
    thrivingCommunityBullet5: Schema.Attribute.String;
    thrivingCommunityBullet6: Schema.Attribute.String;
    thrivingCommunityBullet7: Schema.Attribute.String;
    thrivingCommunityBullet8: Schema.Attribute.String;
    thrivingCommunityButtonText: Schema.Attribute.String;
    thrivingCommunityDescription: Schema.Attribute.Text;
    thrivingCommunityImage1: Schema.Attribute.Media<'images'>;
    thrivingCommunityImage2: Schema.Attribute.Media<'images'>;
    thrivingCommunityTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whatDoWeOfferDescription: Schema.Attribute.Text;
    whatDoWeOfferTitle: Schema.Attribute.String;
  };
}

export interface ApiJamieMurrayPageJamieMurrayPage
  extends Struct.SingleTypeSchema {
  collectionName: 'jamie_murray_pages';
  info: {
    description: 'Jamie Murray Tennis Programme page content';
    displayName: 'Jamie Murray Page';
    pluralName: 'jamie-murray-pages';
    singularName: 'jamie-murray-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    faq: Schema.Attribute.Component<'sections.faq-section', false>;
    featuredLocationSlugs: Schema.Attribute.JSON;
    jamieMurrayProgramme: Schema.Attribute.Component<
      'sections.jamie-murray-programme',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::jamie-murray-page.jamie-murray-page'
    > &
      Schema.Attribute.Private;
    locationsEyebrow: Schema.Attribute.String;
    locationsHeading: Schema.Attribute.String;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Component<'sections.quote-section', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    showLocations: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<'jamie-murray-tennis-programme'>;
    title: Schema.Attribute.String;
    twoColumnContent: Schema.Attribute.Component<
      'sections.two-column-content',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiJoinTheTeamPageJoinTheTeamPage
  extends Struct.SingleTypeSchema {
  collectionName: 'join_the_team_page';
  info: {
    description: 'Join the team page with values, about us, and application form';
    displayName: 'Join The Team Page';
    pluralName: 'join-the-team-pages';
    singularName: 'join-the-team-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faq: Schema.Attribute.Component<'sections.faq-section', false>;
    formSection: Schema.Attribute.Component<
      'sales-landing.form-section',
      false
    >;
    learnAboutUs: Schema.Attribute.Component<'sections.discount-cta', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::join-the-team-page.join-the-team-page'
    > &
      Schema.Attribute.Private;
    ourValues: Schema.Attribute.Component<'sections.value-card', true>;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Component<'sections.quote-section', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    twoColumnContent: Schema.Attribute.Component<
      'sections.two-column-content',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    valuesEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHY JOIN US'>;
    valuesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Values'>;
  };
}

export interface ApiJuniorCampPageJuniorCampPage
  extends Struct.SingleTypeSchema {
  collectionName: 'junior_camp_pages';
  info: {
    description: 'Content for the /junior-tennis-camp page including hero section and SEO metadata';
    displayName: 'Junior Camp Page';
    pluralName: 'junior-camp-pages';
    singularName: 'junior-camp-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'JUNIOR TENNIS CAMPS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Junior Tennis Camps'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::junior-camp-page.junior-camp-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
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
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsSearchTerm: Schema.Attribute.String;
    googleMapsUrl: Schema.Attribute.String;
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.RichText;
    tennisCourtsInfo: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiNavigationMenuNavigationMenu
  extends Struct.SingleTypeSchema {
  collectionName: 'navigation_menus';
  info: {
    description: 'Website navigation menu configuration';
    displayName: 'Navigation Menu';
    pluralName: 'navigation-menus';
    singularName: 'navigation-menu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutMegaMenuCTA: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get in Touch'>;
    aboutMegaMenuCTAUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#contact'>;
    aboutMegaMenuItems: Schema.Attribute.Component<
      'navigation.mega-menu-item',
      true
    >;
    aboutMegaMenuTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn more about Active Away'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    datesFindYourNext: Schema.Attribute.Component<'navigation.text-link', true>;
    datesUsefulLinks: Schema.Attribute.Component<'navigation.text-link', true>;
    destinationsCategories: Schema.Attribute.Component<
      'navigation.destination-category',
      true
    >;
    destinationsMegaMenuCTA: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View All Destinations'>;
    destinationsMegaMenuCTAUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#all-destinations'>;
    destinationsMegaMenuTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Find your perfect destination'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::navigation-menu.navigation-menu'
    > &
      Schema.Attribute.Private;
    menuItems: Schema.Attribute.Component<'navigation.menu-item', true>;
    publishedAt: Schema.Attribute.DateTime;
    racketsMegaMenuItems: Schema.Attribute.Component<
      'navigation.mega-menu-item',
      true
    >;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPadelHolidayPagePadelHolidayPage
  extends Struct.SingleTypeSchema {
  collectionName: 'padel_holiday_pages';
  info: {
    description: 'Content for the /padel-tennis-holiday page including hero section and SEO metadata';
    displayName: 'Padel Holiday Page';
    pluralName: 'padel-holiday-pages';
    singularName: 'padel-holiday-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PADEL HOLIDAYS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Padel Holidays'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::padel-holiday-page.padel-holiday-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.RichText;
    boardBasisIncluded: Schema.Attribute.RichText;
    boardBasisLg: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    departureMonth: Schema.Attribute.String;
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
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    restaurants: Schema.Attribute.RichText;
    rooms: Schema.Attribute.Component<'shared.room', true>;
    roomsInformation: Schema.Attribute.RichText;
    roomsSubheading: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiPersonPerson extends Struct.CollectionTypeSchema {
  collectionName: 'people';
  info: {
    description: 'Team members and people';
    displayName: 'Person';
    pluralName: 'people';
    singularName: 'person';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnAboutPage: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    email: Schema.Attribute.Email;
    image: Schema.Attribute.Media<'images'>;
    linkedin: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::person.person'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.String;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPickleballHolidayPagePickleballHolidayPage
  extends Struct.SingleTypeSchema {
  collectionName: 'pickleball_holiday_pages';
  info: {
    description: 'Content for the /pickleball-holiday page including hero section and SEO metadata';
    displayName: 'Pickleball Holiday Page';
    pluralName: 'pickleball-holiday-pages';
    singularName: 'pickleball-holiday-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PICKLEBALL HOLIDAYS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Pickleball Holidays'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pickleball-holiday-page.pickleball-holiday-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.RichText;
    boardBasisIncluded: Schema.Attribute.RichText;
    boardBasisLg: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    departureMonth: Schema.Attribute.String;
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
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    restaurants: Schema.Attribute.RichText;
    rooms: Schema.Attribute.Component<'shared.room', true>;
    roomsInformation: Schema.Attribute.RichText;
    roomsSubheading: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiPlayAndWatchPagePlayAndWatchPage
  extends Struct.SingleTypeSchema {
  collectionName: 'play_and_watch_pages';
  info: {
    description: 'Content for the /play-and-watch page including hero section and SEO metadata';
    displayName: 'Play & Watch Page';
    pluralName: 'play-and-watch-pages';
    singularName: 'play-and-watch-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PLAY & WATCH'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Play & Watch Events'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::play-and-watch-page.play-and-watch-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    boardBasisIncluded: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    destinationAirport: Schema.Attribute.String;
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
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    flightSearching: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsUrl: Schema.Attribute.Text;
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    restaurants: Schema.Attribute.RichText;
    rooms: Schema.Attribute.Component<'shared.room', true>;
    roomsInformation: Schema.Attribute.RichText;
    roomsSubheading: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.String;
    tennisEvent: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    theEvent: Schema.Attribute.RichText;
    tickets: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whereWeStay: Schema.Attribute.RichText;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiPreOrderPreOrder extends Struct.CollectionTypeSchema {
  collectionName: 'pre_orders';
  info: {
    description: 'Pre-order entries with hero section, menu files, and dynamic forms';
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
    description: Schema.Attribute.Text;
    excerpt: Schema.Attribute.Text & Schema.Attribute.Required;
    formFields: Schema.Attribute.JSON;
    formWebhookUrl: Schema.Attribute.Text;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroKicker: Schema.Attribute.String;
    heroSubtitle: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pre-order.pre-order'
    > &
      Schema.Attribute.Private;
    menuFiles: Schema.Attribute.Media<'files', true>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wpid: Schema.Attribute.String;
    wpOldUrl: Schema.Attribute.String;
    wpurl: Schema.Attribute.String;
  };
}

export interface ApiPreOrdersPagePreOrdersPage extends Struct.SingleTypeSchema {
  collectionName: 'pre_orders_pages';
  info: {
    description: 'Content for the /pre-orders page including hero section and SEO metadata';
    displayName: 'Pre-Orders Page';
    pluralName: 'pre-orders-pages';
    singularName: 'pre-orders-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EXCLUSIVE OPPORTUNITIES'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Be the first to secure your spot for our upcoming events, tours, and special experiences. Limited availability.'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Pre-Orders'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pre-orders-page.pre-orders-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPrivacyPolicyPagePrivacyPolicyPage
  extends Struct.SingleTypeSchema {
  collectionName: 'privacy_policy_pages';
  info: {
    description: 'Content for the Privacy Policy page with dynamic sections and optional forms';
    displayName: 'Privacy Policy Page';
    pluralName: 'privacy-policy-pages';
    singularName: 'privacy-policy-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    introText: Schema.Attribute.RichText;
    lastUpdated: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::privacy-policy-page.privacy-policy-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Privacy Policy'>;
    publishedAt: Schema.Attribute.DateTime;
    sections: Schema.Attribute.Component<'privacy-policy.section', true>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProductPageProductPage extends Struct.CollectionTypeSchema {
  collectionName: 'product_pages';
  info: {
    description: 'Dynamic product category pages (Adult Tennis Holidays, Padel Holidays, etc.)';
    displayName: 'Product Page';
    pluralName: 'product-pages';
    singularName: 'product-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'adult-tennis',
        'padel',
        'pickleball',
        'junior-camp',
        'ski',
        'play-and-watch',
        'school-tour',
        'tennis-clinic',
        'tennis-academy',
      ]
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    destinations: Schema.Attribute.Component<
      'sections.destinations-config',
      false
    >;
    discount: Schema.Attribute.Component<'sections.discount-cta', false>;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    faq: Schema.Attribute.Component<'sections.faq-section', false>;
    hero: Schema.Attribute.Component<'sections.product-hero', false>;
    jamieMurray: Schema.Attribute.Component<
      'sections.jamie-murray-programme',
      false
    >;
    keyInformation: Schema.Attribute.Component<
      'sections.key-information',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-page.product-page'
    > &
      Schema.Attribute.Private;
    pageType: Schema.Attribute.Enumeration<
      ['product-page', 'static-page', 'landing-page', 'campaign-page']
    > &
      Schema.Attribute.DefaultTo<'product-page'>;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Component<'sections.quote-section', false>;
    schedule: Schema.Attribute.Component<'sections.schedule-table', false>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    twoColumnContent: Schema.Attribute.Component<
      'sections.two-column-content',
      false
    >;
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
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiRedirectRedirect extends Struct.CollectionTypeSchema {
  collectionName: 'redirects';
  info: {
    description: 'URL redirects managed in Strapi';
    displayName: 'Redirect';
    pluralName: 'redirects';
    singularName: 'redirect';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    destinationPath: Schema.Attribute.String & Schema.Attribute.Required;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::redirect.redirect'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    sourcePath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    statusCode: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 308;
          min: 301;
        },
        number
      > &
      Schema.Attribute.DefaultTo<302>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::review.review'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    reviewApplyTo: Schema.Attribute.Text;
    reviewDate: Schema.Attribute.Date;
    reviewName: Schema.Attribute.String;
    reviewRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    reviewUniqueId: Schema.Attribute.String;
    reviewUrl: Schema.Attribute.String;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSalesLandingPageSalesLandingPage
  extends Struct.CollectionTypeSchema {
  collectionName: 'sales_landing_pages';
  info: {
    description: 'Campaign style landing pages managed in Strapi';
    displayName: 'Sales Landing Page';
    pluralName: 'sales-landing-pages';
    singularName: 'sales-landing-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    featuresSection: Schema.Attribute.Component<
      'sales-landing.features-section',
      false
    >;
    formSection: Schema.Attribute.Component<
      'sales-landing.form-section',
      false
    >;
    gallerySection: Schema.Attribute.Component<
      'sales-landing.gallery-section',
      false
    >;
    hero: Schema.Attribute.Component<'sales-landing.hero', false>;
    highlightCards: Schema.Attribute.Component<
      'sales-landing.highlight-card',
      true
    >;
    introSection: Schema.Attribute.Component<
      'sales-landing.intro-section',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sales-landing-page.sales-landing-page'
    > &
      Schema.Attribute.Private;
    pageType: Schema.Attribute.Enumeration<
      ['product-page', 'static-page', 'landing-page', 'campaign-page']
    > &
      Schema.Attribute.DefaultTo<'landing-page'>;
    publishedAt: Schema.Attribute.DateTime;
    ratingHighlights: Schema.Attribute.Component<
      'sales-landing.rating-highlight',
      true
    >;
    reviewsSection: Schema.Attribute.Component<
      'sales-landing.reviews-section',
      false
    >;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    statsSection: Schema.Attribute.Component<
      'sales-landing.stats-section',
      false
    >;
    termsSection: Schema.Attribute.Component<
      'sales-landing.terms-section',
      false
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.String;
    boardBasisInfo: Schema.Attribute.RichText;
    cafeInformation: Schema.Attribute.RichText;
    carParkingInformation: Schema.Attribute.RichText;
    content: Schema.Attribute.RichText;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diningInformation: Schema.Attribute.RichText;
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
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    restaurants: Schema.Attribute.RichText;
    rooms: Schema.Attribute.Component<'shared.room', true>;
    roomsInformation: Schema.Attribute.RichText;
    roomsSubheading: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    tennisCourts: Schema.Attribute.RichText;
    tennisCourtsInfo: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    tennisStandard: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiSchoolTourPageSchoolTourPage
  extends Struct.SingleTypeSchema {
  collectionName: 'school_tour_pages';
  info: {
    description: 'Content for the /school-tennis-tour page including hero section and SEO metadata';
    displayName: 'School Tour Page';
    pluralName: 'school-tour-pages';
    singularName: 'school-tour-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SCHOOL TENNIS TOURS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our School Tennis Tours'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::school-tour-page.school-tour-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSearchResultsPageSearchResultsPage
  extends Struct.SingleTypeSchema {
  collectionName: 'search_results_page';
  info: {
    description: 'Checkfront booking search results page with hero and SEO';
    displayName: 'Search Results Page';
    pluralName: 'search-results-pages';
    singularName: 'search-results-page';
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
      'api::search-results-page.search-results-page'
    > &
      Schema.Attribute.Private;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false> &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSelfRatingGuidePageSelfRatingGuidePage
  extends Struct.SingleTypeSchema {
  collectionName: 'self_rating_guide_page';
  info: {
    description: 'Self-rating guide for Tennis, Padel, and Pickleball';
    displayName: 'Self Rating Guide Page';
    pluralName: 'self-rating-guide-pages';
    singularName: 'self-rating-guide-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    downloadGuideUrl: Schema.Attribute.String;
    introContent: Schema.Attribute.RichText;
    introTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::self-rating-guide-page.self-rating-guide-page'
    > &
      Schema.Attribute.Private;
    padelContent: Schema.Attribute.RichText;
    padelImage: Schema.Attribute.Media<'images'>;
    padelTitle: Schema.Attribute.String;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    pickleballContent: Schema.Attribute.RichText;
    pickleballImage: Schema.Attribute.Media<'images'>;
    pickleballTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    tennisContent: Schema.Attribute.RichText;
    tennisImage: Schema.Attribute.Media<'images'>;
    tennisTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSkiHolidayPageSkiHolidayPage
  extends Struct.SingleTypeSchema {
  collectionName: 'ski_holiday_pages';
  info: {
    description: 'Content for the /ski-holiday page including hero section and SEO metadata';
    displayName: 'Ski Holiday Page';
    pluralName: 'ski-holiday-pages';
    singularName: 'ski-holiday-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SKI HOLIDAYS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Ski Holidays'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ski-holiday-page.ski-holiday-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    distanceFromAirport: Schema.Attribute.String;
    emailAddress: Schema.Attribute.Email;
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsUrl: Schema.Attribute.Text;
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    rooms: Schema.Attribute.Component<'shared.room', true>;
    roomsInformation: Schema.Attribute.RichText;
    roomsSubheading: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancy: Schema.Attribute.Text;
    singleOccupancyShort: Schema.Attribute.Text;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    skiHolidayType: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisCourtRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiTeamTeam extends Struct.SingleTypeSchema {
  collectionName: 'teams';
  info: {
    description: 'Team members page content';
    displayName: 'Team';
    pluralName: 'teams';
    singularName: 'team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOnFrontEnd: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::team.team'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    teamMembers: Schema.Attribute.Component<'shared.team-member', true>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTennisAcademyPageTennisAcademyPage
  extends Struct.SingleTypeSchema {
  collectionName: 'tennis_academy_pages';
  info: {
    description: 'Content for the /tennis-academy page including hero section and SEO metadata';
    displayName: 'Tennis Academy Page';
    pluralName: 'tennis-academy-pages';
    singularName: 'tennis-academy-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TENNIS ACADEMIES'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Tennis Academies'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tennis-academy-page.tennis-academy-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    coach: Schema.Attribute.Component<'shared.coach', false>;
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
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    hostedExperiences: Schema.Attribute.Component<
      'shared.hosted-experience',
      true
    >;
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
    quickLinks: Schema.Attribute.Component<'shared.quick-link', true>;
    racketRental: Schema.Attribute.String;
    racketRentalInfo: Schema.Attribute.RichText;
    racketRentalUrl: Schema.Attribute.String;
    restaurantInformation: Schema.Attribute.RichText;
    roomsInformation: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    settingDescription: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    starRating: Schema.Attribute.String;
    tennisAvailability: Schema.Attribute.RichText;
    tennisCourtSurface: Schema.Attribute.String;
    tennisFacilities: Schema.Attribute.RichText;
    theHotel: Schema.Attribute.RichText;
    theTennis: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usefulResources: Schema.Attribute.Component<'shared.useful-resource', true>;
    venue: Schema.Attribute.String;
    venueName: Schema.Attribute.String;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiTennisClinicPageTennisClinicPage
  extends Struct.SingleTypeSchema {
  collectionName: 'tennis_clinic_pages';
  info: {
    description: 'Content for the /tennis-clinic page including hero section and SEO metadata';
    displayName: 'Tennis Clinic Page';
    pluralName: 'tennis-clinic-pages';
    singularName: 'tennis-clinic-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TENNIS CLINICS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Tennis Clinics'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tennis-clinic-page.tennis-clinic-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    bars: Schema.Attribute.RichText;
    belowHeadingText: Schema.Attribute.RichText;
    boardBasis: Schema.Attribute.RichText;
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
    excerpt: Schema.Attribute.Text;
    facilities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    featuredImage: Schema.Attribute.Media<'images'>;
    gallery: Schema.Attribute.Media<'images', true>;
    gettingThere: Schema.Attribute.RichText;
    googleMapsUrl: Schema.Attribute.String;
    guestRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
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
    mainGallery: Schema.Attribute.Media<'images', true>;
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
    restaurants: Schema.Attribute.RichText;
    saturdayItineraryUrl: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    sundayItineraryUrl: Schema.Attribute.String;
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
    tennisStandard: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topTips: Schema.Attribute.RichText;
    tripImages: Schema.Attribute.Media<'images', true>;
    typicalGroupSize: Schema.Attribute.String;
    uniqueValue: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venueFacilities: Schema.Attribute.RichText;
    venueName: Schema.Attribute.String;
    whatsIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whatsNotIncluded: Schema.Attribute.Component<'shared.inclusion-item', true>;
    whyWeLoveVenue1: Schema.Attribute.String;
    whyWeLoveVenue2: Schema.Attribute.String;
    whyWeLoveVenue3: Schema.Attribute.String;
    whyWeLoveVenue4: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiTennisHolidayPageTennisHolidayPage
  extends Struct.SingleTypeSchema {
  collectionName: 'tennis_holiday_pages';
  info: {
    description: 'Content for the /tennis-holiday page including hero section and SEO metadata';
    displayName: 'Tennis Holiday Page';
    pluralName: 'tennis-holiday-pages';
    singularName: 'tennis-holiday-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TENNIS HOLIDAYS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover Our Tennis Holidays'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tennis-holiday-page.tennis-holiday-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    test: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    headerImage: Schema.Attribute.Media<'images'>;
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
    roomOptions: Schema.Attribute.Component<'shared.room-option', true>;
    rooms: Schema.Attribute.Component<'shared.room', true>;
    roomsSubheading: Schema.Attribute.Text;
    schoolToursAvailableMonths: Schema.Attribute.String;
    schoolToursLengthOfTrip: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    setting: Schema.Attribute.RichText;
    shortLocationName: Schema.Attribute.String;
    singleOccupancyFrom: Schema.Attribute.Decimal;
    singleOccupancyRange: Schema.Attribute.String;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
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
    tripImages: Schema.Attribute.Media<'images', true>;
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
    wpOldUrl: Schema.Attribute.String;
  };
}

export interface ApiTermsPageTermsPage extends Struct.SingleTypeSchema {
  collectionName: 'terms_pages';
  info: {
    description: 'Content for the Terms and Conditions page';
    displayName: 'Terms and Conditions Page';
    pluralName: 'terms-pages';
    singularName: 'terms-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    academyTerms: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    creditNotesTerms: Schema.Attribute.RichText;
    generalTerms: Schema.Attribute.RichText;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    holidaysTerms: Schema.Attribute.RichText;
    introText: Schema.Attribute.RichText;
    juniorCampsTerms: Schema.Attribute.RichText;
    lastUpdated: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::terms-page.terms-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Booking Terms & Conditions'>;
    publishedAt: Schema.Attribute.DateTime;
    schoolToursTerms: Schema.Attribute.RichText;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID &
      Schema.Attribute.DefaultTo<'booking-terms-conditions'>;
    touristTaxTerms: Schema.Attribute.RichText;
    ukClinicsTerms: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTravelGuidesPageTravelGuidesPage
  extends Struct.SingleTypeSchema {
  collectionName: 'travel_guides_page';
  info: {
    description: 'Single page for travel notices and guides';
    displayName: 'Travel Guides Page';
    pluralName: 'travel-guides-pages';
    singularName: 'travel-guides-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contentsTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contents'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    importantContent: Schema.Attribute.RichText;
    importantEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'IMPORTANT'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::travel-guides-page.travel-guides-page'
    > &
      Schema.Attribute.Private;
    notices: Schema.Attribute.Component<'content.notice-item', true>;
    noticesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Travel Notices'>;
    pageHero: Schema.Attribute.Component<'sections.page-hero', false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    showContents: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVenuesPageVenuesPage extends Struct.SingleTypeSchema {
  collectionName: 'venues_pages';
  info: {
    description: 'Content for the /venues page including hero section and SEO metadata';
    displayName: 'Venues Page';
    pluralName: 'venues-pages';
    singularName: 'venues-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredSectionDescription: Schema.Attribute.Text;
    featuredSectionTitle: Schema.Attribute.String;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ALL DESTINATIONS'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Discover our complete collection of tennis, padel, pickleball, and ski holidays across the world. Filter by type, location, and price to find your perfect getaway.'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Explore All Venues'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::venues-page.venues-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'All Venues - Active Away'>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVideoArchivePageVideoArchivePage
  extends Struct.SingleTypeSchema {
  collectionName: 'video_archive_pages';
  info: {
    description: 'Content for the /videos page including hero section and SEO metadata';
    displayName: 'Video Archive Page';
    pluralName: 'video-archive-pages';
    singularName: 'video-archive-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    heroKicker: Schema.Attribute.String & Schema.Attribute.DefaultTo<'VIDEOS'>;
    heroSubtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::video-archive-page.video-archive-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoCategory: Schema.Attribute.String;
    videoDescription: Schema.Attribute.Text;
    videoTitle: Schema.Attribute.String;
    wpId: Schema.Attribute.Integer & Schema.Attribute.Unique;
    wpOldUrl: Schema.Attribute.String;
    youtubeUrl: Schema.Attribute.String;
  };
}

export interface ApiWelcomepacksPageWelcomepacksPage
  extends Struct.SingleTypeSchema {
  collectionName: 'welcomepacks_page';
  info: {
    description: 'Welcome packs archive page with hero and SEO fields';
    displayName: 'Welcomepacks Page';
    pluralName: 'welcomepacks-pages';
    singularName: 'welcomepacks-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WELCOME PACKS'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Download your event itineraries and travel information'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Welcome Packs'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::welcomepacks-page.welcomepacks-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiWhatsappGroupsPageWhatsappGroupsPage
  extends Struct.SingleTypeSchema {
  collectionName: 'whatsapp_groups_page';
  info: {
    description: 'WhatsApp groups page with password protection and hero fields';
    displayName: 'WhatsApp Groups Page';
    pluralName: 'whatsapp-groups-pages';
    singularName: 'whatsapp-groups-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accessPassword: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'activeaway2024'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBackgroundImage: Schema.Attribute.Media<'images'>;
    heroKicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'COMMUNITY'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Join your event WhatsApp group to connect with fellow participants'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WhatsApp Groups'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::whatsapp-groups-page.whatsapp-groups-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    sitemap: Schema.Attribute.Component<'shared.sitemap', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
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
      'api::about-page.about-page': ApiAboutPageAboutPage;
      'api::airport-transfers-page.airport-transfers-page': ApiAirportTransfersPageAirportTransfersPage;
      'api::announcement-bar.announcement-bar': ApiAnnouncementBarAnnouncementBar;
      'api::basic-static-page.basic-static-page': ApiBasicStaticPageBasicStaticPage;
      'api::blog-page.blog-page': ApiBlogPageBlogPage;
      'api::blog.blog': ApiBlogBlog;
      'api::booking-process-page.booking-process-page': ApiBookingProcessPageBookingProcessPage;
      'api::dragons-den-page.dragons-den-page': ApiDragonsDenPageDragonsDenPage;
      'api::events-page.events-page': ApiEventsPageEventsPage;
      'api::events.event': ApiEventsEvent;
      'api::faq-category.faq-category': ApiFaqCategoryFaqCategory;
      'api::faqs-index-page.faqs-index-page': ApiFaqsIndexPageFaqsIndexPage;
      'api::featured-location.featured-location': ApiFeaturedLocationFeaturedLocation;
      'api::flights-page.flights-page': ApiFlightsPageFlightsPage;
      'api::form.form': ApiFormForm;
      'api::forms-page.forms-page': ApiFormsPageFormsPage;
      'api::group-organiser-page.group-organiser-page': ApiGroupOrganiserPageGroupOrganiserPage;
      'api::group-organiser.group-organiser': ApiGroupOrganiserGroupOrganiser;
      'api::home.home': ApiHomeHome;
      'api::jamie-murray-page.jamie-murray-page': ApiJamieMurrayPageJamieMurrayPage;
      'api::join-the-team-page.join-the-team-page': ApiJoinTheTeamPageJoinTheTeamPage;
      'api::junior-camp-page.junior-camp-page': ApiJuniorCampPageJuniorCampPage;
      'api::junior-tennis-camp.junior-tennis-camp': ApiJuniorTennisCampJuniorTennisCamp;
      'api::navigation-menu.navigation-menu': ApiNavigationMenuNavigationMenu;
      'api::padel-holiday-page.padel-holiday-page': ApiPadelHolidayPagePadelHolidayPage;
      'api::padel-tennis-holiday.padel-tennis-holiday': ApiPadelTennisHolidayPadelTennisHoliday;
      'api::person.person': ApiPersonPerson;
      'api::pickleball-holiday-page.pickleball-holiday-page': ApiPickleballHolidayPagePickleballHolidayPage;
      'api::pickleball-holiday.pickleball-holiday': ApiPickleballHolidayPickleballHoliday;
      'api::play-and-watch-page.play-and-watch-page': ApiPlayAndWatchPagePlayAndWatchPage;
      'api::play-and-watch.play-and-watch': ApiPlayAndWatchPlayAndWatch;
      'api::pre-order.pre-order': ApiPreOrderPreOrder;
      'api::pre-orders-page.pre-orders-page': ApiPreOrdersPagePreOrdersPage;
      'api::privacy-policy-page.privacy-policy-page': ApiPrivacyPolicyPagePrivacyPolicyPage;
      'api::product-page.product-page': ApiProductPageProductPage;
      'api::product.product': ApiProductProduct;
      'api::redirect.redirect': ApiRedirectRedirect;
      'api::review.review': ApiReviewReview;
      'api::sales-landing-page.sales-landing-page': ApiSalesLandingPageSalesLandingPage;
      'api::school-tennis-tour.school-tennis-tour': ApiSchoolTennisTourSchoolTennisTour;
      'api::school-tour-page.school-tour-page': ApiSchoolTourPageSchoolTourPage;
      'api::search-results-page.search-results-page': ApiSearchResultsPageSearchResultsPage;
      'api::self-rating-guide-page.self-rating-guide-page': ApiSelfRatingGuidePageSelfRatingGuidePage;
      'api::ski-holiday-page.ski-holiday-page': ApiSkiHolidayPageSkiHolidayPage;
      'api::ski-holiday.ski-holiday': ApiSkiHolidaySkiHoliday;
      'api::team.team': ApiTeamTeam;
      'api::tennis-academy-page.tennis-academy-page': ApiTennisAcademyPageTennisAcademyPage;
      'api::tennis-academy.tennis-academy': ApiTennisAcademyTennisAcademy;
      'api::tennis-clinic-page.tennis-clinic-page': ApiTennisClinicPageTennisClinicPage;
      'api::tennis-clinic.tennis-clinic': ApiTennisClinicTennisClinic;
      'api::tennis-holiday-page.tennis-holiday-page': ApiTennisHolidayPageTennisHolidayPage;
      'api::tennis-holiday.tennis-holiday': ApiTennisHolidayTennisHoliday;
      'api::terms-page.terms-page': ApiTermsPageTermsPage;
      'api::travel-guides-page.travel-guides-page': ApiTravelGuidesPageTravelGuidesPage;
      'api::venues-page.venues-page': ApiVenuesPageVenuesPage;
      'api::video-archive-page.video-archive-page': ApiVideoArchivePageVideoArchivePage;
      'api::video.video': ApiVideoVideo;
      'api::welcomepacks-page.welcomepacks-page': ApiWelcomepacksPageWelcomepacksPage;
      'api::whatsapp-groups-page.whatsapp-groups-page': ApiWhatsappGroupsPageWhatsappGroupsPage;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
