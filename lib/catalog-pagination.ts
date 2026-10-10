import type { CatalogFilters } from "./catalog-filter.ts";
import { emptyCatalogFilters } from "./catalog-filter.ts";

export type CatalogVariant = "mystery" | "challenge";
export const catalogPageSizes: Record<CatalogVariant, number> = { mystery: 9, challenge: 6 };

export function paginateCatalog<T>(items: readonly T[], requestedPage: number, pageSize: number) {
  if (!Number.isInteger(pageSize) || pageSize < 1)
    throw new RangeError("Invalid catalog page size");
  const totalPages = Math.ceil(items.length / pageSize);
  const page = Math.min(Math.max(1, Math.floor(requestedPage) || 1), Math.max(1, totalPages));
  const start = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    items: items.slice(start, start + pageSize),
    start: items.length ? start + 1 : 0,
    end: Math.min(start + pageSize, items.length),
  };
}

export function paginationPages(page: number, totalPages: number): (number | "ellipsis")[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) result.push("ellipsis");
    result.push(value);
  });
  return result;
}

export const initialCatalogView = { filters: emptyCatalogFilters, page: 1 };
export function catalogViewReducer(
  state: typeof initialCatalogView,
  action:
    | { type: "filters"; update: (filters: CatalogFilters) => CatalogFilters }
    | { type: "page"; page: number },
) {
  return action.type === "filters"
    ? { filters: action.update(state.filters), page: 1 }
    : { ...state, page: action.page };
}
