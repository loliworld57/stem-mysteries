export type ProblemId = "sliding-car" | "ramp-energy";
export type ChallengeId = "safe-ramp";

interface CatalogMetadata {
  title: string;
  description: string;
}

export interface ProblemDefinition {
  id: ProblemId;
  title: string;
  description: string;
  href: `/kham-pha/${string}`;
  topics: readonly string[];
  caseLabel: string;
  activitySummary: string;
  metadata: CatalogMetadata;
}

export interface ChallengeDefinition {
  id: ChallengeId;
  number: number;
  title: string;
  description: string;
  href: `/thu-thach/${string}`;
  topics: readonly string[];
  caseLabel: string;
  relatedProblemIds: readonly ProblemId[];
  metadata: CatalogMetadata;
}
