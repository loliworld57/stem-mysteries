import assert from "node:assert/strict";
import test from "node:test";
import {
  challengeReducer,
  createChallengeState,
  changedDesignFactors,
} from "../lib/challenge-state.ts";
import {
  challengeStorageKey,
  loadChallenge,
  saveChallenge,
  serializeChallenge,
  restoreChallenge,
} from "../lib/challenge-storage.ts";

const design = { heightCm: 20, angleDeg: 30, surfaceId: "rough" };
const reason = "Số liệu cho thấy xe dừng trong vùng 10–30 cm.";
function run(state) {
  state = challengeReducer(state, { type: "predict" });
  state = challengeReducer(state, { type: "prediction", safe: true, explanation: reason });
  return challengeReducer(state, {
    type: "run",
    id: `trial-${state.attempts.length + 1}`,
    createdAt: "2026-10-05T00:00:00.000Z",
  });
}
function begin() {
  const started = challengeReducer(createChallengeState(), { type: "start" });
  return challengeReducer(started, { type: "change-design", design });
}
function analyze(state) {
  state = challengeReducer(state, { type: "finish" });
  return challengeReducer(state, { type: "analysis", text: reason });
}
function improve(state) {
  state = challengeReducer(state, { type: "improve" });
  return challengeReducer(state, {
    type: "improvement",
    decision: { factor: "repeat", explanation: "Lặp lại để kiểm tra kết quả của mô hình." },
  });
}

test("successful trials continue through analysis and improvement, with no sixth trial", () => {
  let state = begin();
  for (let number = 1; number <= 5; number++) {
    state = analyze(run(state));
    const attempt = state.attempts.at(-1);
    assert.equal(attempt.attemptNumber, number);
    assert.equal(attempt.completed, true);
    assert.equal(attempt.evidence.status, "success");
    assert.strictEqual(challengeReducer(state, { type: "next" }), state);
    if (number < 5) {
      state = improve(state);
      state = challengeReducer(state, { type: "next" });
      assert.equal(state.stage, "design");
    } else {
      assert.strictEqual(challengeReducer(state, { type: "improve" }), state);
      state = challengeReducer(state, { type: "review" });
      assert.equal(state.stage, "review");
      assert.equal(attempt.improvement, undefined);
      assert.strictEqual(challengeReducer(state, { type: "run" }), state);
      assert.strictEqual(challengeReducer(state, { type: "next" }), state);
    }
    assert.equal(restoreChallenge(serializeChallenge(state)).status, "saved");
  }
  assert.equal(state.attempts.length, 5);
});

test("analysis and structured improvement are required, prior snapshots remain immutable", () => {
  let state = challengeReducer(run(begin()), { type: "finish" });
  assert.strictEqual(challengeReducer(state, { type: "improve" }), state);
  state = challengeReducer(state, { type: "analysis", text: "   " });
  assert.strictEqual(challengeReducer(state, { type: "improve" }), state);
  state = challengeReducer(state, { type: "analysis", text: reason });
  state = challengeReducer(state, { type: "improve" });
  assert.strictEqual(challengeReducer(state, { type: "next" }), state);
  state = challengeReducer(state, {
    type: "improvement",
    decision: { factor: "multiple", explanation: " " },
  });
  assert.strictEqual(challengeReducer(state, { type: "next" }), state);
  state = challengeReducer(state, {
    type: "improvement",
    decision: { factor: "multiple", explanation: reason },
  });
  state = challengeReducer(state, { type: "next" });
  const snapshot = structuredClone(state.attempts[0]);
  const previous = state;
  state = challengeReducer(state, {
    type: "change-design",
    design: { ...design, heightCm: 40, angleDeg: 35 },
  });
  assert.equal(changedDesignFactors(snapshot.design, state.design).length, 2);
  assert.equal(changedDesignFactors(snapshot.design, snapshot.design).length, 0);
  state = analyze(run(state));
  assert.deepEqual(state.attempts[0], snapshot);
  assert.strictEqual(state.attempts[0], previous.attempts[0]);
});

test("serialization restores designs, predictions, evidence, analysis and improvement", () => {
  const state = challengeReducer(improve(analyze(run(begin()))), { type: "next" });
  const restored = restoreChallenge(serializeChallenge(state));
  assert.equal(restored.status, "saved");
  assert.deepEqual(restored.state, state);
  restored.state.design.heightCm = 55;
  assert.equal(state.design.heightCm, 20);
  assert.equal(restored.state.attempts[0].design.heightCm, 20);
  for (const candidate of [begin(), run(begin()), improve(analyze(run(begin())))]) {
    assert.equal(restoreChallenge(serializeChallenge(candidate)).status, "saved");
  }
});

test("reload during animation stabilizes the calculated result without duplication", () => {
  const testing = run(begin());
  const restored = restoreChallenge(serializeChallenge(testing)).state;
  assert.equal(restored.stage, "results");
  assert.equal(restored.attempts.length, 1);
  assert.equal(restored.attempts[0].completed, true);
  assert.deepEqual(restored.attempts[0].evidence, testing.attempts[0].evidence);
  assert.strictEqual(challengeReducer(restored, { type: "finish" }), restored);
  assert.strictEqual(challengeReducer(restored, { type: "run" }), restored);
  assert.deepEqual(restoreChallenge(serializeChallenge(restored)).state, restored);
});

test("missing, malformed, incompatible and inconsistent persisted state is handled", () => {
  assert.deepEqual(restoreChallenge(null).state, createChallengeState());
  for (const raw of [
    "{",
    "null",
    "[]",
    JSON.stringify({ version: 99, state: begin() }),
    JSON.stringify({ version: 1, state: {} }),
  ]) {
    assert.equal(restoreChallenge(raw).status, "invalid");
  }
  const valid = analyze(run(begin()));
  for (const mutate of [
    (state) => {
      state.attempts[0].evidence.stoppingDistanceCm = 25;
    },
    (state) => {
      state.attempts[0].attemptNumber = 2;
    },
    (state) => {
      state.design.heightCm = 100;
    },
    (state) => {
      state.stage = "prediction";
    },
    (state) => {
      state.attempts.push(structuredClone(state.attempts[0]));
    },
    (state) => {
      state.stage = "review";
    },
  ]) {
    const invalid = structuredClone(valid);
    mutate(invalid);
    assert.equal(restoreChallenge(serializeChallenge(invalid)).status, "invalid");
  }
});

test("storage access failures leave usable memory state, save and reset are challenge-specific", () => {
  const map = new Map([["investigation-data", "keep"]]);
  const storage = {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, value),
  };
  const state = analyze(run(begin()));
  assert.equal(saveChallenge(storage, state), true);
  assert.deepEqual(loadChallenge(storage).state, state);
  assert.equal(map.has(challengeStorageKey), true);
  const throwing = {
    getItem: () => {
      throw new Error("denied");
    },
    setItem: () => {
      throw new Error("quota");
    },
  };
  assert.equal(loadChallenge(throwing).status, "unavailable");
  assert.equal(saveChallenge(throwing, state), false);
  assert.strictEqual(challengeReducer(run(begin()), { type: "reset" }).stage, "testing");
  const reset = challengeReducer(state, { type: "reset" });
  assert.deepEqual(reset, createChallengeState());
  saveChallenge(storage, reset);
  assert.deepEqual(loadChallenge(storage).state, reset);
  assert.equal(map.get("investigation-data"), "keep");
});
