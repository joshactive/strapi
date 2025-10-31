import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navigation.destination-category': NavigationDestinationCategory;
      'navigation.destination-item': NavigationDestinationItem;
      'navigation.mega-menu-item': NavigationMegaMenuItem;
      'navigation.menu-item': NavigationMenuItem;
      'navigation.text-link': NavigationTextLink;
      'shared.faq': SharedFaq;
      'shared.inclusion-item': SharedInclusionItem;
      'shared.itinerary-item': SharedItineraryItem;
      'shared.key-information': SharedKeyInformation;
      'shared.open-graph': SharedOpenGraph;
      'shared.room-option': SharedRoomOption;
      'shared.seo': SharedSeo;
    }
  }
}
