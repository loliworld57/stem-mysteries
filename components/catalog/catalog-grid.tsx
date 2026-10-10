import { Children, type ReactNode } from "react";
import type { CatalogVariant } from "@/lib/catalog-pagination";

export function CatalogGrid({
  variant,
  children,
}: {
  variant: CatalogVariant;
  children: ReactNode;
}) {
  return (
    <div
      className={`catalog-grid catalog-grid--${variant}`}
      data-item-count={Children.toArray(children).length}
    >
      {children}
    </div>
  );
}
