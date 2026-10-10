import Link from "next/link";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { ProblemCard } from "@/components/catalog/problem-card";
import { problemCatalog } from "@/lib/problem-catalog";

export const metadata = {
  title: "Xem mẫu bố cục Mystery",
  robots: { index: false, follow: false },
};
const sampleCounts = [1, 2, 3, 5, 9];

export default async function MysteryLayoutSamples({
  searchParams,
}: {
  searchParams: Promise<{ count?: string }>;
}) {
  const requested = Number((await searchParams).count ?? 9);
  const count = sampleCounts.includes(requested) ? requested : 9;
  const samples = Array.from({ length: count }, (_, index) => {
    const original = problemCatalog[index % problemCatalog.length];
    return { original, entry: { ...original, id: `layout-sample-${index + 1}` } };
  });
  return (
    <section className="home-section">
      <h1>Xem mẫu bố cục Mystery</h1>
      <p>
        Các thẻ dưới đây lặp lại hai hoạt động hiện có để xem bố cục. Đây không phải hoạt động mới.
      </p>
      <nav aria-label="Số thẻ mẫu">
        {sampleCounts.map((value) => (
          <Link
            key={value}
            href={`/kham-pha/mau?count=${value}`}
            aria-current={value === count ? "page" : undefined}
            style={{ marginRight: 16, fontWeight: value === count ? 700 : undefined }}
          >
            {value} thẻ
          </Link>
        ))}
        <Link href="/kham-pha">Về danh mục</Link>
      </nav>
      <CatalogBrowser variant="mystery" entries={samples.map(({ entry }) => entry)}>
        {samples.map(({ original, entry }) => (
          <ProblemCard key={entry.id} problem={original} />
        ))}
      </CatalogBrowser>
    </section>
  );
}
