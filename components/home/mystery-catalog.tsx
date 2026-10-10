import Link from "next/link";
import { problemCatalog } from "@/lib/problem-catalog";
import { featuredEntries } from "@/lib/catalog-filter";
import { ProblemCard } from "@/components/catalog/problem-card";
export function MysteryCatalog() {
  return (
    <section id="bi-an" className="home-section catalog-section" aria-labelledby="catalog-title">
      <div className="eyebrow">Tìm hiểu hiện tượng và kiến thức</div>
      <h2 id="catalog-title" className="section-title">
        Vấn đề khám phá
      </h2>
      <p className="section-description">
        Quan sát, thử nghiệm và dùng bằng chứng để giải thích các hiện tượng khoa học.
      </p>
      <div className="mystery-catalog-grid">
        {featuredEntries(problemCatalog).map((entry) => (
          <ProblemCard key={entry.id} problem={entry} />
        ))}
      </div>
      <Link className="catalog-all-link" href="/kham-pha">
        Xem tất cả vấn đề khám phá →
      </Link>
    </section>
  );
}
