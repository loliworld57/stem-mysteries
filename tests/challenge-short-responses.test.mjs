import test from "node:test";
import assert from "node:assert/strict";
import {
  challengeReducer,
  createChallengeState,
  hasMeaningfulReason,
} from "../lib/challenge-state.ts";
import { restoreChallenge, serializeChallenge } from "../lib/challenge-storage.ts";

test("short phrases and numeric notes are accepted; only blank input is rejected", () => {
  for (const text of ["ok", "Ổn", "24", "  24 cm  ", "...", "!?"])
    assert.ok(hasMeaningfulReason(text));
  for (const text of ["", "   ", "\n\t"]) assert.equal(hasMeaningfulReason(text), false);
});

test("short responses advance the full cycle and survive completion and physical-validation reload", () => {
  let state = challengeReducer(createChallengeState(), { type: "start" });
  for (let count = 1; count <= 5; count++) {
    state = challengeReducer(state, { type: "predict" });
    state = challengeReducer(state, { type: "prediction", safe: true, explanation: "Ổn" });
    state = challengeReducer(state, { type: "run" });
    state = challengeReducer(state, { type: "finish" });
    state = challengeReducer(state, { type: "analysis", text: "24 cm" });
    if (count < 5) {
      state = challengeReducer(state, { type: "improve" });
      state = challengeReducer(state, {
        type: "improvement",
        decision: { factor: "repeat", explanation: "Thử lại" },
      });
      state = challengeReducer(state, { type: "next" });
    }
    assert.equal(restoreChallenge(serializeChallenge(state)).status, "saved");
  }
  state = challengeReducer(state, { type: "review" });
  state = challengeReducer(state, {
    type: "final-argument",
    argument: {
      ...state.finalDesign,
      attemptId: state.attempts[0].id,
      evidenceIds: [state.attempts[0].id],
      claim: "Ổn",
      evidenceReasoning: "24 cm",
      reasoning: "Trong vùng",
      comparisonReasoning: "Giống nhau",
    },
  });
  state = challengeReducer(state, { type: "submit-final" });
  assert.equal(state.stage, "reflection");
  for (let index = 0; index < 5; index++)
    state = challengeReducer(state, { type: "reflection", index, text: "Chưa chắc" });
  state = challengeReducer(state, { type: "complete" });
  assert.equal(state.stage, "completed");
  state = challengeReducer(state, {
    type: "physical",
    validation: { ...state.physicalValidation, prediction: "Khác" },
  });
  state = challengeReducer(state, { type: "submit-physical-prediction" });
  state = challengeReducer(state, {
    type: "physical",
    validation: {
      ...state.physicalValidation,
      measuredStoppingDistanceCm: 24,
      comparison: "Khác",
      modelLimitationsReasoning: "Chưa chắc",
    },
  });
  state = challengeReducer(state, { type: "submit-physical" });
  assert.equal(state.physicalValidation.submitted, true);
  assert.equal(state.attempts.length, 5);
  const restored = restoreChallenge(serializeChallenge(state));
  assert.equal(restored.status, "saved");
  assert.deepEqual(restored.state, state);
});
