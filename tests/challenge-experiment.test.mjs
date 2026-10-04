import assert from "node:assert/strict";
import test from "node:test";
import {
  challengeEvidence,
  challengeMotion,
  classifyStop,
  rampGeometry,
} from "../lib/challenge-physics.ts";
import { challengeReducer, createChallengeState } from "../lib/challenge-state.ts";

const successful = { heightCm: 20, angleDeg: 30, surfaceId: "rough" };

test("friction-aware model produces multiple successful designs and all unsuccessful outcomes", () => {
  for (const design of [
    successful,
    { heightCm: 30, angleDeg: 25, surfaceId: "rough" },
    { heightCm: 20, angleDeg: 15, surfaceId: "medium" },
  ]) {
    assert.equal(challengeEvidence(design).status, "success");
  }
  const result = challengeEvidence(successful);
  assert.ok(Math.abs(result.bottomSpeedKmh - 4.518148973580916) < 1e-9);
  assert.ok(Math.abs(result.stoppingDistanceCm - 22.501840991479597) < 1e-9);
  assert.equal(
    challengeEvidence({ heightCm: 20, angleDeg: 10, surfaceId: "rough" }).status,
    "does_not_reach",
  );
  assert.equal(
    challengeEvidence({ heightCm: 20, angleDeg: 20, surfaceId: "rough" }).status,
    "stops_too_early",
  );
  assert.equal(
    challengeEvidence({ heightCm: 60, angleDeg: 40, surfaceId: "smooth" }).status,
    "overshoots",
  );
});

test("safe-zone boundaries are inclusive and speed is not a separate criterion", () => {
  assert.equal(classifyStop(true, 10), "success");
  assert.equal(classifyStop(true, 30), "success");
  assert.equal(classifyStop(true, 9.99), "stops_too_early");
  assert.equal(classifyStop(true, 30.01), "overshoots");
  assert.equal(classifyStop(false, 10), "does_not_reach");
  const result = challengeEvidence({ heightCm: 37, angleDeg: 26, surfaceId: "rough" });
  assert.ok(result.bottomSpeedKmh > 5);
  assert.equal(result.status, "success");
});

test("motion is continuous at ramp bottom and ends at measured stopping position", () => {
  const result = challengeEvidence(successful);
  const geometry = rampGeometry(successful);
  const start = challengeMotion(successful, result, 0);
  assert.equal(start.heightCm, successful.heightCm);
  assert.equal(start.horizontalCm, 0);
  const bottom = challengeMotion(successful, result, result.rampDuration);
  assert.ok(Math.abs(bottom.horizontalCm - geometry.horizontalCm) < 1e-9);
  assert.equal(bottom.heightCm, 0);
  const final = challengeMotion(
    successful,
    result,
    result.rampDuration + result.stoppingDuration + 100,
  );
  assert.ok(
    Math.abs(final.horizontalCm - geometry.horizontalCm - result.stoppingDistanceCm) < 1e-9,
  );
  assert.ok(result.bottomKineticJ < result.initialPotentialJ);
  for (const heightCm of [20, 60])
    for (const angleDeg of [10, 40])
      for (const surfaceId of ["smooth", "medium", "rough"]) {
        const evidence = challengeEvidence({ heightCm, angleDeg, surfaceId });
        assert.ok(
          Object.values(evidence)
            .filter((v) => typeof v === "number")
            .every(Number.isFinite),
        );
        assert.ok(evidence.bottomKineticJ >= 0);
        assert.ok(evidence.bottomKineticJ <= evidence.initialPotentialJ);
      }
});

function prepare(state) {
  state = challengeReducer(state, { type: "predict" });
  return challengeReducer(state, {
    type: "prediction",
    safe: false,
    explanation: "Dựa vào độ cao và bề mặt.",
  });
}

test("prediction gating, immutable snapshots, duplicate starts and five-attempt limit", () => {
  let state = challengeReducer(createChallengeState(), { type: "start" });
  assert.strictEqual(challengeReducer(state, { type: "run" }), state);
  state = challengeReducer(state, { type: "predict" });
  state = challengeReducer(state, { type: "prediction", safe: true, explanation: "   " });
  assert.strictEqual(challengeReducer(state, { type: "run" }), state);
  state = challengeReducer(state, { type: "edit" });
  for (let count = 1; count <= 5; count++) {
    state = prepare(state);
    state = challengeReducer(state, { type: "run" });
    assert.equal(state.stage, "testing");
    assert.equal(state.attempts.length, count);
    assert.strictEqual(challengeReducer(state, { type: "run" }), state);
    assert.strictEqual(
      challengeReducer(state, { type: "change-design", design: successful }),
      state,
    );
    state = challengeReducer(state, { type: "finish" });
    assert.strictEqual(challengeReducer(state, { type: "next" }), state);
    state = challengeReducer(state, {
      type: "analysis",
      text: "So sánh số liệu với vùng 10–30 cm.",
    });
    if (count < 5) {
      state = challengeReducer(state, { type: "improve" });
      state = challengeReducer(state, {
        type: "improvement",
        decision: { factor: "repeat", explanation: "Giữ nguyên để kiểm chứng số liệu." },
      });
    }
    const next = challengeReducer(state, { type: "next" });
    if (count < 5) {
      assert.equal(next.stage, "design");
      assert.equal(next.prediction.safe, null);
      state = next;
    } else assert.strictEqual(next, state);
  }
  assert.equal(state.attempts.length, 5);
  assert.equal(state.attempts[0].prediction.explanation, "Dựa vào độ cao và bề mặt.");
});

test("editing design invalidates prediction without mutating other challenge sessions", () => {
  let state = prepare(challengeReducer(createChallengeState(), { type: "start" }));
  state = challengeReducer(state, { type: "edit" });
  state = challengeReducer(state, { type: "change-design", design: successful });
  assert.equal(state.prediction.safe, null);
  assert.equal(state.prediction.explanation, "");
  assert.deepEqual(createChallengeState().attempts, []);
});
