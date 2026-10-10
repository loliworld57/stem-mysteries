import { ArrowRight, FlaskConical, PencilRuler } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ChallengeDefinition } from "@/lib/catalog-types";
import { academicLabel } from "@/lib/catalog-metadata";
import { TopicTags } from "./topic-tags";
export function ChallengeCard({
  challenge,
  illustration,
}: {
  challenge: ChallengeDefinition;
  illustration?: ReactNode;
}) {
  return (
    <article
      className={`home-challenge-entry activity-card${illustration ? "" : " challenge-without-illustration"}`}
    >
      {illustration}
      <div className="home-challenge-copy">
        <div className="case-label">
          <PencilRuler size={18} aria-hidden="true" /> THỬ THÁCH STEM{" "}
          {String(challenge.number).padStart(2, "0")}
        </div>
        <div className="academic-meta">{academicLabel(challenge)}</div>
        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>
        <TopicTags ids={challenge.topicIds} />
        <div className="home-challenge-footer">
          <span className="home-challenge-attempts">
            <FlaskConical size={19} aria-hidden="true" />
            {challenge.activitySummary}
          </span>
          <Link className="primary cta" href={challenge.href}>
            Nhận thử thách <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
