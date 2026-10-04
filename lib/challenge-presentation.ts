import type { ChallengeEvidence } from "./challenge-types";

export const experimentPresentation = {
  preparationMs: 650,
  settlingMs: 350,
  minimumTravelMs: 2200,
  maximumTravelMs: 6500,
  timeScale: 1.8,
} as const;

// Uniform time scaling preserves the model's ramp/braking curves and their relative durations.
export function presentationFrame(
  evidence: ChallengeEvidence,
  elapsedMs: number,
  reducedMotion = false,
) {
  const physicalDuration = evidence.rampDuration + evidence.stoppingDuration;
  const travelMs =
    physicalDuration > 0
      ? Math.min(
          experimentPresentation.maximumTravelMs,
          Math.max(
            experimentPresentation.minimumTravelMs,
            physicalDuration * 1000 * experimentPresentation.timeScale,
          ),
        )
      : 0;
  if (reducedMotion) return { physicalTime: physicalDuration, phase: "finished" as const };
  const time = Math.max(0, elapsedMs - experimentPresentation.preparationMs);
  const physicalTime = travelMs > 0 ? Math.min(1, time / travelMs) * physicalDuration : 0;
  const phase =
    elapsedMs < experimentPresentation.preparationMs
      ? "ready"
      : time < travelMs
        ? "moving"
        : time < travelMs + experimentPresentation.settlingMs
          ? "measuring"
          : "finished";
  return { physicalTime, phase };
}
