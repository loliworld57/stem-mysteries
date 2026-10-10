import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { runInThisContext } from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import {
  catalogPageSizes,
  catalogViewReducer,
  initialCatalogView,
  paginateCatalog,
  paginationPages,
} from "../lib/catalog-pagination.ts";
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
      target: ts.ScriptTarget.ES2022,
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
  assert.match(html, /Chưa tìm thấy nội dung phù hợp/);
  assert.ok(!html.includes("Xóa bộ lọc"));
  assert.match(html, /Tìm kiếm hoạt động\.\.\./);
  assert.match(html, /role="search"/);
  assert.equal((html.match(/aria-expanded="false"/g) ?? []).length, 3);
  assert.ok(!html.includes("<details"));
  assert.ok(!html.includes("<fieldset"));
  assert.match(html, /aria-live="polite"/);
});

test("Challenge briefing presents engineering instructions before an initially disabled start action", () => {
  const { ChallengeIntroduction } = loadComponent(
    "components/challenge/challenge-introduction.tsx",
  );
  const html = renderToStaticMarkup(React.createElement(ChallengeIntroduction, { onStart() {} }));
  const sections = [
    "Tình huống thực tiễn",
    "Nhiệm vụ thiết kế",
    "Tiêu chí và ràng buộc",
    "Kiến thức cần vận dụng",
    "Quy trình thực hiện",
    "Bắt đầu thiết kế",
  ];
  const positions = sections.map((text) => html.indexOf(text));
  assert.ok(
    positions.every(
      (position, index) => position >= 0 && (index === 0 || position > positions[index - 1]),
    ),
  );
  assert.match(html, /10–30/);
  assert.match(html, /từ chân dốc/);
  assert.match(html, /5.*lần thử chính thức tối đa/);
  assert.match(html, /Vận tốc không phải tiêu chí thành công độc lập/);
  assert.match(html, /nguyên mẫu/);
  assert.match(html, /không bắt buộc/);
  assert.match(html, /<button[^>]*disabled=""/);
  assert.ok(!html.includes("Sắp tới"));
  assert.equal((html.match(/data-state="upcoming"/g) ?? []).length, 6);
});

test("pagination slices filtered results and calculates total pages and visible ranges", () => {
  const entries = Array.from({ length: 25 }, (_, index) => ({
    id: index,
    title: `Hoạt động ${index}`,
    subjectIds: ["physics"],
    gradeIds: [index < 12 ? "9" : "8"],
    topicIds: ["friction"],
  }));
  const filtered = filterCatalog(entries, { ...emptyCatalogFilters, gradeIds: ["9"] });
  const first = paginateCatalog(filtered, 1, catalogPageSizes.mystery);
  assert.equal(first.totalPages, 2);
  assert.deepEqual(
    first.items.map((entry) => entry.id),
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
  );
  assert.deepEqual([first.start, first.end], [1, 9]);
  const last = paginateCatalog(filtered, 2, catalogPageSizes.mystery);
  assert.deepEqual(
    last.items.map((entry) => entry.id),
    [9, 10, 11],
  );
  assert.deepEqual([last.start, last.end], [10, 12]);
});

test("search, each filter category, removal and reset return pagination to page one", () => {
  const laterPage = catalogViewReducer(initialCatalogView, { type: "page", page: 3 });
  assert.equal(laterPage.page, 3);
  for (const patch of [
    { search: "xe" },
    { topicIds: ["friction"] },
    { gradeIds: ["9"] },
    { subjectIds: ["physics"] },
    emptyCatalogFilters,
  ]) {
    const state = catalogViewReducer(laterPage, {
      type: "filters",
      update: (filters) => ({ ...filters, ...patch }),
    });
    assert.equal(state.page, 1);
    assert.deepEqual(state.filters, { ...emptyCatalogFilters, ...patch });
  }
});

test("pagination clamps first and last pages, handles empty and one-page catalogs, and accepts custom sizes", () => {
  const entries = Array.from({ length: 12 }, (_, index) => index);
  assert.equal(catalogPageSizes.challenge, 6);
  assert.equal(paginateCatalog(entries, 1, 6).totalPages, 2);
  assert.equal(paginateCatalog(entries, 1, 4).totalPages, 3);
  assert.equal(paginateCatalog(entries, 0, 4).page, 1);
  assert.equal(paginateCatalog(entries, 99, 4).page, 3);
  assert.equal(paginateCatalog(entries, 1, 20).totalPages, 1);
  assert.deepEqual(paginateCatalog([], 5, 9), {
    page: 1,
    totalPages: 0,
    items: [],
    start: 0,
    end: 0,
  });
  for (const size of [0, -1, 1.5])
    assert.throws(() => paginateCatalog(entries, 1, size), RangeError);
});

test("pagination controls indicate current page, disable boundaries and hide for one page", () => {
  const { CatalogPagination } = loadComponent("components/catalog/catalog-pagination.tsx");
  const render = (page, totalPages) =>
    renderToStaticMarkup(
      React.createElement(CatalogPagination, { page, totalPages, onPageChange: () => {} }),
    );
  assert.equal(render(1, 1), "");
  assert.equal(render(1, 0), "");
  assert.match(render(1, 3), /disabled=""[^>]*>← Trước/);
  assert.match(render(3, 3), /disabled=""[^>]*>Tiếp →/);
  assert.match(render(2, 3), /aria-label="Trang 2" aria-current="page"/);
  assert.deepEqual(paginationPages(50, 100), [1, "ellipsis", 49, 50, 51, "ellipsis", 100]);
  assert.ok(paginationPages(1, 100).length <= 7);
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
