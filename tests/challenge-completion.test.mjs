import assert from "node:assert/strict";
import test from "node:test";
import {
  createChallengeState,
  challengeReducer,
  isFinalArgumentReady,
} from "../lib/challenge-state.ts";
import { restoreChallenge, serializeChallenge } from "../lib/challenge-storage.ts";

const reason = "Nhóm so sánh số liệu đo với vùng dừng an toàn 10–30 cm.";
function cycle() {
  let state = challengeReducer(createChallengeState(), { type: "start" });
  for (let count = 1; count <= 5; count++) {
    if (count === 3)
      state = challengeReducer(state, {
        type: "change-design",
        design: { heightCm: 20, angleDeg: 30, surfaceId: "rough" },
      });
    state = challengeReducer(state, { type: "predict" });
    state = challengeReducer(state, { type: "prediction", safe: true, explanation: reason });
    state = challengeReducer(state, { type: "run" });
    state = challengeReducer(state, { type: "finish" });
    state = challengeReducer(state, { type: "analysis", text: reason });
    if (count < 5) {
      state = challengeReducer(state, { type: "improve" });
      state = challengeReducer(state, {
        type: "improvement",
        decision: { factor: "multiple", explanation: reason },
      });
      state = challengeReducer(state, { type: "next" });
    }
  }
  return challengeReducer(state, { type: "review" });
}
function argument(state, attemptId = state.attempts[0].id) {
  return {
    attemptId,
    evidenceIds: [state.attempts[0].id, state.attempts[2].id],
    claim: reason,
    evidenceReasoning: reason,
    reasoning: reason,
    comparisonReasoning: reason,
    submitted: false,
  };
}
function submit() {
  const review = cycle();
  const early = { ...review, stage: "results", attempts: review.attempts.slice(0, 4) };
  assert.strictEqual(
    challengeReducer(early, { type: "final-argument", argument: argument(review) }),
    early,
  );
  return challengeReducer(
    challengeReducer(review, { type: "final-argument", argument: argument(review) }),
    { type: "submit-final" },
  );
}
function reflect(state) {
  for (let index = 0; index < 5; index++)
    state = challengeReducer(state, { type: "reflection", index, text: reason });
  return state;
}

test("final selection requires the completed cycle and leaves all trial snapshots unchanged", () => {
  const initial = createChallengeState();
  assert.strictEqual(
    challengeReducer(initial, {
      type: "final-argument",
      argument: { ...initial.finalDesign, attemptId: "unknown" },
    }),
    initial,
  );
  const review = cycle();
  const history = structuredClone(review.attempts);
  for (const attempt of review.attempts) {
    const state = challengeReducer(review, {
      type: "final-argument",
      argument: argument(review, attempt.id),
    });
    assert.equal(state.finalDesign.attemptId, attempt.id);
    assert.strictEqual(state.attempts, review.attempts);
    assert.deepEqual(state.attempts, history);
    assert.equal(challengeReducer(state, { type: "submit-final" }).stage, "reflection");
  }
  assert.notEqual(review.attempts[0].evidence.status, "success");
  assert.equal(submit().finalDesign.attemptId, review.attempts[0].id);
});

test("final argument requires meaningful text, an explicit selection and valid evidence", () => {
  const review = cycle();
  assert.equal(review.finalDesign.attemptId, null);
  assert.strictEqual(challengeReducer(review, { type: "submit-final" }), review);
  for (const field of ["claim", "evidenceReasoning", "reasoning", "comparisonReasoning"]) {
    const invalid = { ...argument(review), [field]: "   " };
    const state = challengeReducer(review, { type: "final-argument", argument: invalid });
    assert.equal(isFinalArgumentReady(state), false);
    assert.strictEqual(challengeReducer(state, { type: "submit-final" }), state);
  }
  for (const patch of [
    { attemptId: "missing" },
    { evidenceIds: ["missing"] },
    { evidenceIds: [review.attempts[0].id, review.attempts[0].id] },
  ]) {
    assert.strictEqual(
      challengeReducer(review, {
        type: "final-argument",
        argument: { ...argument(review), ...patch },
      }),
      review,
    );
  }
  const noEvidence = challengeReducer(review, {
    type: "final-argument",
    argument: { ...argument(review), evidenceIds: [] },
  });
  assert.equal(isFinalArgumentReady(noEvidence), false);
});

test("final argument draft, submitted summary and partial reflection survive restoration", () => {
  const review = cycle();
  const draft = challengeReducer(review, {
    type: "final-argument",
    argument: { ...argument(review), reasoning: "" },
  });
  assert.deepEqual(restoreChallenge(serializeChallenge(draft)).state, draft);
  const submitted = submit();
  assert.equal(submitted.finalDesign.submitted, true);
  assert.deepEqual(restoreChallenge(serializeChallenge(submitted)).state, submitted);
  const partial = challengeReducer(submitted, { type: "reflection", index: 1, text: reason });
  assert.deepEqual(restoreChallenge(serializeChallenge(partial)).state, partial);
  assert.strictEqual(challengeReducer(partial, { type: "complete" }), partial);
  assert.strictEqual(
    challengeReducer(submitted, { type: "final-argument", argument: argument(submitted) }),
    submitted,
  );
});

test("completion requires five reflections, persists, and editing reopens reflection", () => {
  const reflected = reflect(submit());
  const completed = challengeReducer(reflected, { type: "complete" });
  assert.equal(completed.stage, "completed");
  assert.deepEqual(restoreChallenge(serializeChallenge(completed)).state, completed);
  assert.strictEqual(challengeReducer(completed, { type: "run" }), completed);
  const edit = challengeReducer(completed, { type: "reflection", index: 0, text: "" });
  assert.equal(edit.stage, "reflection");
  assert.strictEqual(challengeReducer(edit, { type: "complete" }), edit);
});

test("physical prediction precedes measurement and physical validation never adds trials", () => {
  let state = submit();
  const attempts = state.attempts;
  const beforePrediction = { ...state.physicalValidation, measuredStoppingDistanceCm: 25 };
  assert.strictEqual(
    challengeReducer(state, { type: "physical", validation: beforePrediction }),
    state,
  );
  state = challengeReducer(state, {
    type: "physical",
    validation: { ...state.physicalValidation, prediction: reason },
  });
  state = challengeReducer(state, { type: "submit-physical-prediction" });
  assert.deepEqual(restoreChallenge(serializeChallenge(state)).state, state);
  for (const value of [-1, NaN, Infinity])
    assert.strictEqual(
      challengeReducer(state, {
        type: "physical",
        validation: { ...state.physicalValidation, measuredStoppingDistanceCm: value },
      }),
      state,
    );
  state = challengeReducer(state, {
    type: "physical",
    validation: {
      ...state.physicalValidation,
      measuredStoppingDistanceCm: 0,
      comparison: reason,
      modelLimitationsReasoning: "",
    },
  });
  assert.strictEqual(challengeReducer(state, { type: "submit-physical" }), state);
  state = challengeReducer(state, {
    type: "physical",
    validation: { ...state.physicalValidation, modelLimitationsReasoning: reason },
  });
  state = challengeReducer(state, { type: "submit-physical" });
  assert.equal(state.physicalValidation.submitted, true);
  assert.equal(state.attempts.length, 5);
  assert.strictEqual(state.attempts, attempts);
  assert.deepEqual(restoreChallenge(serializeChallenge(state)).state, state);
});

test("reset clears all final, reflection and physical work without changing the old history", () => {
  let state = reflect(submit());
  state = challengeReducer(state, { type: "complete" });
  state = challengeReducer(state, {
    type: "physical",
    validation: { ...state.physicalValidation, prediction: reason },
  });
  const reset = challengeReducer(state, { type: "reset" });
  assert.deepEqual(reset, createChallengeState());
  assert.equal(state.attempts.length, 5);
  assert.equal(state.finalDesign.submitted, true);
});

test("version 1 migration preserves notebook and draft without inventing a final selection", () => {
  const old = cycle();
  delete old.finalDesign;
  delete old.reflections;
  delete old.physicalValidation;
  const restored = restoreChallenge(JSON.stringify({ version: 1, state: old }));
  assert.equal(restored.status, "saved");
  assert.deepEqual(restored.state.attempts, old.attempts);
  assert.equal(restored.state.stage, "review");
  assert.equal(restored.state.finalDesign.attemptId, null);
  assert.deepEqual(restored.state.reflections, ["", "", "", "", ""]);
});

test("corrupted final evidence, reflection or physical records are safely rejected", () => {
  for (const mutate of [
    (state) => {
      state.finalDesign.evidenceIds = ["missing"];
    },
    (state) => {
      state.finalDesign.claim = " ";
    },
    (state) => {
      state.reflections = [reason];
    },
    (state) => {
      state.stage = "completed";
    },
    (state) => {
      state.physicalValidation.measuredStoppingDistanceCm = -1;
    },
    (state) => {
      state.physicalValidation.submitted = true;
    },
  ]) {
    const state = submit();
    mutate(state);
    assert.equal(restoreChallenge(serializeChallenge(state)).status, "invalid");
  }
});
