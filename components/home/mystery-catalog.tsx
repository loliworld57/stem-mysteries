import Link from "next/link";
import { problemCatalog } from "@/lib/problem-catalog";
import { MysteryScene } from "@/components/mystery/mystery-scene";
import { EnergyRamp } from "@/components/energy/energy-ramp";

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
        {problemCatalog.map((problem) => (
          <article className="mystery-card" key={problem.id}>
            {problem.id === "sliding-car" ? (
              <MysteryScene />
            ) : (
              <div className="scene">
                <div className="scene-top">DỐC KHÔNG MA SÁT</div>
                <EnergyRamp height={2} progress={0} currentHeight={2} kinetic={0} potential={40} />
                <div className="scene-footer">Từ độ cao đến vận tốc</div>
              </div>
            )}
            <div className="mystery-card-copy">
              <div className="case-label">{problem.caseLabel}</div>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <ul className="topic-tags">
                {problem.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <div className="mystery-meta">{problem.activitySummary}</div>
              <Link className="primary cta" href={problem.href}>
                Bắt đầu khám phá →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
