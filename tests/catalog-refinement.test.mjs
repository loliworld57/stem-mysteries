import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { runInThisContext } from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { createChallengeState, challengeReducer } from "../lib/challenge-state.ts";
import { restoreChallenge, serializeChallenge } from "../lib/challenge-storage.ts";
import { problemCatalog } from "../lib/problem-catalog.ts";
import { challengeCatalog } from "../lib/challenge-catalog.ts";
import { academicLabel, getTopic, topicDefinitions } from "../lib/catalog-metadata.ts";
import {
  catalogFilterOptions,
  emptyCatalogFilters,
  featuredEntries,
  filterCatalog,
} from "../lib/catalog-filter.ts";

// Compile components in memory so rendering tests exercise the real JSX without a browser or snapshots.
const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, "..");
const cache = new Map();
function loadComponent(filename) {
  const path = resolve(root, filename);
  if (cache.has(path)) return cache.get(path).exports;
  const compiledModule = { exports: {} };
  cache.set(path, compiledModule);
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const localRequire = (id) => {
    if (!id.startsWith("@/") && !id.startsWith(".")) return require(id);
    let target = id.startsWith("@/") ? resolve(root, id.slice(2)) : resolve(dirname(path), id);
    if (!/\.tsx?$/.test(target)) target += target.includes("components") ? ".tsx" : ".ts";
    return loadComponent(target);
  };
  runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: path })(
    localRequire,
    compiledModule,
    compiledModule.exports,
  );
  return compiledModule.exports;
}

test("registered academic metadata is accurate and separately filterable", () => {
  for (const entry of [...problemCatalog, ...challengeCatalog]) {
    assert.deepEqual(entry.subjectIds, ["physics"]);
    assert.deepEqual(entry.gradeIds, ["9"]);
    assert.ok(entry.topicIds.every((id) => topicDefinitions.some((topic) => topic.id === id)));
    assert.equal(academicLabel(entry), "Vật lí · Lớp 9");
  }
  assert.deepEqual(catalogFilterOptions(problemCatalog, "gradeIds"), ["9"]);
  assert.deepEqual(catalogFilterOptions(challengeCatalog, "subjectIds"), ["physics"]);
});

test("topic colors are stable across catalogs with a neutral unknown fallback", () => {
  for (const [id, color] of [
    ["friction", "orange"],
    ["energy", "amber"],
    ["motion", "teal"],
    ["force", "purple"],
    ["mechanics", "green"],
  ])
    assert.equal(getTopic(id).colorToken, color);
  assert.equal(getTopic("unknown").colorToken, "neutral");
  const { TopicTags } = loadComponent("components/catalog/topic-tags.tsx");
  const html = renderToStaticMarkup(
    React.createElement(TopicTags, { ids: ["friction", "unknown"] }),
  );
  assert.match(html, /data-color="orange"[^>]*>Ma sát/);
  assert.match(html, /data-color="neutral"[^>]*>unknown/);
});

test("search ignores case and Vietnamese accents, including đ; filters combine AND and OR", () => {
  assert.equal(
    filterCatalog(challengeCatalog, { ...emptyCatalogFilters, search: "  DUONG DOC AN TOAN  " })
      .length,
    1,
  );
  assert.equal(
    filterCatalog(problemCatalog, {
      ...emptyCatalogFilters,
      search: "nang luong",
      topicIds: ["friction", "potential-energy"],
      gradeIds: ["9"],
      subjectIds: ["physics"],
    }).length,
    1,
  );
  assert.equal(
    filterCatalog(problemCatalog, {
      ...emptyCatalogFilters,
      search: "nang luong",
      topicIds: ["friction"],
    }).length,
    0,
  );
  assert.equal(
    filterCatalog(problemCatalog, { ...emptyCatalogFilters, gradeIds: ["8"] }).length,
    0,
  );
  assert.equal(
    filterCatalog(problemCatalog, { ...emptyCatalogFilters, search: "không tồn tại" }).length,
    0,
  );
  const multi = [
    {
      title: "Đề tài",
      subjectIds: ["physics", "chemistry"],
      gradeIds: ["8", "9"],
      topicIds: ["energy"],
    },
  ];
  assert.equal(
    filterCatalog(multi, { ...emptyCatalogFilters, subjectIds: ["chemistry"], gradeIds: ["8"] })
      .length,
    1,
  );
});

test("featured selection is configured, ordered and capped at two without mutating catalogs", () => {
  const entries = [
    { id: "a", featured: true, featuredOrder: 3 },
    { id: "b", featured: false },
    { id: "c", featured: true, featuredOrder: 1 },
    { id: "d", featured: true, featuredOrder: 2 },
  ];
  assert.deepEqual(
    featuredEntries(entries).map((entry) => entry.id),
    ["c", "d"],
  );
  assert.equal(entries[0].id, "a");
  assert.equal(featuredEntries(challengeCatalog).length, 1);
  assert.equal(featuredEntries(problemCatalog).length, 2);
  assert.deepEqual(featuredEntries([]), []);
});

test("a second Challenge renders all metadata through the unchanged reusable card", () => {
  const { ChallengeCard } = loadComponent("components/catalog/challenge-card.tsx");
  const entry = {
    ...challengeCatalog[0],
    id: "test-second",
    number: 2,
    title: "Thiết kế thứ hai",
    description: "Mô tả riêng",
    href: "/thu-thach/thu-hai",
    subjectIds: ["chemistry"],
    gradeIds: ["8"],
    topicIds: ["force"],
    activitySummary: "Hoạt động riêng",
  };
  const html = renderToStaticMarkup(
    React.createElement(ChallengeCard, {
      challenge: entry,
      illustration: React.createElement("div", null, "Minh họa riêng"),
    }),
  );
  for (const text of [
    entry.title,
    entry.description,
    entry.href,
    "THỬ THÁCH STEM 02",
    "Hóa học · Lớp 8",
    "Lực",
    entry.activitySummary,
    "Minh họa riêng",
  ])
    assert.ok(html.includes(text), text);
  assert.ok(!html.includes(challengeCatalog[0].title));
});

test("catalog empty state and reset are rendered accessibly", () => {
  const { CatalogBrowser } = loadComponent("components/catalog/catalog-browser.tsx");
  const html = renderToStaticMarkup(React.createElement(CatalogBrowser, { entries: [] }, []));
  assert.match(html, /Chưa tìm thấy hoạt động phù hợp/);
  assert.match(html, /Đặt lại bộ lọc/);
  assert.match(html, /aria-live="polite"/);
});

test("the seven report sections render saved evidence and student writing without changing state", () => {
  let state = challengeReducer(createChallengeState(), { type: "start" });
  for (let count = 1; count <= 5; count++) {
    for (const action of [
      { type: "predict" },
      { type: "prediction", safe: true, explanation: "Có thể" },
      { type: "run" },
      { type: "finish" },
      { type: "analysis", text: "Cần thử lại" },
    ])
      state = challengeReducer(state, action);
    if (count < 5)
      for (const action of [
        { type: "improve" },
        { type: "improvement", decision: { factor: "repeat", explanation: "Kiểm tra" } },
        { type: "next" },
      ])
        state = challengeReducer(state, action);
  }
  state = challengeReducer(state, { type: "review" });
  state = challengeReducer(state, {
    type: "final-argument",
    argument: {
      ...state.finalDesign,
      attemptId: state.attempts[0].id,
      evidenceIds: [state.attempts[0].id],
      claim: "Nhóm chọn",
      evidenceReasoning: "Từ lần đầu",
      reasoning: "Còn xa",
      comparisonReasoning: "Giống nhau",
    },
  });
  state = challengeReducer(state, { type: "submit-final" });
  for (let index = 0; index < 5; index++)
    state = challengeReducer(state, { type: "reflection", index, text: "Em học từ thử nghiệm" });
  state = challengeReducer(state, { type: "complete" });
  const saved = serializeChallenge(state);
  const restored = restoreChallenge(saved);
  assert.equal(restored.status, "saved");
  const { EngineeringNotebook } = loadComponent("components/challenge/engineering-notebook.tsx");
  const html = renderToStaticMarkup(
    React.createElement(EngineeringNotebook, {
      state: restored.state,
      dispatch: () => assert.fail("render must not dispatch"),
    }),
  );
  for (const heading of [
    "1. Mục tiêu thiết kế",
    "2. Phương án thiết kế",
    "3. Quá trình thử nghiệm",
    "4. Phân tích và cải tiến",
    "5. Phương án đề xuất",
    "6. Kết luận và bài học rút ra",
    "7. Kiểm chứng bằng mô hình thực tế",
  ])
    assert.ok(html.includes(heading));
  for (const text of ["Có thể", "Cần thử lại", "Kiểm tra", "Nhóm chọn", "Em học từ thử nghiệm"])
    assert.ok(html.includes(text));
  assert.equal(serializeChallenge(restored.state), saved);
  assert.equal(state.stage, "completed");
});
