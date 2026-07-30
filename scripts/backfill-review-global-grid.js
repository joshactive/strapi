'use strict';

/**
 * Audit or backfill the global-review-grid flag on legacy reviews.
 *
 * This script intentionally uses Strapi's database query API instead of the
 * Document Service. In Strapi v5, a published document can have separate
 * draft and published rows. Updating those rows independently changes only
 * this flag and cannot accidentally publish unrelated draft edits.
 *
 * Dry run (default):
 *   npm run backfill:review-global-grid
 *
 * Apply:
 *   npm run backfill:review-global-grid -- --apply
 *
 * The operation is idempotent and resumable. It first audits the complete
 * collection and refuses to mutate unless the exact approved population of
 * 1,580 Google/Trustpilot documents is present. Each batch changes only those
 * approved physical versions whose audited identity, source, unique identifier,
 * and current flag still match. FormFeedback, internal, and unknown-source
 * reviews are deliberately excluded, and apply mode fails closed if any
 * excluded physical version is globally enabled.
 */

const REVIEW_UID = 'api::review.review';
const FORM_FEEDBACK_REVIEW_PREFIX = 'form-feedback:';
const DEFAULT_BATCH_SIZE = 100;
const MAX_BATCH_SIZE = 500;
const EXPECTED_EXTERNAL_REVIEW_DOCUMENTS = 1580;
const GLOBAL_REVIEW_SOURCES = new Set(['google', 'trustpilot']);
const SELECTED_FIELDS = Object.freeze([
  'id',
  'documentId',
  'publishedAt',
  'reviewSource',
  'reviewUniqueId',
  'displayOnGlobalReviewGrid',
]);

function parsePositiveInteger(value, optionName) {
  if (!/^[1-9]\d*$/.test(value)) {
    throw new Error(`${optionName} must be a positive integer.`);
  }

  return Number(value);
}

function parseArguments(argv) {
  let apply = false;
  let batchSize = DEFAULT_BATCH_SIZE;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--apply') {
      apply = true;
      continue;
    }

    if (argument === '--batch-size') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error('--batch-size requires a value.');
      }

      batchSize = parsePositiveInteger(value, '--batch-size');
      index += 1;
      continue;
    }

    if (argument.startsWith('--batch-size=')) {
      batchSize = parsePositiveInteger(argument.slice('--batch-size='.length), '--batch-size');
      continue;
    }

    throw new Error('Unsupported command-line option.');
  }

  if (batchSize > MAX_BATCH_SIZE) {
    throw new Error(`--batch-size cannot exceed ${MAX_BATCH_SIZE}.`);
  }

  return { apply, batchSize };
}

function isFormFeedbackReview(row) {
  return (
    typeof row.reviewUniqueId === 'string' &&
    row.reviewUniqueId.startsWith(FORM_FEEDBACK_REVIEW_PREFIX)
  );
}

function isApprovedGlobalReviewSource(row) {
  return (
    typeof row.reviewSource === 'string' &&
    GLOBAL_REVIEW_SOURCES.has(row.reviewSource.trim().toLowerCase())
  );
}

function createAudit() {
  return {
    allDocumentIds: new Set(),
    approvedExternalDocumentIds: new Set(),
    excludedFeedbackDocumentIds: new Set(),
    excludedOtherDocumentIds: new Set(),
    excludedEnabledDocumentIds: new Set(),
    pendingDocumentIds: new Set(),
    versions: {
      scanned: 0,
      approvedExternal: 0,
      excludedFeedback: 0,
      excludedOther: 0,
      excludedEnabled: 0,
      draft: 0,
      published: 0,
      alreadyEnabled: 0,
      pending: 0,
    },
  };
}

function assertReviewRow(row, previousId) {
  if (!row || row.id === undefined || row.id === null) {
    throw new Error('A review version is missing its database identifier.');
  }

  if (typeof row.documentId !== 'string' || !row.documentId) {
    throw new Error('A review version is missing its Strapi document identifier.');
  }

  if (previousId !== null && Number(row.id) <= Number(previousId)) {
    throw new Error('Review versions were not returned in deterministic order.');
  }
}

function addRowToAudit(audit, row) {
  audit.versions.scanned += 1;
  audit.allDocumentIds.add(row.documentId);

  if (isFormFeedbackReview(row)) {
    audit.versions.excludedFeedback += 1;
    audit.excludedFeedbackDocumentIds.add(row.documentId);

    if (row.displayOnGlobalReviewGrid === true) {
      audit.versions.excludedEnabled += 1;
      audit.excludedEnabledDocumentIds.add(row.documentId);
    }

    return false;
  }

  if (!isApprovedGlobalReviewSource(row)) {
    audit.versions.excludedOther += 1;
    audit.excludedOtherDocumentIds.add(row.documentId);

    if (row.displayOnGlobalReviewGrid === true) {
      audit.versions.excludedEnabled += 1;
      audit.excludedEnabledDocumentIds.add(row.documentId);
    }

    return false;
  }

  audit.versions.approvedExternal += 1;
  audit.approvedExternalDocumentIds.add(row.documentId);

  if (row.publishedAt) {
    audit.versions.published += 1;
  } else {
    audit.versions.draft += 1;
  }

  if (row.displayOnGlobalReviewGrid === true) {
    audit.versions.alreadyEnabled += 1;
    return false;
  }

  audit.versions.pending += 1;
  audit.pendingDocumentIds.add(row.documentId);
  return true;
}

function summarizeAudit(audit) {
  return Object.freeze({
    documents: Object.freeze({
      scanned: audit.allDocumentIds.size,
      approvedExternal: audit.approvedExternalDocumentIds.size,
      excludedFeedback: audit.excludedFeedbackDocumentIds.size,
      excludedOther: audit.excludedOtherDocumentIds.size,
      excludedEnabled: audit.excludedEnabledDocumentIds.size,
      pending: audit.pendingDocumentIds.size,
    }),
    versions: Object.freeze({ ...audit.versions }),
  });
}

function assertExpectedExternalReviewDocuments(
  summary,
  expectedDocumentCount = EXPECTED_EXTERNAL_REVIEW_DOCUMENTS,
) {
  if (
    !Number.isSafeInteger(expectedDocumentCount) ||
    expectedDocumentCount < 0
  ) {
    throw new Error('Expected external review document count is invalid.');
  }

  if (summary.documents.approvedExternal !== expectedDocumentCount) {
    throw new Error(
      `Expected ${expectedDocumentCount} approved Google/Trustpilot review documents, found ${summary.documents.approvedExternal}.`,
    );
  }
}

function assertNoExcludedReviewVersionsEnabled(summary) {
  if (summary.versions.excludedEnabled !== 0) {
    throw new Error(
      `Expected no excluded review versions to be enabled for the global grid, found ${summary.versions.excludedEnabled}.`,
    );
  }
}

function exactValuePredicate(value) {
  if (value === null || value === undefined) {
    return {
      $null: true,
    };
  }

  return {
    $eq: value,
  };
}

function createPendingVersionPredicate(row) {
  if (
    isFormFeedbackReview(row) ||
    !isApprovedGlobalReviewSource(row) ||
    row.displayOnGlobalReviewGrid === true
  ) {
    throw new Error('An unsafe review version was included in an update batch.');
  }

  return {
    id: row.id,
    documentId: row.documentId,
    reviewSource: exactValuePredicate(row.reviewSource),
    reviewUniqueId: exactValuePredicate(row.reviewUniqueId),
    displayOnGlobalReviewGrid: exactValuePredicate(row.displayOnGlobalReviewGrid),
  };
}

async function findNextBatch(query, afterId, batchSize) {
  const rows = await query.findMany({
    where: {
      id: {
        $gt: afterId,
      },
    },
    orderBy: {
      id: 'asc',
    },
    limit: batchSize,
    select: SELECTED_FIELDS,
  });

  if (!Array.isArray(rows)) {
    throw new Error('Strapi returned an unexpected review query result.');
  }

  return rows;
}

async function scanReviews(
  strapi,
  {
    apply = false,
    batchSize = DEFAULT_BATCH_SIZE,
    expectedDocumentCount = EXPECTED_EXTERNAL_REVIEW_DOCUMENTS,
  } = {},
) {
  const query = strapi.db.query(REVIEW_UID);
  const audit = createAudit();
  let afterId = 0;
  const pendingVersions = [];

  while (true) {
    const rows = await findNextBatch(query, afterId, batchSize);
    if (rows.length === 0) {
      break;
    }

    let previousId = afterId;

    for (const row of rows) {
      assertReviewRow(row, previousId);
      previousId = row.id;

      if (addRowToAudit(audit, row)) {
        pendingVersions.push({
          id: row.id,
          documentId: row.documentId,
          reviewSource: row.reviewSource,
          reviewUniqueId: row.reviewUniqueId,
          displayOnGlobalReviewGrid: row.displayOnGlobalReviewGrid,
        });
      }
    }

    afterId = rows[rows.length - 1].id;
    if (rows.length < batchSize) {
      break;
    }
  }

  const summary = summarizeAudit(audit);
  let updatedVersions = 0;

  if (apply) {
    assertExpectedExternalReviewDocuments(summary, expectedDocumentCount);
    assertNoExcludedReviewVersionsEnabled(summary);

    for (let index = 0; index < pendingVersions.length; index += batchSize) {
      const batch = pendingVersions.slice(index, index + batchSize);
      const result = await query.updateMany({
        where: {
          $or: batch.map(createPendingVersionPredicate),
        },
        data: {
          displayOnGlobalReviewGrid: true,
        },
      });

      if (!result || result.count !== batch.length) {
        throw new Error('A review-version update batch did not complete in full.');
      }

      updatedVersions += result.count;
    }
  }

  return {
    summary,
    updatedVersions,
  };
}

function printSummary(label, summary) {
  console.log(label);
  console.log(`Review documents scanned: ${summary.documents.scanned}`);
  console.log(`Approved Google/Trustpilot review documents: ${summary.documents.approvedExternal}`);
  console.log(`Location-only feedback documents excluded: ${summary.documents.excludedFeedback}`);
  console.log(`Other/internal review documents excluded: ${summary.documents.excludedOther}`);
  console.log(`Excluded documents unexpectedly enabled: ${summary.documents.excludedEnabled}`);
  console.log(`Approved external documents needing update: ${summary.documents.pending}`);
  console.log(`Physical review versions scanned: ${summary.versions.scanned}`);
  console.log(`Approved external draft versions: ${summary.versions.draft}`);
  console.log(`Approved external published versions: ${summary.versions.published}`);
  console.log(`Approved external versions already enabled: ${summary.versions.alreadyEnabled}`);
  console.log(`Approved external versions needing update: ${summary.versions.pending}`);
  console.log(`Location-only feedback versions excluded: ${summary.versions.excludedFeedback}`);
  console.log(`Other/internal review versions excluded: ${summary.versions.excludedOther}`);
  console.log(`Excluded versions unexpectedly enabled: ${summary.versions.excludedEnabled}`);
}

async function bootstrapStrapi() {
  const strapiLib = require('@strapi/strapi');

  if (typeof strapiLib.createStrapi === 'function') {
    return strapiLib.createStrapi({ autoReload: false }).load();
  }

  return strapiLib.default({ autoReload: false }).load();
}

async function run(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  let strapi;

  try {
    strapi = await bootstrapStrapi();
    const initial = await scanReviews(strapi, {
      apply: false,
      batchSize: options.batchSize,
    });
    printSummary('Dry-run summary', initial.summary);
    assertExpectedExternalReviewDocuments(initial.summary);

    if (!options.apply) {
      console.log('No content was changed. Re-run with --apply to perform the backfill.');
      return initial;
    }

    const applied = await scanReviews(strapi, {
      apply: true,
      batchSize: options.batchSize,
    });
    console.log(`Approved external review versions updated: ${applied.updatedVersions}`);

    const verification = await scanReviews(strapi, {
      apply: false,
      batchSize: options.batchSize,
    });
    assertExpectedExternalReviewDocuments(verification.summary);
    assertNoExcludedReviewVersionsEnabled(verification.summary);

    if (verification.summary.documents.pending !== 0 || verification.summary.versions.pending !== 0) {
      throw new Error('Post-backfill verification found approved external review versions still pending.');
    }

    console.log('Verification pending approved external documents: 0');
    console.log('Verification pending approved external versions: 0');

    return {
      initial,
      applied,
      verification,
    };
  } finally {
    if (strapi) {
      await strapi.destroy();
    }
  }
}

if (require.main === module) {
  run().catch(() => {
    console.error('Review global-grid backfill failed. No review content was logged.');
    process.exitCode = 1;
  });
}

module.exports = {
  DEFAULT_BATCH_SIZE,
  EXPECTED_EXTERNAL_REVIEW_DOCUMENTS,
  FORM_FEEDBACK_REVIEW_PREFIX,
  MAX_BATCH_SIZE,
  REVIEW_UID,
  addRowToAudit,
  assertExpectedExternalReviewDocuments,
  assertNoExcludedReviewVersionsEnabled,
  createPendingVersionPredicate,
  createAudit,
  isApprovedGlobalReviewSource,
  isFormFeedbackReview,
  parseArguments,
  scanReviews,
  summarizeAudit,
};
