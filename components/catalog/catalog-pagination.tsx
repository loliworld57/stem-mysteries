import { paginationPages } from "@/lib/catalog-pagination";

export function CatalogPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="catalog-pagination" aria-label="Phân trang danh mục">
      <button type="button" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        ← Trước
      </button>
      {paginationPages(page, totalPages).map((value, index) =>
        value === "ellipsis" ? (
          <span key={`gap-${index}`} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            type="button"
            key={value}
            aria-label={`Trang ${value}`}
            aria-current={value === page ? "page" : undefined}
            onClick={() => onPageChange(value)}
          >
            {value}
          </button>
        ),
      )}
      <button type="button" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Tiếp →
      </button>
    </nav>
  );
}
