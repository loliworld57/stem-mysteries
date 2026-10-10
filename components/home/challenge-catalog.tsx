import Link from "next/link";
import { challengeCatalog } from "@/lib/challenge-catalog";
import { featuredEntries } from "@/lib/catalog-filter";
import { ChallengeCard } from "@/components/catalog/challenge-card";
import { challengeIllustration } from "@/components/catalog/challenge-illustration";
export function ChallengeCatalog() {
  return (
    <section id="thu-thach" className="home-section" aria-labelledby="challenge-catalog-title">
      <div className="eyebrow">Vận dụng kiến thức để thiết kế giải pháp</div>
      <h2 id="challenge-catalog-title" className="section-title">
        Thử thách STEM
      </h2>
      <p className="section-description">
        Từ các vấn đề khám phá, nhóm em dùng bằng chứng khoa học để thiết kế, kiểm chứng và cải
        tiến.
      </p>
      <div className="challenge-catalog-grid">
        {featuredEntries(challengeCatalog).map((entry) => (
          <ChallengeCard
            key={entry.id}
            challenge={entry}
            illustration={challengeIllustration(entry.id)}
          />
        ))}
      </div>
      <Link className="catalog-all-link" href="/thu-thach">
        Xem tất cả thử thách STEM →
      </Link>
    </section>
  );
}
