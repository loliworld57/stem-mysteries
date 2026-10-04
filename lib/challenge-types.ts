export type ChallengeSurfaceId = "smooth" | "medium" | "rough";

export interface ChallengeDesign {
  heightCm: number;
  angleDeg: number;
  surfaceId: ChallengeSurfaceId;
}

export type ChallengeStep =
  "design" | "prediction" | "experiment" | "analysis" | "improvement" | "completion";

export interface ChallengeState {
  stage:
    | "intro"
    | "design"
    | "prediction"
    | "testing"
    | "results"
    | "improvement"
    | "review"
    | "reflection"
    | "completed";
  design: ChallengeDesign;
  prediction: { safe: boolean | null; explanation: string };
  attempts: ChallengeAttempt[];
  analysis: string;
  improvement: ImprovementDecision;
  finalDesign: FinalDesignArgument;
  reflections: string[];
  physicalValidation: PhysicalValidation;
}

export interface FinalDesignArgument {
  attemptId: string | null;
  evidenceIds: string[];
  claim: string;
  evidenceReasoning: string;
  reasoning: string;
  comparisonReasoning: string;
  submitted: boolean;
}
export interface PhysicalValidation {
  prediction: string;
  predictionSubmitted: boolean;
  measuredStoppingDistanceCm: number | null;
  comparison: string;
  modelLimitationsReasoning: string;
  submitted: boolean;
}

export type MotionStatus = "does_not_reach" | "stops_too_early" | "success" | "overshoots";
export interface ChallengeEvidence {
  reachesRampBottom: boolean;
  bottomSpeedKmh: number;
  stoppingDistanceCm: number;
  bottomKineticJ: number;
  initialPotentialJ: number;
  rampDuration: number;
  stoppingDuration: number;
  acceleration: number;
  deceleration: number;
  status: MotionStatus;
}
export interface ChallengeAttempt {
  id: string;
  attemptNumber: number;
  createdAt: string;
  completed: boolean;
  design: ChallengeDesign;
  prediction: { safe: boolean; explanation: string };
  evidence: ChallengeEvidence;
  analysis: string;
  improvement?: ImprovementDecision;
}

export type ImprovementFactor = "height" | "angle" | "surface" | "multiple" | "repeat";
export interface ImprovementDecision {
  factor: ImprovementFactor | null;
  explanation: string;
}
