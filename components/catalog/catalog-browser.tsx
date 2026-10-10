"use client";

import { useEffect, useId, useRef, useReducer, useState, type ReactNode } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { AcademicMetadata } from "@/lib/catalog-types";
import { catalogFilterOptions, emptyCatalogFilters, filterCatalog } from "@/lib/catalog-filter";
import { getTopic, gradeDefinitions, subjectDefinitions } from "@/lib/catalog-metadata";
import {
  catalogPageSizes,
  catalogViewReducer,
  initialCatalogView,
  paginateCatalog,
  type CatalogVariant,
} from "@/lib/catalog-pagination";
import type { CatalogFilters } from "@/lib/catalog-filter";
import { CatalogGrid } from "./catalog-grid";
import { CatalogPagination } from "./catalog-pagination";

const filterCategories = [
  { key: "topicIds", label: "Chủ đề" },
  { key: "gradeIds", label: "Khối lớp" },
  { key: "subjectIds", label: "Môn học" },
] as const;
type FilterKey = (typeof filterCategories)[number]["key"];

function filterLabel(key: FilterKey, id: string) {
  return key === "topicIds"
    ? getTopic(id).label
    : key === "gradeIds"
      ? (gradeDefinitions[id] ?? `Lớp ${id}`)
      : (subjectDefinitions[id] ?? id);
}

export function CatalogBrowser({
  entries,
  children,
  variant = "mystery",
}: {
  entries: readonly (AcademicMetadata & { id: string; title: string })[];
  children: ReactNode[];
  variant?: CatalogVariant;
}) {
  const [{ filters, page }, dispatch] = useReducer(catalogViewReducer, initialCatalogView);
  function setFilters(update: CatalogFilters | ((current: CatalogFilters) => CatalogFilters)) {
    dispatch({ type: "filters", update: typeof update === "function" ? update : () => update });
  }
  const searchId = useId();
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const toolbar = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const filtered = filterCatalog(entries, filters);
  const pagination = paginateCatalog(filtered, page, catalogPageSizes[variant]);
  const visibleIds = new Set(pagination.items.map((entry) => entry.id));
  const results = useRef<HTMLParagraphElement>(null);
  function changePage(nextPage: number) {
    dispatch({ type: "page", page: nextPage });
    results.current?.focus({ preventScroll: true });
    results.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }
  const activeFilters = filterCategories.flatMap(({ key, label }) =>
    filters[key].map((id) => ({ key, id, label, value: filterLabel(key, id) })),
  );
  const hasFilters = activeFilters.length > 0 || filters.search.length > 0;

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Element &&
        (!toolbar.current?.contains(event.target) || !event.target.closest(".catalog-filter"))
      )
        setOpenFilter(null);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function toggleFilter(key: FilterKey, id: string) {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(id)
        ? current[key].filter((value) => value !== id)
        : [...current[key], id],
    }));
  }
  function clearSearch() {
    setFilters((current) => ({ ...current, search: "" }));
    searchInput.current?.focus();
  }

  return (
    <>
      <div className="catalog-discovery" ref={toolbar}>
        <div className="catalog-toolbar" role="search" aria-label="Tìm hoạt động trong danh mục">
          <div className="catalog-search-field">
            <label className="catalog-sr-only" htmlFor={searchId}>
              Tìm kiếm theo tên
            </label>
            <Search size={20} aria-hidden="true" />
            <input
              ref={searchInput}
              id={searchId}
              type="search"
              placeholder="Tìm kiếm hoạt động..."
              value={filters.search}
              onChange={(event) => {
                const search = event.currentTarget.value;
                setFilters((current) => ({ ...current, search }));
              }}
            />
            {filters.search && (
              <button
                type="button"
                className="catalog-icon-button"
                aria-label="Xóa tìm kiếm"
                onClick={clearSearch}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="catalog-filter-controls" aria-label="Bộ lọc nội dung">
            {filterCategories.map(({ key, label }) => (
              <div
                className="catalog-filter"
                data-open={openFilter === key}
                key={key}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setOpenFilter(null);
                    event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
                  }
                }}
                onBlur={(event) => {
                  if (
                    event.relatedTarget instanceof Node &&
                    !event.currentTarget.contains(event.relatedTarget)
                  )
                    setOpenFilter(null);
                }}
              >
                <button
                  type="button"
                  className="catalog-filter-trigger"
                  data-active={filters[key].length > 0}
                  aria-expanded={openFilter === key}
                  aria-controls={`${searchId}-${key}`}
                  onClick={() => setOpenFilter((current) => (current === key ? null : key))}
                >
                  <span>{label}</span>
                  {filters[key].length > 0 && (
                    <span className="catalog-filter-count">
                      {filters[key].length}
                      <span className="catalog-sr-only"> đã chọn</span>
                    </span>
                  )}
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                {openFilter === key && (
                  <div
                    id={`${searchId}-${key}`}
                    className="catalog-filter-popover"
                    role="group"
                    aria-label={label}
                  >
                    <p className="catalog-menu-caption" aria-hidden="true">
                      Chọn {label.toLowerCase()}
                    </p>
                    {catalogFilterOptions(entries, key).map((id) => (
                      <label
                        className="catalog-filter-choice"
                        tabIndex={-1}
                        data-active={filters[key].includes(id)}
                        key={id}
                      >
                        <input
                          type="checkbox"
                          checked={filters[key].includes(id)}
                          onChange={() => toggleFilter(key, id)}
                        />
                        <span>{filterLabel(key, id)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {hasFilters && (
          <div className="catalog-active-filters" role="group" aria-label="Bộ lọc đang áp dụng">
            <span className="catalog-active-label">Đang lọc</span>
            {filters.search && (
              <button
                type="button"
                className="catalog-remove-filter"
                aria-label={`Xóa tìm kiếm: ${filters.search}`}
                onClick={clearSearch}
              >
                <span>{filters.search}</span>
                <X size={14} aria-hidden="true" />
              </button>
            )}
            {activeFilters.map(({ key, id, label, value }) => (
              <button
                type="button"
                key={key + id}
                className="catalog-remove-filter"
                aria-label={`Xóa bộ lọc ${label}: ${value}`}
                onClick={() => toggleFilter(key, id)}
              >
                <span>{value}</span>
                <X size={14} aria-hidden="true" />
              </button>
            ))}
            <button
              type="button"
              className="catalog-clear-filters"
              onClick={() => setFilters(emptyCatalogFilters)}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
      <p
        ref={results}
        tabIndex={-1}
        className="catalog-result-count"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length} hoạt động phù hợp
        {pagination.totalPages > 1 && (
          <span>
            {" "}
            · Hiển thị {pagination.start}–{pagination.end}
          </span>
        )}
      </p>
      {filtered.length === 0 && (
        <div className="catalog-empty">
          <h2>Chưa tìm thấy nội dung phù hợp</h2>
          <p>Em thử một tên khác hoặc bớt bộ lọc để tiếp tục khám phá nhé.</p>
        </div>
      )}
      <CatalogGrid variant={variant}>
        {entries.map((entry, index) => (visibleIds.has(entry.id) ? children[index] : null))}
      </CatalogGrid>
      <CatalogPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={changePage}
      />
    </>
  );
}
