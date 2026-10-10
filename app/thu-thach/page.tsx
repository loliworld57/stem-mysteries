import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { ChallengeCard } from "@/components/catalog/challenge-card";
import { challengeIllustration } from "@/components/catalog/challenge-illustration";
import { challengeCatalog } from "@/lib/challenge-catalog";

export const metadata = { title: "Thử thách STEM" };
export default function ChallengeCatalogPage() {
  return (
    <section className="home-section">
      <h1>Thử thách STEM</h1>
      <p>Thiết kế, thử nghiệm và cải tiến giải pháp từ kiến thức khoa học.</p>
      <CatalogBrowser entries={challengeCatalog}>
        {challengeCatalog.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            illustration={challengeIllustration(challenge.id)}
          />
        ))}
      </CatalogBrowser>
    </section>
  );
}
