import {
  challengeConfig,
  challengeSurfaces,
  defaultChallengeDesign,
  improvementFactors,
  reflectionQuestions,
} from "./challenge-config.ts";
import type {
  ChallengeDesign,
  ChallengeState,
  ImprovementDecision,
  FinalDesignArgument,
  PhysicalValidation,
} from "./challenge-types";
import { challengeEvidence } from "./challenge-physics.ts";

export type ChallengeAction =
  | { type: "start" }
  | { type: "change-design"; design: ChallengeDesign }
  | { type: "predict" }
  | { type: "edit" }
  | { type: "prediction"; safe: boolean | null; explanation: string }
  | { type: "run"; id?: string; createdAt?: string }
  | { type: "finish" }
  | { type: "analysis"; text: string }
  | { type: "next" }
  | { type: "improve" }
  | { type: "improvement"; decision: ImprovementDecision }
  | { type: "review" }
  | { type: "reset" }
  | { type: "restore"; state: ChallengeState }
  | { type: "final-argument"; argument: FinalDesignArgument }
  | { type: "submit-final" }
  | { type: "reflection"; index: number; text: string }
  | { type: "complete" }
  | { type: "physical"; validation: PhysicalValidation }
  | { type: "submit-physical-prediction" }
  | { type: "submit-physical" };

export function createChallengeState(): ChallengeState {
  return {
    stage: "intro",
    design: { ...defaultChallengeDesign },
    prediction: { safe: null, explanation: "" },
    attempts: [],
    analysis: "",
    improvement: { factor: null, explanation: "" },
    finalDesign: {
      attemptId: null,
      evidenceIds: [],
      claim: "",
      evidenceReasoning: "",
      reasoning: "",
      comparisonReasoning: "",
      submitted: false,
    },
    reflections: reflectionQuestions.map(() => ""),
    physicalValidation: {
      prediction: "",
      predictionSubmitted: false,
      measuredStoppingDistanceCm: null,
      comparison: "",
      modelLimitationsReasoning: "",
      submitted: false,
    },
  };
}

export function isValidDesign(design: ChallengeDesign) {
  return (
    Number.isInteger(design.heightCm) &&
    design.heightCm >= challengeConfig.height.min &&
    design.heightCm <= challengeConfig.height.max &&
    Number.isInteger(design.angleDeg) &&
    design.angleDeg >= challengeConfig.angle.min &&
    design.angleDeg <= challengeConfig.angle.max &&
    Object.hasOwn(challengeSurfaces, design.surfaceId)
  );
}

export function hasMeaningfulReason(text: string) {
  return /[\p{L}\p{N}]/u.test(text.trim());
}

export function changedDesignFactors(previous: ChallengeDesign, current: ChallengeDesign) {
  return (["heightCm", "angleDeg", "surfaceId"] as const).filter(
    (key) => previous[key] !== current[key],
  );
}

export function isFinalArgumentReady(state: ChallengeState) {
  const argument = state.finalDesign;
  const completed = state.attempts.filter((attempt) => attempt.completed);
  return (
    state.attempts.length === challengeConfig.maxAttempts &&
    completed.length === challengeConfig.maxAttempts &&
    completed.some((attempt) => attempt.id === argument.attemptId) &&
    argument.evidenceIds.length > 0 &&
    new Set(argument.evidenceIds).size === argument.evidenceIds.length &&
    argument.evidenceIds.every((id) => completed.some((attempt) => attempt.id === id)) &&
    [
      argument.claim,
      argument.evidenceReasoning,
      argument.reasoning,
      argument.comparisonReasoning,
    ].every(hasMeaningfulReason)
  );
}

export function isPhysicalReady(validation: PhysicalValidation) {
  return (
    validation.predictionSubmitted &&
    hasMeaningfulReason(validation.prediction) &&
    validation.measuredStoppingDistanceCm !== null &&
    Number.isFinite(validation.measuredStoppingDistanceCm) &&
    validation.measuredStoppingDistanceCm >= 0 &&
    hasMeaningfulReason(validation.comparison) &&
    hasMeaningfulReason(validation.modelLimitationsReasoning)
  );
}

export function challengeReducer(state: ChallengeState, action: ChallengeAction): ChallengeState {
  switch (action.type) {
    case "start":
      return state.stage === "intro" ? { ...state, stage: "design" } : state;
    case "change-design":
      return state.stage === "design" && isValidDesign(action.design)
        ? { ...state, design: { ...action.design }, prediction: { safe: null, explanation: "" } }
        : state;
    case "predict":
      return state.stage === "design" ? { ...state, stage: "prediction" } : state;
    case "edit":
      return state.stage === "prediction" ? { ...state, stage: "design" } : state;
    case "prediction":
      return state.stage === "prediction"
        ? { ...state, prediction: { safe: action.safe, explanation: action.explanation } }
        : state;
    case "run":
      if (
        state.stage !== "prediction" ||
        state.prediction.safe === null ||
        !state.prediction.explanation.trim() ||
        state.attempts.length >= challengeConfig.maxAttempts
      )
        return state;
      return {
        ...state,
        stage: "testing",
        analysis: "",
        attempts: [
          ...state.attempts,
          {
            id: action.id ?? `attempt-${state.attempts.length + 1}`,
            attemptNumber: state.attempts.length + 1,
            createdAt: action.createdAt ?? "1970-01-01T00:00:00.000Z",
            completed: false,
            design: { ...state.design },
            prediction: {
              safe: state.prediction.safe,
              explanation: state.prediction.explanation.trim(),
            },
            evidence: challengeEvidence(state.design),
            analysis: "",
          },
        ],
      };
    case "finish":
      return state.stage === "testing"
        ? {
            ...state,
            stage: "results",
            attempts: state.attempts.map((attempt, index) =>
              index === state.attempts.length - 1 ? { ...attempt, completed: true } : attempt,
            ),
          }
        : state;
    case "analysis":
      return state.stage === "results"
        ? {
            ...state,
            analysis: action.text,
            attempts: state.attempts.map((attempt, index) =>
              index === state.attempts.length - 1 ? { ...attempt, analysis: action.text } : attempt,
            ),
          }
        : state;
    case "next":
      return state.stage === "improvement" &&
        hasMeaningfulReason(state.analysis) &&
        state.improvement.factor !== null &&
        hasMeaningfulReason(state.improvement.explanation) &&
        state.attempts.length < challengeConfig.maxAttempts
        ? {
            ...state,
            stage: "design",
            prediction: { safe: null, explanation: "" },
            analysis: "",
            improvement: { factor: null, explanation: "" },
            attempts: state.attempts.map((attempt, index) =>
              index === state.attempts.length - 1
                ? {
                    ...attempt,
                    improvement: {
                      ...state.improvement,
                      explanation: state.improvement.explanation.trim(),
                    },
                  }
                : attempt,
            ),
          }
        : state;
    case "improve":
      return state.stage === "results" &&
        hasMeaningfulReason(state.analysis) &&
        state.attempts.length < challengeConfig.maxAttempts
        ? { ...state, stage: "improvement" }
        : state;
    case "improvement":
      return state.stage === "improvement" &&
        (action.decision.factor === null ||
          Object.hasOwn(improvementFactors, action.decision.factor))
        ? { ...state, improvement: { ...action.decision } }
        : state;
    case "review":
      return state.stage === "results" &&
        state.attempts.length === challengeConfig.maxAttempts &&
        hasMeaningfulReason(state.analysis)
        ? { ...state, stage: "review" }
        : state;
    case "reset":
      return state.stage !== "testing" ? createChallengeState() : state;
    case "restore":
      return action.state;
    case "final-argument":
      if (
        state.stage !== "review" ||
        state.finalDesign.submitted ||
        state.attempts.length !== challengeConfig.maxAttempts ||
        state.attempts.some((attempt) => !attempt.completed)
      )
        return state;
      if (
        (action.argument.attemptId !== null &&
          !state.attempts.some((attempt) => attempt.id === action.argument.attemptId)) ||
        action.argument.evidenceIds.some(
          (id) => !state.attempts.some((attempt) => attempt.id === id),
        ) ||
        new Set(action.argument.evidenceIds).size !== action.argument.evidenceIds.length
      )
        return state;
      return {
        ...state,
        finalDesign: {
          ...action.argument,
          evidenceIds: [...action.argument.evidenceIds],
          submitted: false,
        },
      };
    case "submit-final":
      return state.stage === "review" && isFinalArgumentReady(state)
        ? { ...state, stage: "reflection", finalDesign: { ...state.finalDesign, submitted: true } }
        : state;
    case "reflection":
      return ["reflection", "completed"].includes(state.stage) &&
        Number.isInteger(action.index) &&
        action.index >= 0 &&
        action.index < reflectionQuestions.length
        ? {
            ...state,
            stage: "reflection",
            reflections: state.reflections.map((text, index) =>
              index === action.index ? action.text : text,
            ),
          }
        : state;
    case "complete":
      return state.stage === "reflection" &&
        state.finalDesign.submitted &&
        state.reflections.every(hasMeaningfulReason)
        ? { ...state, stage: "completed" }
        : state;
    case "physical":
      if (!["reflection", "completed"].includes(state.stage) || state.physicalValidation.submitted)
        return state;
      if (
        state.physicalValidation.predictionSubmitted &&
        action.validation.prediction !== state.physicalValidation.prediction
      )
        return state;
      if (
        action.validation.measuredStoppingDistanceCm !== null &&
        (!state.physicalValidation.predictionSubmitted ||
          !Number.isFinite(action.validation.measuredStoppingDistanceCm) ||
          action.validation.measuredStoppingDistanceCm < 0)
      )
        return state;
      return {
        ...state,
        physicalValidation: {
          ...action.validation,
          predictionSubmitted: state.physicalValidation.predictionSubmitted,
          submitted: false,
        },
      };
    case "submit-physical-prediction":
      return ["reflection", "completed"].includes(state.stage) &&
        !state.physicalValidation.predictionSubmitted &&
        hasMeaningfulReason(state.physicalValidation.prediction)
        ? {
            ...state,
            physicalValidation: { ...state.physicalValidation, predictionSubmitted: true },
          }
        : state;
    case "submit-physical":
      return ["reflection", "completed"].includes(state.stage) &&
        isPhysicalReady(state.physicalValidation)
        ? { ...state, physicalValidation: { ...state.physicalValidation, submitted: true } }
        : state;
  }
}
