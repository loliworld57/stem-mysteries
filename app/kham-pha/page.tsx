import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { ProblemCard } from "@/components/catalog/problem-card";
import { problemCatalog } from "@/lib/problem-catalog";

export const metadata = { title: "Vấn đề khám phá" };
export default function ExplorationCatalogPage() {
  return (
    <section className="home-section">
      <h1>Vấn đề khám phá</h1>
      <p>Quan sát, thử nghiệm và giải thích bằng bằng chứng khoa học.</p>
      <CatalogBrowser entries={problemCatalog}>
        {problemCatalog.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </CatalogBrowser>
    </section>
  );
}
