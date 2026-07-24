'use strict';

const FORM_UID = 'api::form.form';

const SUCCESS_MESSAGES = Object.freeze({
  'alex-louis-register-interest':
    'Thanks — we’ve received your interest in Alex & Louis’ 2027 Rackets Holiday. This is not a confirmed booking; our team will contact you about availability and next steps.',
  'clinic-feedback':
    'Thanks for sharing your clinic feedback. It will help us improve future Active Away clinics.',
  'coach-host-feedback':
    'Thanks for sharing your feedback. It will help us improve the experience for our coaches and hosts.',
  'contact-us':
    'Thanks — we’ve received your enquiry. Our team will be in touch within one working day.',
  'cv-upload':
    'Thanks — we’ve received your CV and application details. Our team will review them and be in touch if there is a suitable next step.',
  'email-consent-school-tour':
    'Thank you — we’ve received your consent to receive information about the school tennis tour.',
  'holiday-feedback':
    'Thanks for sharing your holiday feedback. It will help us improve future Active Away holidays.',
  'ikos-tennis-academy-feedback':
    'Thanks for sharing your Ikos tennis experience. Your feedback will help us improve the tennis academy.',
  'junior-feedback':
    'Thanks for sharing your junior event feedback. It will help us improve future junior camps and school tours.',
  'liberty-lykia-rebooking':
    'Thanks — we’ve received your 2027 Liberty Lykia rebooking request. This is not a confirmed booking; our team will contact you about availability and next steps.',
  'liberty-lykia-tennis-academy-feedback':
    'Thanks for sharing your feedback. It will help Active Away and Liberty Lykia improve the tennis experience.',
  'mid-holiday-feedback':
    'Thanks — we’ve received your mid-holiday feedback. It will only be shared with your host so they can help improve the rest of your trip.',
  'open-days-feedback':
    'Thanks for sharing your Open Day feedback. It will help us improve future Active Away events.',
  'parent-consent-form':
    'Thank you — we’ve received the parental consent information for the children on your booking.',
  'parental-consent-school-tennis-tours':
    'Thank you — we’ve received the consent and travel information for your child’s school tennis tour.',
  'phone-call-feedback':
    'Thanks for rating your recent call. Your feedback will help us improve our communication.',
  'provisional-invoice-request':
    'Thanks — we’ve received your provisional invoice request. Our team will review it; please remember that this does not reserve a place.',
  'refund-details':
    'Thanks — we’ve received your refund details securely. Our team will use them to process your refund and delete the bank details once complete.',
  'request-coach-feedback-adult-tennis-holidays':
    'Thanks — we’ve received your request for coach feedback. Your coaching team will use it to prepare feedback on your tennis.',
  'school-tour-feedback':
    'Thanks for sharing your school tour feedback. It will help us improve future Active Away school tours.',
  'tennis-standard-update':
    'Thanks — we’ve received your racket standard updates and will apply them to your booking.',
  'tennis-team-up':
    'Thanks — we’ve received your Tennis Team Up preferences. Your host will do their best to accommodate your requests.',
  'transfer-information':
    'Thanks — we’ve received your transfer information and will apply it to your booking. Please contact us if any details need correcting.',
  'update-contact-information':
    'Thanks — we’ve received your updated contact details and interests.',
  'website-feedback':
    'Thanks for your website feedback. It will help us make the Active Away website easier to use.',
});

const SYSTEM_KEYS = new Set([
  'createdAt',
  'createdBy',
  'documentId',
  'id',
  'locale',
  'localizations',
  'publishedAt',
  'status',
  'successMessage',
  'updatedAt',
  'updatedBy',
]);

function normalizeMessage(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeForComparison(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeForComparison);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !SYSTEM_KEYS.has(key))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, normalizeForComparison(child)])
  );
}

function entriesFromResult(result) {
  if (Array.isArray(result)) {
    return result;
  }

  if (result && Array.isArray(result.results)) {
    return result.results;
  }

  throw new Error('Strapi returned an unexpected form query result.');
}

async function findForms(strapi, status) {
  const result = await strapi.documents(FORM_UID).findMany({
    limit: 100,
    populate: '*',
    status,
  });

  return entriesFromResult(result);
}

function indexBySlug(forms, status) {
  const indexed = new Map();

  for (const form of forms) {
    if (typeof form.slug !== 'string' || !form.slug) {
      throw new Error(`A ${status} form is missing its slug.`);
    }

    if (indexed.has(form.slug)) {
      throw new Error(`Duplicate ${status} form slug: ${form.slug}`);
    }

    indexed.set(form.slug, form);
  }

  return indexed;
}

function assertExpectedSlugs(indexed, status) {
  const expected = Object.keys(SUCCESS_MESSAGES).sort();
  const actual = [...indexed.keys()].sort();
  const missing = expected.filter((slug) => !indexed.has(slug));
  const unexpected = actual.filter((slug) => !(slug in SUCCESS_MESSAGES));

  if (missing.length || unexpected.length) {
    throw new Error(
      [
        `Expected exactly ${expected.length} ${status} forms.`,
        missing.length ? `Missing: ${missing.join(', ')}` : '',
        unexpected.length ? `Unexpected: ${unexpected.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join(' ')
    );
  }
}

function assertNoPendingDraftChanges(drafts, published) {
  const changed = [];

  for (const slug of Object.keys(SUCCESS_MESSAGES)) {
    const draftValue = normalizeForComparison(drafts.get(slug));
    const publishedValue = normalizeForComparison(published.get(slug));

    if (JSON.stringify(draftValue) !== JSON.stringify(publishedValue)) {
      changed.push(slug);
    }
  }

  if (changed.length) {
    throw new Error(
      `Aborting because these forms have unpublished draft changes: ${changed.join(', ')}`
    );
  }
}

function assertMessagesAreBlankOrExpected(drafts, published) {
  const conflicts = [];

  for (const [slug, expected] of Object.entries(SUCCESS_MESSAGES)) {
    const draftMessage = normalizeMessage(drafts.get(slug).successMessage);
    const publishedMessage = normalizeMessage(published.get(slug).successMessage);

    if (
      (draftMessage && draftMessage !== expected) ||
      (publishedMessage && publishedMessage !== expected)
    ) {
      conflicts.push(slug);
    }
  }

  if (conflicts.length) {
    throw new Error(
      `Aborting rather than overwrite existing custom success messages: ${conflicts.join(', ')}`
    );
  }
}

async function loadState(strapi) {
  const [draftForms, publishedForms] = await Promise.all([
    findForms(strapi, 'draft'),
    findForms(strapi, 'published'),
  ]);
  const drafts = indexBySlug(draftForms, 'draft');
  const published = indexBySlug(publishedForms, 'published');

  assertExpectedSlugs(drafts, 'draft');
  assertExpectedSlugs(published, 'published');
  assertNoPendingDraftChanges(drafts, published);
  assertMessagesAreBlankOrExpected(drafts, published);

  return { drafts, published };
}

async function bootstrapStrapi() {
  const strapiLib = require('@strapi/strapi');

  if (typeof strapiLib.createStrapi === 'function') {
    return strapiLib.createStrapi({ autoReload: false }).load();
  }

  return strapiLib.default({ autoReload: false }).load();
}

async function run() {
  const apply = process.argv.includes('--apply');
  let strapi;

  try {
    strapi = await bootstrapStrapi();
    const { drafts, published } = await loadState(strapi);
    const pending = Object.entries(SUCCESS_MESSAGES).filter(([slug, expected]) => {
      return (
        normalizeMessage(drafts.get(slug).successMessage) !== expected ||
        normalizeMessage(published.get(slug).successMessage) !== expected
      );
    });

    console.log(
      `${apply ? 'Applying' : 'Dry run:'} ${pending.length} of ${
        Object.keys(SUCCESS_MESSAGES).length
      } form success messages need updating.`
    );

    if (!apply) {
      console.log('No content was changed. Re-run with --apply to perform the backfill.');
      return;
    }

    for (const [slug, successMessage] of pending) {
      const form = published.get(slug);

      await strapi.documents(FORM_UID).update({
        documentId: form.documentId,
        data: { successMessage },
        status: 'published',
      });

      console.log(`Updated ${slug}.`);
    }

    const verified = await loadState(strapi);
    const invalid = Object.entries(SUCCESS_MESSAGES)
      .filter(([slug, expected]) => {
        return (
          normalizeMessage(verified.drafts.get(slug).successMessage) !== expected ||
          normalizeMessage(verified.published.get(slug).successMessage) !== expected
        );
      })
      .map(([slug]) => slug);

    if (invalid.length) {
      throw new Error(`Verification failed for: ${invalid.join(', ')}`);
    }

    console.log(`Verified all ${Object.keys(SUCCESS_MESSAGES).length} form success messages.`);
  } finally {
    if (strapi) {
      await strapi.destroy();
    }
  }
}

if (require.main === module) {
  run().catch((error) => {
    console.error(`Form success-message backfill failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  SUCCESS_MESSAGES,
  normalizeForComparison,
  normalizeMessage,
};
