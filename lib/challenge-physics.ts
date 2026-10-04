import type { ChallengeDesign } from "./challenge-types";
import { challengeConfig, challengeSurfaces } from "./challenge-config.ts";
import {
  GRAVITY,
  ROVER_MASS,
  brakingResult,
  kineticEnergy,
  potentialEnergy,
  msToKmh,
  kmhToMs,
} from "./physics.ts";
import type { ChallengeEvidence, MotionStatus } from "./challenge-types";

export function rampGeometry(design: ChallengeDesign) {
  const angleRadians = (design.angleDeg * Math.PI) / 180;
  return {
    heightCm: design.heightCm,
    lengthCm: design.heightCm / Math.sin(angleRadians),
    horizontalCm: design.heightCm / Math.tan(angleRadians),
  };
}

export function classifyStop(reachesRampBottom: boolean, distanceCm: number): MotionStatus {
  if (!reachesRampBottom) return "does_not_reach";
  if (distanceCm < challengeConfig.safeZoneMinCm - 1e-9) return "stops_too_early";
  if (distanceCm <= challengeConfig.safeZoneMaxCm + 1e-9) return "success";
  return "overshoots";
}

export function challengeEvidence(design: ChallengeDesign): ChallengeEvidence {
  const geometry = rampGeometry(design);
  const angle = (design.angleDeg * Math.PI) / 180;
  const friction = challengeSurfaces[design.surfaceId].friction;
  const acceleration = GRAVITY * (Math.sin(angle) - friction * Math.cos(angle));
  const reachesRampBottom = acceleration > 1e-10;
  const speedMs = reachesRampBottom ? Math.sqrt((2 * acceleration * geometry.lengthCm) / 100) : 0;
  const braking = brakingResult(msToKmh(speedMs), friction);
  return {
    reachesRampBottom,
    bottomSpeedKmh: msToKmh(speedMs),
    stoppingDistanceCm: braking.distance * 100,
    bottomKineticJ: kineticEnergy(ROVER_MASS, speedMs),
    initialPotentialJ: potentialEnergy(ROVER_MASS, design.heightCm / 100),
    rampDuration: reachesRampBottom ? speedMs / acceleration : 0,
    stoppingDuration: braking.duration,
    acceleration,
    deceleration: braking.deceleration,
    status: classifyStop(reachesRampBottom, braking.distance * 100),
  };
}

export function challengeMotion(
  design: ChallengeDesign,
  evidence: ChallengeEvidence,
  elapsed: number,
) {
  const geometry = rampGeometry(design);
  if (!evidence.reachesRampBottom)
    return { horizontalCm: 0, heightCm: design.heightCm, angleDeg: design.angleDeg };
  const time = Math.max(0, elapsed);
  if (time < evidence.rampDuration) {
    const fraction = Math.min(
      1,
      (0.5 * evidence.acceleration * time ** 2) / (geometry.lengthCm / 100),
    );
    return {
      horizontalCm: geometry.horizontalCm * fraction,
      heightCm: design.heightCm * (1 - fraction),
      angleDeg: design.angleDeg,
    };
  }
  const stoppingTime = Math.min(time - evidence.rampDuration, evidence.stoppingDuration);
  const distanceCm =
    100 *
    (kmhToMs(evidence.bottomSpeedKmh) * stoppingTime -
      0.5 * evidence.deceleration * stoppingTime ** 2);
  return { horizontalCm: geometry.horizontalCm + distanceCm, heightCm: 0, angleDeg: 0 };
}
