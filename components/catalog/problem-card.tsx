import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProblemDefinition } from "@/lib/catalog-types";
import { academicLabel } from "@/lib/catalog-metadata";
import { TopicTags } from "./topic-tags";
import { MysteryScene } from "@/components/mystery/mystery-scene";
import { EnergyRamp } from "@/components/energy/energy-ramp";

export function ProblemCard({ problem }: { problem: ProblemDefinition }) {
  return (
    <article className="mystery-card activity-card">
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
        <div className="academic-meta">{academicLabel(problem)}</div>
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
        <TopicTags ids={problem.topicIds} />
        <div className="mystery-meta">{problem.activitySummary}</div>
        <Link className="primary cta" href={problem.href}>
          Bắt đầu khám phá <ArrowRight className="inline-icon" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
