'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const {
  DEFAULT_BATCH_SIZE,
  EXPECTED_EXTERNAL_REVIEW_DOCUMENTS,
  assertExpectedExternalReviewDocuments,
  assertNoExcludedReviewVersionsEnabled,
  createAudit,
  isApprovedGlobalReviewSource,
  isFormFeedbackReview,
  parseArguments,
  scanReviews,
  summarizeAudit,
} = require('../backfill-review-global-grid');

test('parseArguments is dry-run by default and requires explicit apply', () => {
  assert.deepEqual(parseArguments([]), {
    apply: false,
    batchSize: DEFAULT_BATCH_SIZE,
  });
  assert.deepEqual(parseArguments(['--apply', '--batch-size=25']), {
    apply: true,
    batchSize: 25,
  });
});

test('parseArguments rejects unsupported or unsafe options', () => {
  assert.throws(() => parseArguments(['--unknown']), /Unsupported/);
  assert.throws(() => parseArguments(['--batch-size', '0']), /positive integer/);
  assert.throws(() => parseArguments(['--batch-size=501']), /cannot exceed/);
});

test('only deterministic FormFeedback review identifiers are excluded', () => {
  assert.equal(isFormFeedbackReview({ reviewUniqueId: 'form-feedback:123' }), true);
  assert.equal(isFormFeedbackReview({ reviewUniqueId: 'google:form-feedback:123' }), false);
  assert.equal(isFormFeedbackReview({ reviewUniqueId: null }), false);
});

test('only explicitly approved Google and Trustpilot sources qualify', () => {
  assert.equal(isApprovedGlobalReviewSource({ reviewSource: 'Google' }), true);
  assert.equal(isApprovedGlobalReviewSource({ reviewSource: 'TrustPilot' }), true);
  assert.equal(isApprovedGlobalReviewSource({ reviewSource: ' Active Away Testimonial ' }), false);
  assert.equal(isApprovedGlobalReviewSource({ reviewSource: 'Internal' }), false);
  assert.equal(isApprovedGlobalReviewSource({ reviewSource: null }), false);
});

test('audit keeps draft and published versions separate while counting documents once', () => {
  const audit = createAudit();
  const add = require('../backfill-review-global-grid').addRowToAudit;

  add(audit, {
    id: 1,
    documentId: 'legacy-one',
    publishedAt: null,
    reviewSource: 'Google',
    reviewUniqueId: 'google:1',
    displayOnGlobalReviewGrid: null,
  });
  add(audit, {
    id: 2,
    documentId: 'legacy-one',
    publishedAt: '2026-01-01T00:00:00.000Z',
    reviewSource: 'Google',
    reviewUniqueId: 'google:1',
    displayOnGlobalReviewGrid: true,
  });
  add(audit, {
    id: 3,
    documentId: 'feedback-one',
    publishedAt: '2026-01-01T00:00:00.000Z',
    reviewSource: 'Active Away Testimonial',
    reviewUniqueId: 'form-feedback:1',
    displayOnGlobalReviewGrid: false,
  });
  add(audit, {
    id: 4,
    documentId: 'internal-one',
    publishedAt: '2026-01-01T00:00:00.000Z',
    reviewSource: 'Internal',
    reviewUniqueId: 'internal:1',
    displayOnGlobalReviewGrid: false,
  });

  assert.deepEqual(summarizeAudit(audit), {
    documents: {
      scanned: 3,
      approvedExternal: 1,
      excludedFeedback: 1,
      excludedOther: 1,
      excludedEnabled: 0,
      pending: 1,
    },
    versions: {
      scanned: 4,
      approvedExternal: 2,
      excludedFeedback: 1,
      excludedOther: 1,
      excludedEnabled: 0,
      draft: 1,
      published: 1,
      alreadyEnabled: 1,
      pending: 1,
    },
  });
});

test('the audited production population must match exactly before mutation', () => {
  const audit = createAudit();
  audit.approvedExternalDocumentIds.add('one');
  const summary = summarizeAudit(audit);

  assert.doesNotThrow(() => assertExpectedExternalReviewDocuments(summary, 1));
  assert.throws(
    () =>
      assertExpectedExternalReviewDocuments(
        summary,
        EXPECTED_EXTERNAL_REVIEW_DOCUMENTS,
      ),
    /Expected 1580.*found 1/,
  );
});

test('excluded feedback, internal, and unknown reviews must never be globally enabled', () => {
  const audit = createAudit();
  const add = require('../backfill-review-global-grid').addRowToAudit;

  add(audit, {
    id: 1,
    documentId: 'feedback-one',
    publishedAt: '2026-01-01T00:00:00.000Z',
    reviewSource: 'Active Away Testimonial',
    reviewUniqueId: 'form-feedback:1',
    displayOnGlobalReviewGrid: true,
  });
  add(audit, {
    id: 2,
    documentId: 'internal-one',
    publishedAt: '2026-01-01T00:00:00.000Z',
    reviewSource: 'Internal',
    reviewUniqueId: 'internal:1',
    displayOnGlobalReviewGrid: true,
  });
  add(audit, {
    id: 3,
    documentId: 'unknown-one',
    publishedAt: '2026-01-01T00:00:00.000Z',
    reviewSource: null,
    reviewUniqueId: null,
    displayOnGlobalReviewGrid: true,
  });

  const summary = summarizeAudit(audit);
  assert.equal(summary.documents.excludedEnabled, 3);
  assert.equal(summary.versions.excludedEnabled, 3);
  assert.throws(
    () => assertNoExcludedReviewVersionsEnabled(summary),
    /Expected no excluded review versions.*found 3/,
  );
});

function matchesValuePredicate(value, predicate) {
  if ('$null' in predicate) {
    return predicate.$null === (value === null || value === undefined);
  }

  return value === predicate.$eq;
}

function matchesUpdatePredicate(row, predicate) {
  return (
    row.id === predicate.id &&
    row.documentId === predicate.documentId &&
    matchesValuePredicate(row.reviewSource, predicate.reviewSource) &&
    matchesValuePredicate(row.reviewUniqueId, predicate.reviewUniqueId) &&
    matchesValuePredicate(
      row.displayOnGlobalReviewGrid,
      predicate.displayOnGlobalReviewGrid,
    )
  );
}

function createMockStrapi(initialRows, { beforeUpdate } = {}) {
  const rows = initialRows.map((row) => ({ ...row }));
  const calls = {
    updates: [],
    updateWheres: [],
  };

  const query = {
    async findMany({ where, limit }) {
      return rows
        .filter((row) => row.id > where.id.$gt)
        .sort((left, right) => left.id - right.id)
        .slice(0, limit)
        .map((row) => ({ ...row }));
    },
    async updateMany({ where, data }) {
      if (beforeUpdate) {
        await beforeUpdate({
          rows,
          where,
          updateIndex: calls.updates.length,
        });
      }

      const predicates = where.$or;
      const ids = predicates.map((predicate) => predicate.id);
      let count = 0;

      for (const row of rows) {
        if (predicates.some((predicate) => matchesUpdatePredicate(row, predicate))) {
          Object.assign(row, data);
          count += 1;
        }
      }

      calls.updates.push(ids);
      calls.updateWheres.push(where);
      return { count };
    },
  };

  return {
    calls,
    rows,
    strapi: {
      db: {
        query() {
          return query;
        },
      },
    },
  };
}

test('scanReviews dry-run reports pending versions without changing them', async () => {
  const mock = createMockStrapi([
    {
      id: 1,
      documentId: 'legacy-one',
      publishedAt: null,
      reviewSource: 'Google',
      reviewUniqueId: 'google:1',
      displayOnGlobalReviewGrid: null,
    },
    {
      id: 2,
      documentId: 'legacy-one',
      publishedAt: '2026-01-01T00:00:00.000Z',
      reviewSource: 'Google',
      reviewUniqueId: 'google:1',
      displayOnGlobalReviewGrid: false,
    },
  ]);

  const result = await scanReviews(mock.strapi, { apply: false, batchSize: 1 });

  assert.equal(result.summary.versions.pending, 2);
  assert.equal(result.updatedVersions, 0);
  assert.equal(mock.calls.updates.length, 0);
  assert.equal(mock.rows[0].displayOnGlobalReviewGrid, null);
});

test('scanReviews fails before mutation when the audited document count changes', async () => {
  const mock = createMockStrapi([
    {
      id: 1,
      documentId: 'legacy-one',
      publishedAt: '2026-01-01T00:00:00.000Z',
      reviewSource: 'Google',
      reviewUniqueId: 'google:1',
      displayOnGlobalReviewGrid: false,
    },
  ]);

  await assert.rejects(
    scanReviews(mock.strapi, {
      apply: true,
      batchSize: 1,
      expectedDocumentCount: 2,
    }),
    /Expected 2.*found 1/,
  );
  assert.equal(mock.calls.updates.length, 0);
  assert.equal(mock.rows[0].displayOnGlobalReviewGrid, false);
});

test('scanReviews refuses to mutate when an excluded review is already globally enabled', async () => {
  const mock = createMockStrapi([
    {
      id: 1,
      documentId: 'legacy-one',
      publishedAt: '2026-01-01T00:00:00.000Z',
      reviewSource: 'Google',
      reviewUniqueId: 'google:1',
      displayOnGlobalReviewGrid: false,
    },
    {
      id: 2,
      documentId: 'feedback-one',
      publishedAt: '2026-01-01T00:00:00.000Z',
      reviewSource: 'Active Away Testimonial',
      reviewUniqueId: 'form-feedback:1',
      displayOnGlobalReviewGrid: true,
    },
  ]);

  await assert.rejects(
    scanReviews(mock.strapi, {
      apply: true,
      batchSize: 2,
      expectedDocumentCount: 1,
    }),
    /Expected no excluded review versions.*found 1/,
  );
  assert.equal(mock.calls.updates.length, 0);
  assert.equal(mock.rows[0].displayOnGlobalReviewGrid, false);
});

test('scanReviews fails closed when an audited row changes before its update', async (t) => {
  const driftCases = [
    {
      name: 'source',
      mutate(row) {
        row.reviewSource = 'Active Away Testimonial';
      },
    },
    {
      name: 'unique identifier',
      mutate(row) {
        row.reviewUniqueId = 'form-feedback:1';
      },
    },
    {
      name: 'current flag',
      mutate(row) {
        row.displayOnGlobalReviewGrid = true;
      },
    },
  ];

  for (const driftCase of driftCases) {
    await t.test(driftCase.name, async () => {
      const mock = createMockStrapi(
        [
          {
            id: 1,
            documentId: 'legacy-one',
            publishedAt: '2026-01-01T00:00:00.000Z',
            reviewSource: 'Google',
            reviewUniqueId: 'google:1',
            displayOnGlobalReviewGrid: false,
          },
        ],
        {
          beforeUpdate({ rows }) {
            driftCase.mutate(rows[0]);
          },
        },
      );

      await assert.rejects(
        scanReviews(mock.strapi, {
          apply: true,
          batchSize: 1,
          expectedDocumentCount: 1,
        }),
        /update batch did not complete in full/,
      );

      assert.equal(mock.calls.updates.length, 1);
      assert.equal(mock.calls.updateWheres[0].$or.length, 1);
      if (driftCase.name !== 'current flag') {
        assert.equal(mock.rows[0].displayOnGlobalReviewGrid, false);
      }
    });
  }
});

test('scanReviews applies in bounded batches, skips feedback, and is resumable', async () => {
  const mock = createMockStrapi([
    {
      id: 1,
      documentId: 'legacy-one',
      publishedAt: null,
      reviewSource: 'Google',
      reviewUniqueId: 'google:1',
      displayOnGlobalReviewGrid: null,
    },
    {
      id: 2,
      documentId: 'legacy-one',
      publishedAt: '2026-01-01T00:00:00.000Z',
      reviewSource: 'Google',
      reviewUniqueId: 'google:1',
      displayOnGlobalReviewGrid: false,
    },
    {
      id: 3,
      documentId: 'feedback-one',
      publishedAt: '2026-01-01T00:00:00.000Z',
      reviewSource: 'Active Away Testimonial',
      reviewUniqueId: 'form-feedback:1',
      displayOnGlobalReviewGrid: false,
    },
    {
      id: 4,
      documentId: 'legacy-two',
      publishedAt: '2026-01-02T00:00:00.000Z',
      reviewSource: 'Trustpilot',
      reviewUniqueId: 'trustpilot:1',
      displayOnGlobalReviewGrid: true,
    },
    {
      id: 5,
      documentId: 'internal-one',
      publishedAt: '2026-01-03T00:00:00.000Z',
      reviewSource: 'Internal',
      reviewUniqueId: 'internal:1',
      displayOnGlobalReviewGrid: false,
    },
  ]);

  const first = await scanReviews(mock.strapi, {
    apply: true,
    batchSize: 2,
    expectedDocumentCount: 2,
  });
  assert.equal(first.updatedVersions, 2);
  assert.deepEqual(mock.calls.updates, [[1, 2]]);
  assert.equal(mock.rows[0].displayOnGlobalReviewGrid, true);
  assert.equal(mock.rows[1].displayOnGlobalReviewGrid, true);
  assert.equal(mock.rows[2].displayOnGlobalReviewGrid, false);
  assert.equal(mock.rows[4].displayOnGlobalReviewGrid, false);

  const resumed = await scanReviews(mock.strapi, {
    apply: true,
    batchSize: 2,
    expectedDocumentCount: 2,
  });
  assert.equal(resumed.summary.versions.pending, 0);
  assert.equal(resumed.updatedVersions, 0);
  assert.deepEqual(mock.calls.updates, [[1, 2]]);
});
