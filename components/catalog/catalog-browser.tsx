"use client";

import { useState, type ReactNode } from "react";
import type { AcademicMetadata } from "@/lib/catalog-types";
import { catalogFilterOptions, emptyCatalogFilters, filterCatalog } from "@/lib/catalog-filter";
import { getTopic, gradeDefinitions, subjectDefinitions } from "@/lib/catalog-metadata";

export function CatalogBrowser({
  entries,
  children,
}: {
  entries: readonly (AcademicMetadata & { id: string; title: string })[];
  children: ReactNode[];
}) {
  const [filters, setFilters] = useState(emptyCatalogFilters);
  const matches = new Set(filterCatalog(entries, filters).map((entry) => entry.id));
  return (
    <>
      <div className="catalog-filters">
        <label className="catalog-search">
          Tên hoạt động
          <input
            type="search"
            placeholder="Tìm kiếm theo tên..."
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
          />
        </label>
        {(["topicIds", "gradeIds", "subjectIds"] as const).map((key) => (
          <fieldset key={key}>
            <legend>
              {key === "topicIds" ? "Chủ đề" : key === "gradeIds" ? "Lớp" : "Môn học"}
            </legend>
            <div className="catalog-filter-options">
              {catalogFilterOptions(entries, key).map((id) => (
                <label
                  key={id}
                  className="catalog-filter-option"
                  data-active={filters[key].includes(id)}
                >
                  <input
                    type="checkbox"
                    checked={filters[key].includes(id)}
                    onChange={(event) =>
                      setFilters({
                        ...filters,
                        [key]: event.target.checked
                          ? [...filters[key], id]
                          : filters[key].filter((value) => value !== id),
                      })
                    }
                  />
                  {key === "topicIds"
                    ? getTopic(id).label
                    : key === "gradeIds"
                      ? (gradeDefinitions[id] ?? `Lớp ${id}`)
                      : (subjectDefinitions[id] ?? id)}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <button className="secondary" onClick={() => setFilters(emptyCatalogFilters)}>
          Đặt lại bộ lọc
        </button>
      </div>
      <p role="status" aria-live="polite">
        {matches.size} hoạt động phù hợp
      </p>
      {matches.size === 0 && (
        <p className="catalog-empty">
          Chưa tìm thấy hoạt động phù hợp. Hãy thử tên khác hoặc đặt lại bộ lọc.
        </p>
      )}
      <div className="catalog-results">
        {entries.map((entry, index) => (matches.has(entry.id) ? children[index] : null))}
      </div>
    </>
  );
}
