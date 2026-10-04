import type { ChallengeEvidence, ChallengeStep } from "./challenge-types";
import { challengeSteps } from "./challenge-config.ts";

export const stoppingChartMaxCm = 60;

export function stoppingDistanceMarker(evidence: ChallengeEvidence) {
  if (!evidence.reachesRampBottom) return { positionPercent: null, overflow: false };
  return {
    positionPercent:
      (Math.min(stoppingChartMaxCm, Math.max(0, evidence.stoppingDistanceCm)) /
        stoppingChartMaxCm) *
      100,
    overflow: evidence.stoppingDistanceCm > stoppingChartMaxCm,
  };
}

export function progressStepStatus(step: ChallengeStep, active?: ChallengeStep, completed = false) {
  if (completed) return "done";
  if (step === active) return "current";
  const activeIndex = challengeSteps.findIndex((item) => item.id === active);
  return challengeSteps.findIndex((item) => item.id === step) < activeIndex ? "done" : "upcoming";
}
