import { ArrowRight, Car, FlaskConical, PencilRuler, Target } from "lucide-react";
import Link from "next/link";
import { challengeCatalog } from "@/lib/challenge-catalog";
import { challengeConfig } from "@/lib/challenge-config";

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
          <div className="home-challenge-visual" aria-hidden="true">
            <div className="home-challenge-visual-label">
              <FlaskConical size={18} /> Phòng thử nghiệm thiết kế
            </div>
            <div className="home-challenge-apparatus">
              <div className="home-challenge-ramp" />
              <Car className="home-challenge-car" size={58} strokeWidth={1.8} />
              <div className="home-challenge-ground" />
              <div className="home-challenge-safe-zone">
                <Target size={20} />
              </div>
              <div className="home-challenge-zone-caption">
                Vùng dừng an toàn
                <strong>
                  {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm
                </strong>
              </div>
            </div>
            <p>Thiết kế · Thử nghiệm · Cải tiến</p>
          </div>
          <div className="home-challenge-copy">
            <div className="case-label">
              <PencilRuler size={18} aria-hidden="true" /> {challenge.caseLabel}
            </div>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <ul className="topic-tags">
              {challenge.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <div className="home-challenge-footer">
              <span className="home-challenge-attempts">
                <FlaskConical size={19} aria-hidden="true" />
                Tối đa {challengeConfig.maxAttempts} lần thử
              </span>
              <Link className="primary cta" href={challenge.href}>
                Nhận thử thách <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
