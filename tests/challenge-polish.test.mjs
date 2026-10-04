import assert from "node:assert/strict";
import test from "node:test";
import { stoppingDistanceMarker, progressStepStatus } from "../lib/challenge-visualization.ts";
import {
  challengeEvidence,
  challengeMotion,
  rampGeometry,
  classifyStop,
} from "../lib/challenge-physics.ts";
import { formatNumber } from "../lib/format.ts";
import { createChallengeState, challengeReducer } from "../lib/challenge-state.ts";
import { restoreChallenge, serializeChallenge } from "../lib/challenge-storage.ts";

test("common distance scale keeps safety boundaries distinct and explicitly caps overflow", () => {
  const evidence = challengeEvidence({ heightCm: 20, angleDeg: 30, surfaceId: "rough" });
  for (const distance of [0, 10, 20, 30, 60]) {
    const marker = stoppingDistanceMarker({ ...evidence, stoppingDistanceCm: distance });
    assert.ok(Math.abs(marker.positionPercent - (distance / 60) * 100) < 1e-10);
    assert.equal(marker.overflow, false);
  }
  const distant = { ...evidence, stoppingDistanceCm: 528.4947844443474 };
  assert.deepEqual(stoppingDistanceMarker(distant), { positionPercent: 100, overflow: true });
  assert.equal(distant.stoppingDistanceCm, 528.4947844443474);
  assert.deepEqual(stoppingDistanceMarker({ ...evidence, reachesRampBottom: false }), {
    positionPercent: null,
    overflow: false,
  });
});

test("all 3813 allowed designs have finite evidence and physically consistent motion", () => {
  let successful = 0;
  let longest = 0;
  let shortest = Infinity;
  for (let heightCm = 20; heightCm <= 60; heightCm++)
    for (let angleDeg = 10; angleDeg <= 40; angleDeg++)
      for (const surfaceId of ["smooth", "medium", "rough"]) {
        const design = { heightCm, angleDeg, surfaceId };
        const evidence = challengeEvidence(design);
        assert.ok(
          Object.values(evidence)
            .filter((value) => typeof value === "number")
            .every(Number.isFinite),
        );
        assert.ok(evidence.stoppingDistanceCm >= 0);
        assert.ok(
          evidence.bottomKineticJ >= 0 &&
            evidence.bottomKineticJ <= evidence.initialPotentialJ + 1e-10,
        );
        const duration = evidence.rampDuration + evidence.stoppingDuration;
        let previousX = -1;
        for (const time of [0, duration / 4, duration / 2, duration, duration + 1]) {
          const motion = challengeMotion(design, evidence, time);
          assert.ok(Object.values(motion).every(Number.isFinite));
          assert.ok(motion.heightCm >= 0 && motion.heightCm <= heightCm);
          assert.ok(motion.horizontalCm >= previousX - 1e-9);
          previousX = motion.horizontalCm;
        }
        if (evidence.reachesRampBottom) {
          const final = challengeMotion(design, evidence, duration + 1);
          assert.ok(
            Math.abs(
              final.horizontalCm - rampGeometry(design).horizontalCm - evidence.stoppingDistanceCm,
            ) < 1e-8,
          );
          const friction = { smooth: 0.1, medium: 0.2, rough: 0.35 }[surfaceId];
          const frictionWork = (2 * friction * 10 * rampGeometry(design).horizontalCm) / 100;
          assert.ok(
            Math.abs(evidence.initialPotentialJ - frictionWork - evidence.bottomKineticJ) < 1e-9,
          );
          shortest = Math.min(shortest, evidence.stoppingDistanceCm);
          longest = Math.max(longest, evidence.stoppingDistanceCm);
        }
        if (evidence.status === "success") {
          successful++;
          assert.ok(evidence.reachesRampBottom);
          assert.ok(
            evidence.stoppingDistanceCm >= 10 - 1e-9 && evidence.stoppingDistanceCm <= 30 + 1e-9,
          );
        }
      }
  assert.ok(successful > 1);
  assert.ok(shortest < 10);
  assert.ok(longest > 500);
});

test("near-zero acceleration and exact boundaries remain stable without rounding the model", () => {
  const criticalAngle = (Math.atan(0.35) * 180) / Math.PI;
  for (const delta of [-1e-7, 0, 1e-7]) {
    const design = { heightCm: 20, angleDeg: criticalAngle + delta, surfaceId: "rough" };
    const evidence = challengeEvidence(design);
    assert.ok(Number.isFinite(evidence.rampDuration));
    assert.ok(
      Number.isFinite(challengeMotion(design, evidence, evidence.rampDuration).horizontalCm),
    );
    assert.notEqual(evidence.status, "success");
  }
  assert.equal(classifyStop(true, 10), "success");
  assert.equal(classifyStop(true, 30), "success");
  assert.equal(classifyStop(true, 9.999), "stops_too_early");
  assert.equal(classifyStop(true, 30.001), "overshoots");
  assert.equal(formatNumber(4.518148973580916, 1), "4,5");
  assert.equal(formatNumber(528.4947844443474, 1), "528,5");
});

test("progress distinguishes current, completed and upcoming without scores", () => {
  assert.equal(progressStepStatus("design", "prediction"), "done");
  assert.equal(progressStepStatus("prediction", "prediction"), "current");
  assert.equal(progressStepStatus("experiment", "prediction"), "upcoming");
  assert.equal(progressStepStatus("design"), "upcoming");
  assert.equal(progressStepStatus("completion", "completion", true), "done");
});

test("logical walkthrough A–E preserves work on refresh at every stage and reset", () => {
  const reason = "Nhóm sử dụng số liệu để kiểm chứng thiết kế.";
  let state = createChallengeState();
  function step(action) {
    state = challengeReducer(state, action);
    if (state.stage !== "testing") {
      const restored = restoreChallenge(serializeChallenge(state));
      assert.equal(restored.status, "saved");
      assert.deepEqual(restored.state, state);
      state = restored.state;
    }
  }
  step({ type: "start" });
  const partial = challengeReducer(state, { type: "reset" });
  assert.deepEqual(partial, createChallengeState());
  for (let number = 1; number <= 5; number++) {
    if (number === 2)
      step({ type: "change-design", design: { heightCm: 20, angleDeg: 30, surfaceId: "rough" } });
    step({ type: "predict" });
    step({ type: "prediction", safe: true, explanation: reason });
    step({ type: "run" });
    state = restoreChallenge(serializeChallenge(state)).state;
    assert.equal(state.stage, "results");
    assert.equal(state.attempts.length, number);
    step({ type: "analysis", text: reason });
    assert.equal(state.attempts.at(-1).evidence.status === "success", number > 1);
    if (number < 5) {
      step({ type: "improve" });
      step({
        type: "improvement",
        decision: { factor: number === 1 ? "multiple" : "repeat", explanation: reason },
      });
      step({ type: "next" });
    }
  }
  step({ type: "review" });
  step({
    type: "final-argument",
    argument: {
      attemptId: state.attempts[1].id,
      evidenceIds: [state.attempts[0].id, state.attempts[1].id],
      claim: reason,
      evidenceReasoning: reason,
      reasoning: reason,
      comparisonReasoning: reason,
      submitted: false,
    },
  });
  step({ type: "submit-final" });
  for (let index = 0; index < 5; index++) step({ type: "reflection", index, text: reason });
  step({ type: "complete" });
  assert.equal(state.stage, "completed");
  step({ type: "reset" });
  assert.deepEqual(state, createChallengeState());
});
