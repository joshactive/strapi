import type { Schema, Struct } from '@strapi/strapi';

export interface ContentAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_content_accordion_items';
  info: {
    description: 'Accordion item with title and markdown content';
    displayName: 'Accordion Item';
    icon: 'align-justify';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentContentItem extends Struct.ComponentSchema {
  collectionName: 'components_content_content_items';
  info: {
    description: 'Table of contents item with label and anchor';
    displayName: 'Content Item';
    icon: 'list';
  };
  attributes: {
    anchor: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentNoticeItem extends Struct.ComponentSchema {
  collectionName: 'components_content_notice_items';
  info: {
    description: 'Travel notice/guide item with title and markdown content';
    displayName: 'Notice Item';
    icon: 'exclamation-triangle';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentPricingRow extends Struct.ComponentSchema {
  collectionName: 'components_content_pricing_rows';
  info: {
    description: 'Pricing table row with route, price, and notes';
    displayName: 'Pricing Row';
    icon: 'dollar-sign';
  };
  attributes: {
    notes: Schema.Attribute.Text;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    route: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationDestinationCategory extends Struct.ComponentSchema {
  collectionName: 'components_navigation_destination_categories';
  info: {
    description: 'Category grouping for destinations in mega menu';
    displayName: 'Destination Category';
  };
  attributes: {
    destinations: Schema.Attribute.Component<
      'navigation.destination-item',
      true
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationDestinationItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_destination_items';
  info: {
    description: 'Individual destination link';
    displayName: 'Destination Item';
  };
  attributes: {
    country: Schema.Attribute.String;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationMegaMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_mega_menu_items';
  info: {
    description: 'Mega menu dropdown item';
    displayName: 'Mega Menu Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    gradient: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'from-purple-500 to-purple-600'>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    description: 'Navigation menu item';
    displayName: 'Menu Item';
  };
  attributes: {
    hasMegaMenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    megaMenuId: Schema.Attribute.String;
  };
}

export interface NavigationTextLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_text_links';
  info: {
    description: 'Simple text link for navigation menus';
    displayName: 'Text Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SalesLandingBullet extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_bullets';
  info: {
    description: 'Single bullet item for intro section';
    displayName: 'Bullet';
    icon: 'dot-circle';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SalesLandingFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_features_sections';
  info: {
    description: 'Logos or partner section';
    displayName: 'Features Section';
    icon: 'th-large';
  };
  attributes: {
    logos: Schema.Attribute.Component<'sales-landing.logo', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SalesLandingFormSection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_form_sections';
  info: {
    description: 'Intro copy plus embedded form relation';
    displayName: 'Form Section';
    icon: 'form';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    heading: Schema.Attribute.String;
    privacyNote: Schema.Attribute.String;
  };
}

export interface SalesLandingGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_gallery_sections';
  info: {
    description: 'Media grid with CTA';
    displayName: 'Gallery Section';
    icon: 'images';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    tiles: Schema.Attribute.Component<'sales-landing.gallery-tile', true>;
  };
}

export interface SalesLandingGalleryTile extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_gallery_tiles';
  info: {
    description: 'Image with label/sub-label';
    displayName: 'Gallery Tile';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    subLabel: Schema.Attribute.String;
  };
}

export interface SalesLandingHero extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_heroes';
  info: {
    description: 'Hero area for sales landing pages';
    displayName: 'Hero';
    icon: 'image';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    kicker: Schema.Attribute.String;
    primaryButtonLabel: Schema.Attribute.String;
    primaryButtonUrl: Schema.Attribute.String;
    secondaryButtonLabel: Schema.Attribute.String;
    secondaryButtonUrl: Schema.Attribute.String;
    subheading: Schema.Attribute.RichText;
  };
}

export interface SalesLandingHighlightCard extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_highlight_cards';
  info: {
    description: 'Eyebrow, copy and CTA card';
    displayName: 'Highlight Card';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    label: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    linkUrl: Schema.Attribute.String;
  };
}

export interface SalesLandingIntroSection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_intro_sections';
  info: {
    description: 'Split content intro with optional bullets and image';
    displayName: 'Intro Section';
    icon: 'align-left';
  };
  attributes: {
    bulletPoints: Schema.Attribute.Component<'sales-landing.bullet', true>;
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SalesLandingLogo extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_logos';
  info: {
    description: 'Partner logo entry';
    displayName: 'Logo';
    icon: 'smile';
  };
  attributes: {
    logoImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    logoLabel: Schema.Attribute.String;
  };
}

export interface SalesLandingRatingHighlight extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_rating_highlights';
  info: {
    description: 'Score + label for footer strip';
    displayName: 'Rating Highlight';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    score: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SalesLandingReviewCard extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_review_cards';
  info: {
    description: 'Customer review snippet';
    displayName: 'Review Card';
    icon: 'quote-right';
  };
  attributes: {
    authorMeta: Schema.Attribute.String;
    authorName: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    quote: Schema.Attribute.RichText;
  };
}

export interface SalesLandingReviewsSection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_reviews_sections';
  info: {
    description: 'Heading, summary and review cards';
    displayName: 'Reviews Section';
    icon: 'comments';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    reviews: Schema.Attribute.Component<'sales-landing.review-card', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    subtitle: Schema.Attribute.String;
  };
}

export interface SalesLandingStatItem extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_stat_items';
  info: {
    description: 'Single stat/metric';
    displayName: 'Stat Item';
    icon: 'numbered-list';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SalesLandingStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_stats_sections';
  info: {
    description: 'Repeating counter stats';
    displayName: 'Stats Section';
    icon: 'chart-bar';
  };
  attributes: {
    stats: Schema.Attribute.Component<'sales-landing.stat-item', true>;
  };
}

export interface SalesLandingTermItem extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_term_items';
  info: {
    description: 'Single term or note';
    displayName: 'Term Item';
    icon: 'file-alt';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface SalesLandingTermsSection extends Struct.ComponentSchema {
  collectionName: 'components_sales_landing_terms_sections';
  info: {
    description: 'Terms list with optional footer note';
    displayName: 'Terms Section';
    icon: 'list';
  };
  attributes: {
    footerNote: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    terms: Schema.Attribute.Component<'sales-landing.term-item', true>;
  };
}

export interface SectionsAboutHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_heros';
  info: {
    description: 'Complex Meet Active Away section with multiple images and content';
    displayName: 'About Hero';
    icon: 'user';
  };
  attributes: {
    bottomLeftImage: Schema.Attribute.Media<'images'>;
    bottomRightImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    highlights: Schema.Attribute.Component<'sections.benefit-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
    introText: Schema.Attribute.RichText;
    mainContent: Schema.Attribute.RichText;
    topLeftImage: Schema.Attribute.Media<'images'>;
    topRightImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsAchievementItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_achievement_items';
  info: {
    description: 'Achievement or credential item for Jamie Murray section';
    displayName: 'Achievement Item';
    icon: 'trophy';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'arrow'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_benefit_items';
  info: {
    description: 'Single benefit with icon, heading, and description';
    displayName: 'Benefit Item';
    icon: 'check-circle';
  };
  attributes: {
    customIconSvg: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      ['clock', 'star', 'shield', 'heart', 'trophy', 'users', 'check', 'custom']
    >;
  };
}

export interface SectionsBenefitsGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_benefits_grids';
  info: {
    description: 'Grid of benefits/reasons (Why Choose section)';
    displayName: 'Benefits Grid';
    icon: 'th';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'sections.benefit-item', true>;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_content_blocks';
  info: {
    description: 'Flexible content block with heading, text, and image';
    displayName: 'Content Block';
    icon: 'layer-group';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<['top', 'bottom']> &
      Schema.Attribute.DefaultTo<'bottom'>;
  };
}

export interface SectionsDestinationsConfig extends Struct.ComponentSchema {
  collectionName: 'components_sections_destinations_configs';
  info: {
    description: 'Configuration for destinations section display';
    displayName: 'Destinations Config';
    icon: 'map-marker-alt';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    featuredLocationSlugs: Schema.Attribute.JSON;
    heading: Schema.Attribute.String;
    showDestinations: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsDiscountCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_discount_ctas';
  info: {
    description: 'Discount call-to-action section with background image';
    displayName: 'Discount CTA';
    icon: 'percent';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Access Discount'>;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDragonsDen extends Struct.ComponentSchema {
  collectionName: 'components_sections_dragons_dens';
  info: {
    description: "Dragons' Den featured section";
    displayName: 'Dragons Den Section';
    icon: 'tv';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<['white', 'grey', 'navy']> &
      Schema.Attribute.DefaultTo<'navy'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsFaqCategorySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_category_sections';
  info: {
    description: 'Grouped FAQ section (Pre-Booking, Pre-Travel, etc.)';
    displayName: 'FAQ Category Section';
    icon: 'list';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'sections.faq-item', true>;
    sectionName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_items';
  info: {
    description: 'Single FAQ question and answer';
    displayName: 'FAQ Item';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_sections';
  info: {
    description: 'FAQ section with multiple FAQ items';
    displayName: 'FAQ Section';
    icon: 'question-circle';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsFlexibleContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_flexible_content_blocks';
  info: {
    description: 'Flexible content block with heading, text, and image in various layouts';
    displayName: 'Flexible Content Block';
    icon: 'align-left';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<['white', 'grey']> &
      Schema.Attribute.DefaultTo<'white'>;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<
      ['left', 'right', 'top', 'bottom']
    > &
      Schema.Attribute.DefaultTo<'right'>;
  };
}

export interface SectionsHistoryTimeline extends Struct.ComponentSchema {
  collectionName: 'components_sections_history_timelines';
  info: {
    description: 'Company history timeline section';
    displayName: 'History Timeline';
    icon: 'history';
  };
  attributes: {
    events: Schema.Attribute.Component<'sections.timeline-event', true>;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_info_cards';
  info: {
    description: 'Information card with icon, heading, and description';
    displayName: 'Info Card';
    icon: 'info-circle';
  };
  attributes: {
    customIconSvg: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      [
        'users',
        'ratio',
        'shield',
        'plane',
        'flight',
        'calendar',
        'heart',
        'star',
        'trophy',
        'check',
        'custom',
      ]
    >;
  };
}

export interface SectionsJamieMurrayProgramme extends Struct.ComponentSchema {
  collectionName: 'components_sections_jamie_murray_programmes';
  info: {
    description: 'Jamie Murray tennis programme section with achievements';
    displayName: 'Jamie Murray Programme';
    icon: 'star';
  };
  attributes: {
    achievements: Schema.Attribute.Component<'sections.achievement-item', true>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsKeyInformation extends Struct.ComponentSchema {
  collectionName: 'components_sections_key_informations';
  info: {
    description: 'Key information section with icon cards (3x2 grid)';
    displayName: 'Key Information';
    icon: 'list';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    infoCards: Schema.Attribute.Component<'sections.info-card', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsPageHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_heros';
  info: {
    description: 'Standard page hero with background image, breadcrumbs, and heading';
    displayName: 'Page Hero';
    icon: 'image';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    kicker: Schema.Attribute.String;
    showBreadcrumbs: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsProductHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_heros';
  info: {
    description: 'Hero section for product pages with kicker, heading, subheading, and background image or video';
    displayName: 'Product Hero';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    heroImages: Schema.Attribute.Media<'images', true>;
    kicker: Schema.Attribute.String;
    mediaType: Schema.Attribute.Enumeration<
      ['fullscreen-background', 'split-screen-image', 'split-screen-video']
    > &
      Schema.Attribute.DefaultTo<'fullscreen-background'>;
    rightSideImage: Schema.Attribute.Media<'images'>;
    subheading: Schema.Attribute.RichText;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsQuoteSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_quote_sections';
  info: {
    description: 'Quote section with eyebrow, quote text, author name, and author images';
    displayName: 'Quote Section';
    icon: 'quote-right';
  };
  attributes: {
    authorImages: Schema.Attribute.Media<'images', true>;
    authorName: Schema.Attribute.String;
    decorativeIcon: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String;
    quoteText: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsScheduleRow extends Struct.ComponentSchema {
  collectionName: 'components_sections_schedule_rows';
  info: {
    description: 'Single day schedule row with morning, afternoon, and evening activities';
    displayName: 'Schedule Row';
    icon: 'calendar';
  };
  attributes: {
    afternoon: Schema.Attribute.RichText;
    day: Schema.Attribute.String & Schema.Attribute.Required;
    evening: Schema.Attribute.RichText;
    morning: Schema.Attribute.RichText;
  };
}

export interface SectionsScheduleTable extends Struct.ComponentSchema {
  collectionName: 'components_sections_schedule_tables';
  info: {
    description: 'Weekly schedule or itinerary table with daily activities';
    displayName: 'Schedule Table';
    icon: 'table';
  };
  attributes: {
    heading: Schema.Attribute.String;
    scheduleRows: Schema.Attribute.Component<'sections.schedule-row', true>;
  };
}

export interface SectionsStatItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_stat_items';
  info: {
    description: 'Single stat with number and label';
    displayName: 'Stat Item';
    icon: 'chart-bar';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatsGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats_grids';
  info: {
    description: 'Grid of statistics/counters';
    displayName: 'Stats Grid';
    icon: 'chart-line';
  };
  attributes: {
    stats: Schema.Attribute.Component<'sections.stat-item', true>;
  };
}

export interface SectionsTimelineEvent extends Struct.ComponentSchema {
  collectionName: 'components_sections_timeline_events';
  info: {
    description: 'Single event in history timeline';
    displayName: 'Timeline Event';
    icon: 'calendar-alt';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTwoColumnContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_two_column_contents';
  info: {
    description: 'Two-column layout with content blocks (like Hosting + Tennis Standards)';
    displayName: 'Two Column Content';
    icon: 'columns';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    leftBlock: Schema.Attribute.Component<'sections.content-block', false>;
    rightBlock: Schema.Attribute.Component<'sections.content-block', false>;
  };
}

export interface SectionsVideoContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_content_blocks';
  info: {
    description: 'Video section with heading and text content';
    displayName: 'Video Content Block';
    icon: 'video';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<['white', 'grey']> &
      Schema.Attribute.DefaultTo<'white'>;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<['side-by-side', 'stacked']> &
      Schema.Attribute.DefaultTo<'side-by-side'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SharedCoach extends Struct.ComponentSchema {
  collectionName: 'components_shared_coaches';
  info: {
    description: 'Coach information with image, name, bio and contact';
    displayName: 'Coach';
  };
  attributes: {
    coachDescription: Schema.Attribute.RichText;
    coachFirstName: Schema.Attribute.String & Schema.Attribute.Required;
    coachImage: Schema.Attribute.Media<'images'>;
    coachLastName: Schema.Attribute.String & Schema.Attribute.Required;
    coachWhatsAppURL: Schema.Attribute.String;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    description: 'Frequently Asked Question item';
    displayName: 'FAQ';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    question: Schema.Attribute.String;
  };
}

export interface SharedHostedExperience extends Struct.ComponentSchema {
  collectionName: 'components_shared_hosted_experiences';
  info: {
    description: 'Holiday experience with title, description, image and URL';
    displayName: 'Hosted Experience';
  };
  attributes: {
    holidayDescription: Schema.Attribute.RichText;
    holidayImage: Schema.Attribute.Media<'images'>;
    holidayTitle: Schema.Attribute.String & Schema.Attribute.Required;
    holidayURL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedInclusionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_inclusion_items';
  info: {
    description: "What's included or not included item";
    displayName: 'Inclusion Item';
    icon: 'check-circle';
  };
  attributes: {
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    item: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedItineraryItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_itinerary_items';
  info: {
    description: 'Daily itinerary entry';
    displayName: 'Itinerary Item';
    icon: 'calendar-day';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    day: Schema.Attribute.String;
  };
}

export interface SharedKeyInformation extends Struct.ComponentSchema {
  collectionName: 'components_shared_key_information';
  info: {
    description: 'Key information item with title, info, image and link';
    displayName: 'Key Information';
    icon: 'info-circle';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    info: Schema.Attribute.RichText;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedQuickLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_quick_links';
  info: {
    description: 'Quick link with image, title, description, button text and URL';
    displayName: 'Quick Link';
  };
  attributes: {
    quickLinkButtonText: Schema.Attribute.String & Schema.Attribute.Required;
    quickLinkDescription: Schema.Attribute.Text;
    quickLinkImage: Schema.Attribute.Media<'images'>;
    quickLinkTitle: Schema.Attribute.String & Schema.Attribute.Required;
    quickLinkURL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedRoom extends Struct.ComponentSchema {
  collectionName: 'components_shared_rooms';
  info: {
    description: 'Individual room/accommodation option';
    displayName: 'Room';
  };
  attributes: {
    roomBedConfig: Schema.Attribute.String;
    roomGallery: Schema.Attribute.Media<'images', true>;
    roomSize: Schema.Attribute.String;
    roomText: Schema.Attribute.Text;
    roomTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedRoomOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_room_options';
  info: {
    description: 'Hotel room configuration with pricing';
    displayName: 'Room Option';
  };
  attributes: {
    amenities: Schema.Attribute.Component<'shared.inclusion-item', true>;
    description: Schema.Attribute.RichText;
    maxOccupancy: Schema.Attribute.Integer;
    priceFrom: Schema.Attribute.Decimal;
    roomImage: Schema.Attribute.Media<'images'>;
    roomType: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
        minLength: 0;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_members';
  info: {
    description: 'Team member information with profile, contact details and order';
    displayName: 'Team Member';
  };
  attributes: {
    email_address_people: Schema.Attribute.Email;
    full_name: Schema.Attribute.String & Schema.Attribute.Required;
    job_title: Schema.Attribute.String;
    linkedin_url: Schema.Attribute.String;
    order_people: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    profile_image_people: Schema.Attribute.Media<'images'>;
    short_description_people: Schema.Attribute.Text;
    website_person: Schema.Attribute.String;
  };
}

export interface SharedUsefulResource extends Struct.ComponentSchema {
  collectionName: 'components_shared_useful_resources';
  info: {
    description: 'Resource with title, description and external link';
    displayName: 'Useful Resource';
  };
  attributes: {
    resourceText: Schema.Attribute.RichText;
    resourceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    resourceURL: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.accordion-item': ContentAccordionItem;
      'content.content-item': ContentContentItem;
      'content.notice-item': ContentNoticeItem;
      'content.pricing-row': ContentPricingRow;
      'navigation.destination-category': NavigationDestinationCategory;
      'navigation.destination-item': NavigationDestinationItem;
      'navigation.mega-menu-item': NavigationMegaMenuItem;
      'navigation.menu-item': NavigationMenuItem;
      'navigation.text-link': NavigationTextLink;
      'sales-landing.bullet': SalesLandingBullet;
      'sales-landing.features-section': SalesLandingFeaturesSection;
      'sales-landing.form-section': SalesLandingFormSection;
      'sales-landing.gallery-section': SalesLandingGallerySection;
      'sales-landing.gallery-tile': SalesLandingGalleryTile;
      'sales-landing.hero': SalesLandingHero;
      'sales-landing.highlight-card': SalesLandingHighlightCard;
      'sales-landing.intro-section': SalesLandingIntroSection;
      'sales-landing.logo': SalesLandingLogo;
      'sales-landing.rating-highlight': SalesLandingRatingHighlight;
      'sales-landing.review-card': SalesLandingReviewCard;
      'sales-landing.reviews-section': SalesLandingReviewsSection;
      'sales-landing.stat-item': SalesLandingStatItem;
      'sales-landing.stats-section': SalesLandingStatsSection;
      'sales-landing.term-item': SalesLandingTermItem;
      'sales-landing.terms-section': SalesLandingTermsSection;
      'sections.about-hero': SectionsAboutHero;
      'sections.achievement-item': SectionsAchievementItem;
      'sections.benefit-item': SectionsBenefitItem;
      'sections.benefits-grid': SectionsBenefitsGrid;
      'sections.content-block': SectionsContentBlock;
      'sections.destinations-config': SectionsDestinationsConfig;
      'sections.discount-cta': SectionsDiscountCta;
      'sections.dragons-den': SectionsDragonsDen;
      'sections.faq-category-section': SectionsFaqCategorySection;
      'sections.faq-item': SectionsFaqItem;
      'sections.faq-section': SectionsFaqSection;
      'sections.flexible-content-block': SectionsFlexibleContentBlock;
      'sections.history-timeline': SectionsHistoryTimeline;
      'sections.info-card': SectionsInfoCard;
      'sections.jamie-murray-programme': SectionsJamieMurrayProgramme;
      'sections.key-information': SectionsKeyInformation;
      'sections.page-hero': SectionsPageHero;
      'sections.product-hero': SectionsProductHero;
      'sections.quote-section': SectionsQuoteSection;
      'sections.schedule-row': SectionsScheduleRow;
      'sections.schedule-table': SectionsScheduleTable;
      'sections.stat-item': SectionsStatItem;
      'sections.stats-grid': SectionsStatsGrid;
      'sections.timeline-event': SectionsTimelineEvent;
      'sections.two-column-content': SectionsTwoColumnContent;
      'sections.video-content-block': SectionsVideoContentBlock;
      'shared.coach': SharedCoach;
      'shared.faq': SharedFaq;
      'shared.hosted-experience': SharedHostedExperience;
      'shared.inclusion-item': SharedInclusionItem;
      'shared.itinerary-item': SharedItineraryItem;
      'shared.key-information': SharedKeyInformation;
      'shared.open-graph': SharedOpenGraph;
      'shared.quick-link': SharedQuickLink;
      'shared.room': SharedRoom;
      'shared.room-option': SharedRoomOption;
      'shared.seo': SharedSeo;
      'shared.team-member': SharedTeamMember;
      'shared.useful-resource': SharedUsefulResource;
    }
  }
}
