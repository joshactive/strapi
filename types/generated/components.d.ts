import type { Schema, Struct } from '@strapi/strapi';

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
      'shared.faq': SharedFaq;
      'shared.inclusion-item': SharedInclusionItem;
      'shared.itinerary-item': SharedItineraryItem;
      'shared.key-information': SharedKeyInformation;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
