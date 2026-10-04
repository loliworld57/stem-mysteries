import { createBrowserStateStorage } from "./browser-state-storage.ts";
import type { BrowserStorageAccess, StorageStatus } from "./browser-state-storage";
export type { StorageStatus } from "./browser-state-storage";
import { challengeConfig, improvementFactors } from "./challenge-config.ts";
import {
  createChallengeState,
  isValidDesign,
  hasMeaningfulReason,
  changedDesignFactors,
  isFinalArgumentReady,
  isPhysicalReady,
} from "./challenge-state.ts";
import { challengeEvidence } from "./challenge-physics.ts";
import type { ChallengeState, ChallengeDesign } from "./challenge-types";

export const storageVersion = 2;
// Keep the challenge-specific key so version 1 notebooks can be migrated in place.
export const challengeStorageKey = "stem-mysteries:safe-ramp:v1";

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const isText = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 2000;
function validDesign(value: unknown): value is ChallengeDesign {
  return isObject(value) && isValidDesign(value as unknown as ChallengeDesign);
}
function validPrediction(value: unknown, completed = false) {
  return (
    isObject(value) &&
    (typeof value.safe === "boolean" || (!completed && value.safe === null)) &&
    isText(value.explanation) &&
    (!completed || value.explanation.trim().length > 0)
  );
}
function validImprovement(value: unknown, committed = false) {
  return (
    isObject(value) &&
    (value.factor === null
      ? !committed
      : typeof value.factor === "string" && Object.hasOwn(improvementFactors, value.factor)) &&
    isText(value.explanation) &&
    (!committed || hasMeaningfulReason(value.explanation))
  );
}

export function serializeChallenge(state: ChallengeState) {
  return JSON.stringify({ version: storageVersion, state });
}

export function restoreChallenge(raw: string | null): {
  state: ChallengeState;
  status: StorageStatus;
} {
  if (raw === null) return { state: createChallengeState(), status: "saved" };
  try {
    const payload: unknown = JSON.parse(raw);
    if (
      !isObject(payload) ||
      typeof payload.version !== "number" ||
      ![1, storageVersion].includes(payload.version) ||
      !isObject(payload.state)
    )
      throw new Error("Invalid envelope");
    const state = payload.state;
    if (payload.version === 1) {
      if (
        !["intro", "design", "prediction", "testing", "results", "improvement", "review"].includes(
          String(state.stage),
        )
      )
        throw new Error("Invalid legacy stage");
      const defaults = createChallengeState();
      state.finalDesign = defaults.finalDesign;
      state.reflections = defaults.reflections;
      state.physicalValidation = defaults.physicalValidation;
    }
    if (
      !validDesign(state.design) ||
      !validPrediction(state.prediction) ||
      !isText(state.analysis) ||
      !validImprovement(state.improvement) ||
      !Array.isArray(state.attempts) ||
      state.attempts.length > challengeConfig.maxAttempts ||
      ![
        "intro",
        "design",
        "prediction",
        "testing",
        "results",
        "improvement",
        "review",
        "reflection",
        "completed",
      ].includes(String(state.stage))
    )
      throw new Error("Invalid state");
    const ids = new Set<string>();
    for (const [index, attempt] of state.attempts.entries()) {
      if (
        !isObject(attempt) ||
        typeof attempt.id !== "string" ||
        !attempt.id ||
        ids.has(attempt.id) ||
        attempt.attemptNumber !== index + 1 ||
        typeof attempt.createdAt !== "string" ||
        !Number.isFinite(Date.parse(attempt.createdAt)) ||
        typeof attempt.completed !== "boolean" ||
        !validDesign(attempt.design) ||
        !validPrediction(attempt.prediction, true) ||
        !isText(attempt.analysis) ||
        !isObject(attempt.evidence) ||
        (attempt.improvement !== undefined && !validImprovement(attempt.improvement, true))
      )
        throw new Error("Invalid attempt");
      ids.add(attempt.id);
      const expected = challengeEvidence(attempt.design);
      for (const key of Object.keys(expected) as (keyof typeof expected)[]) {
        const actual = attempt.evidence[key];
        const expectedValue = expected[key];
        if (
          typeof expectedValue === "number"
            ? typeof actual !== "number" ||
              !Number.isFinite(actual) ||
              Math.abs(actual - expectedValue) > 1e-8
            : actual !== expectedValue
        )
          throw new Error("Invalid evidence");
      }
      if (
        index < state.attempts.length - 1 &&
        (!attempt.completed ||
          !hasMeaningfulReason(attempt.analysis) ||
          !validImprovement(attempt.improvement, true))
      )
        throw new Error("Incomplete history");
    }
    const last = state.attempts.at(-1);
    const postExperiment = ["testing", "results", "improvement", "review"].includes(
      String(state.stage),
    );
    if (
      postExperiment &&
      (!last ||
        !isObject(last) ||
        !validDesign(last.design) ||
        changedDesignFactors(last.design, state.design).length !== 0 ||
        state.analysis !== last.analysis)
    )
      throw new Error("Missing current attempt");
    if (state.stage === "intro" && state.attempts.length !== 0)
      throw new Error("Invalid introduction");
    if (
      ["design", "prediction"].includes(String(state.stage)) &&
      (state.attempts.length >= challengeConfig.maxAttempts ||
        (last && (!isObject(last) || !last.completed || !validImprovement(last.improvement, true))))
    )
      throw new Error("Invalid design cycle");
    if (
      state.stage === "improvement" &&
      (state.attempts.length >= challengeConfig.maxAttempts || !hasMeaningfulReason(state.analysis))
    )
      throw new Error("Invalid improvement stage");
    if (
      state.stage === "review" &&
      (state.attempts.length !== challengeConfig.maxAttempts ||
        !hasMeaningfulReason(state.analysis))
    )
      throw new Error("Invalid review stage");
    if (state.stage !== "testing" && state.attempts.some((attempt) => !attempt.completed))
      throw new Error("Unfinished experiment");
    if (
      !isObject(state.finalDesign) ||
      !isObject(state.physicalValidation) ||
      !Array.isArray(state.reflections) ||
      state.reflections.length !== 5 ||
      !state.reflections.every(isText)
    )
      throw new Error("Invalid completion data");
    const argument = state.finalDesign;
    if (
      (argument.attemptId !== null &&
        (typeof argument.attemptId !== "string" || !ids.has(argument.attemptId))) ||
      !Array.isArray(argument.evidenceIds) ||
      !argument.evidenceIds.every((id) => typeof id === "string" && ids.has(id)) ||
      new Set(argument.evidenceIds).size !== argument.evidenceIds.length ||
      ![
        argument.claim,
        argument.evidenceReasoning,
        argument.reasoning,
        argument.comparisonReasoning,
      ].every(isText) ||
      typeof argument.submitted !== "boolean"
    )
      throw new Error("Invalid argument");
    const physical = state.physicalValidation;
    if (
      ![physical.prediction, physical.comparison, physical.modelLimitationsReasoning].every(
        isText,
      ) ||
      typeof physical.predictionSubmitted !== "boolean" ||
      typeof physical.submitted !== "boolean" ||
      (physical.measuredStoppingDistanceCm !== null &&
        (typeof physical.measuredStoppingDistanceCm !== "number" ||
          !Number.isFinite(physical.measuredStoppingDistanceCm) ||
          physical.measuredStoppingDistanceCm < 0)) ||
      (!physical.predictionSubmitted && physical.measuredStoppingDistanceCm !== null) ||
      (physical.predictionSubmitted && !hasMeaningfulReason(String(physical.prediction)))
    )
      throw new Error("Invalid physical validation");
    const restored = state as unknown as ChallengeState;
    const finalStage = ["review", "reflection", "completed"].includes(restored.stage);
    if (
      finalStage &&
      (restored.attempts.length !== challengeConfig.maxAttempts ||
        !hasMeaningfulReason(restored.attempts.at(-1)!.analysis))
    )
      throw new Error("Incomplete cycle");
    if (
      ["reflection", "completed"].includes(restored.stage)
        ? !argument.submitted || !isFinalArgumentReady(restored)
        : argument.submitted
    )
      throw new Error("Invalid submission stage");
    if (
      !finalStage &&
      (argument.attemptId !== null ||
        argument.evidenceIds.length > 0 ||
        [
          argument.claim,
          argument.evidenceReasoning,
          argument.reasoning,
          argument.comparisonReasoning,
        ].some((value) => value !== ""))
    )
      throw new Error("Premature argument");
    if (restored.stage === "completed" && !restored.reflections.every(hasMeaningfulReason))
      throw new Error("Incomplete reflection");
    if (physical.submitted && !isPhysicalReady(restored.physicalValidation))
      throw new Error("Incomplete physical comparison");
    if (
      !["reflection", "completed"].includes(restored.stage) &&
      (restored.reflections.some((value) => value !== "") ||
        physical.prediction !== "" ||
        physical.comparison !== "" ||
        physical.modelLimitationsReasoning !== "" ||
        physical.predictionSubmitted ||
        physical.submitted ||
        physical.measuredStoppingDistanceCm !== null)
    )
      throw new Error("Premature reflection");
    // The calculated record is authoritative; interrupted animation never consumes another attempt.
    if (restored.stage === "testing") {
      restored.stage = "results";
      restored.attempts = restored.attempts.map((attempt) => ({ ...attempt, completed: true }));
    }
    return { state: restored, status: "saved" };
  } catch {
    return { state: createChallengeState(), status: "invalid" };
  }
}

export function createSafeRampStorage(getStorage?: () => BrowserStorageAccess) {
  return createBrowserStateStorage({
    key: challengeStorageKey,
    createInitialState: createChallengeState,
    decode: restoreChallenge,
    encode: serializeChallenge,
    getStorage,
  });
}

export function loadChallenge(storage: BrowserStorageAccess) {
  return createSafeRampStorage(() => storage).load();
}
export function saveChallenge(storage: BrowserStorageAccess, state: ChallengeState): boolean {
  return createSafeRampStorage(() => storage).save(state);
}
