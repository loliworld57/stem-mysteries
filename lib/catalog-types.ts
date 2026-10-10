export type ProblemId = "sliding-car" | "ramp-energy";
export type ChallengeId = "safe-ramp";

interface CatalogMetadata {
  title: string;
  description: string;
}

export interface AcademicMetadata {
  subjectIds: readonly string[];
  gradeIds: readonly string[];
  topicIds: readonly string[];
  featured?: boolean;
  featuredOrder?: number;
}

export interface ProblemDefinition extends AcademicMetadata {
  id: ProblemId;
  title: string;
  description: string;
  href: `/kham-pha/${string}`;
  caseLabel: string;
  activitySummary: string;
  metadata: CatalogMetadata;
}

export interface ChallengeDefinition extends AcademicMetadata {
  id: string;
  number: number;
  title: string;
  description: string;
  href: `/thu-thach/${string}`;
  activitySummary: string;
  caseLabel: string;
  relatedProblemIds: readonly ProblemId[];
  metadata: CatalogMetadata;
}
