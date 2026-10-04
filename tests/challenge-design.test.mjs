import assert from "node:assert/strict";
import test from "node:test";
import { createChallengeState, challengeReducer } from "../lib/challenge-state.ts";
import { rampGeometry } from "../lib/challenge-physics.ts";
import { challengeConfig, challengeSurfaces } from "../lib/challenge-config.ts";
import { brakingResult, potentialEnergy } from "../lib/physics.ts";

test("challenge starts in introduction and design changes require starting", () => {
  const initial = createChallengeState();
  const design = { heightCm: 20, angleDeg: 10, surfaceId: "smooth" };
  assert.equal(initial.stage, "intro");
  assert.strictEqual(challengeReducer(initial, { type: "change-design", design }), initial);
  const started = challengeReducer(initial, { type: "start" });
  assert.equal(started.stage, "design");
  const updated = challengeReducer(started, { type: "change-design", design });
  assert.deepEqual(updated.design, design);
  design.heightCm = 60;
  assert.equal(updated.design.heightCm, 20);
  assert.equal(initial.design.heightCm, 40);
});

test("design boundaries are accepted and invalid or nonfinite settings are rejected", () => {
  const state = challengeReducer(createChallengeState(), { type: "start" });
  for (const heightCm of [20, 60]) {
    for (const angleDeg of [10, 40]) {
      for (const surfaceId of Object.keys(challengeSurfaces)) {
        const design = { heightCm, angleDeg, surfaceId };
        assert.deepEqual(challengeReducer(state, { type: "change-design", design }).design, design);
      }
    }
  }
  for (const patch of [
    { heightCm: 19 },
    { heightCm: 61 },
    { heightCm: NaN },
    { heightCm: 20.5 },
    { angleDeg: 9 },
    { angleDeg: 41 },
    { angleDeg: Infinity },
    { surfaceId: "unknown" },
  ]) {
    assert.strictEqual(
      challengeReducer(state, {
        type: "change-design",
        design: { ...state.design, ...patch },
      }),
      state,
    );
  }
});

test("ramp geometry preserves height and angle at all design boundaries", () => {
  for (const heightCm of [20, 60]) {
    for (const angleDeg of [10, 40]) {
      const geometry = rampGeometry({ heightCm, angleDeg, surfaceId: "medium" });
      assert.ok(Math.abs(Math.hypot(heightCm, geometry.horizontalCm) - geometry.lengthCm) < 1e-10);
      assert.ok(
        Math.abs((Math.atan2(heightCm, geometry.horizontalCm) * 180) / Math.PI - angleDeg) < 1e-10,
      );
    }
  }
  const low = rampGeometry({ heightCm: 20, angleDeg: 20, surfaceId: "smooth" });
  const high = rampGeometry({ heightCm: 40, angleDeg: 20, surfaceId: "rough" });
  assert.equal(high.horizontalCm, 2 * low.horizontalCm);
});

test("challenge state is isolated and existing investigation physics remains unchanged", () => {
  const first = challengeReducer(createChallengeState(), { type: "start" });
  const second = createChallengeState();
  challengeReducer(first, {
    type: "change-design",
    design: { heightCm: 60, angleDeg: 40, surfaceId: "rough" },
  });
  assert.equal(second.stage, "intro");
  assert.equal(second.design.heightCm, 40);
  assert.equal(brakingResult(14.4, 0.1).distance, 8);
  assert.equal(potentialEnergy(2, 2), 40);
  assert.equal(challengeConfig.maxAttempts, 5);
  assert.equal(challengeConfig.safeZoneMinCm, 10);
  assert.equal(challengeConfig.safeZoneMaxCm, 30);
});
