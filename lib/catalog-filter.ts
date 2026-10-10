import type { AcademicMetadata } from "./catalog-types.ts";

export interface CatalogFilters {
  search: string;
  topicIds: readonly string[];
  gradeIds: readonly string[];
  subjectIds: readonly string[];
}
export const emptyCatalogFilters: CatalogFilters = {
  search: "",
  topicIds: [],
  gradeIds: [],
  subjectIds: [],
};

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").replace(/[đĐ]/g, "d").toLowerCase().trim();
}

export function filterCatalog<T extends AcademicMetadata & { title: string }>(
  entries: readonly T[],
  filters: CatalogFilters,
): T[] {
  return entries.filter(
    (entry) =>
      normalizeSearch(entry.title).includes(normalizeSearch(filters.search)) &&
      (["topicIds", "gradeIds", "subjectIds"] as const).every(
        (key) => filters[key].length === 0 || filters[key].some((id) => entry[key].includes(id)),
      ),
  );
}

export function catalogFilterOptions(
  entries: readonly AcademicMetadata[],
  key: "topicIds" | "gradeIds" | "subjectIds",
) {
  return [...new Set(entries.flatMap((entry) => [...entry[key]]))];
}

export function featuredEntries<T extends AcademicMetadata>(entries: readonly T[]): T[] {
  return entries
    .filter((entry) => entry.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity))
    .slice(0, 2);
}
