import test from "node:test";
import assert from "node:assert/strict";
import { problemCatalog } from "../lib/problem-catalog.ts";
import { challengeCatalog } from "../lib/challenge-catalog.ts";

test("catalog identities and URLs are unique, ordered and preserve existing routes", () => {
  for (const catalog of [problemCatalog, challengeCatalog]) {
    assert.equal(new Set(catalog.map((entry) => entry.id)).size, catalog.length);
  }
  const entries = [...problemCatalog, ...challengeCatalog];
  assert.equal(new Set(entries.map((entry) => entry.href)).size, entries.length);
  assert.deepEqual(
    entries.map((entry) => entry.href),
    [
      "/kham-pha/chiec-xe-truot-xa",
      "/kham-pha/nang-luong-tren-doc",
      "/thu-thach/duong-doc-an-toan",
    ],
  );
  for (const entry of entries) {
    assert.match(entry.href, /^\/(kham-pha|thu-thach)\/[a-z0-9-]+$/);
    assert.equal(new URL(entry.href, "https://stem.example").pathname, entry.href);
    assert.ok(entry.metadata.title && entry.metadata.description);
  }
});

test("Challenges reference existing Problems", () => {
  const ids = new Set(problemCatalog.map((problem) => problem.id));
  for (const challenge of challengeCatalog) {
    assert.ok(challenge.relatedProblemIds.length > 0);
    for (const id of challenge.relatedProblemIds) assert.ok(ids.has(id));
  }
});
