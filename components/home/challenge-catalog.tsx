import Link from "next/link";
import { challengeCatalog } from "@/lib/challenge-catalog";

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
      {challengeCatalog.map((challenge) => (
        <article className="home-challenge-entry" key={challenge.id}>
          <div>
            <div className="case-label">{challenge.caseLabel}</div>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <p>{challenge.topics.join(" · ")}</p>
          </div>
          <Link className="primary cta" href={challenge.href}>
            Nhận thử thách →
          </Link>
        </article>
      ))}
    </section>
  );
}
