import test from "node:test";
import assert from "node:assert/strict";
import { presentationFrame, experimentPresentation } from "../lib/challenge-presentation.ts";
import { challengeEvidence, challengeMotion } from "../lib/challenge-physics.ts";

test("presentation prepares, maps model time monotonically, measures and completes", () => {
  const design = { heightCm: 40, angleDeg: 25, surfaceId: "medium" };
  const evidence = challengeEvidence(design);
  const before = structuredClone(evidence);
  assert.equal(presentationFrame(evidence, 0).phase, "ready");
  const start = presentationFrame(evidence, experimentPresentation.preparationMs);
  assert.equal(start.phase, "moving");
  assert.equal(start.physicalTime, 0);
  let previous = 0;
  let measured = false;
  for (let ms = 0; ms <= 8000; ms += 10) {
    const frame = presentationFrame(evidence, ms);
    assert.ok(frame.physicalTime >= previous);
    assert.ok(frame.physicalTime <= evidence.rampDuration + evidence.stoppingDuration);
    previous = frame.physicalTime;
    if (frame.phase === "measuring") measured = true;
  }
  assert.ok(measured);
  const final = presentationFrame(evidence, 8000);
  assert.equal(final.phase, "finished");
  assert.deepEqual(
    challengeMotion(design, evidence, final.physicalTime),
    challengeMotion(design, evidence, 100000),
  );
  assert.deepEqual(evidence, before);
});

test("reduced motion immediately completes every outcome without altering evidence", () => {
  for (const design of [
    { heightCm: 20, angleDeg: 25, surfaceId: "rough" },
    { heightCm: 20, angleDeg: 20, surfaceId: "rough" },
    { heightCm: 60, angleDeg: 40, surfaceId: "smooth" },
    { heightCm: 60, angleDeg: 10, surfaceId: "rough" },
  ]) {
    const evidence = challengeEvidence(design);
    assert.deepEqual(presentationFrame(evidence, 0, true), {
      phase: "finished",
      physicalTime: evidence.rampDuration + evidence.stoppingDuration,
    });
  }
});

test("stationary designs settle without invented travel and long motion remains bounded", () => {
  const blocked = challengeEvidence({ heightCm: 60, angleDeg: 10, surfaceId: "rough" });
  assert.equal(presentationFrame(blocked, 650).phase, "measuring");
  assert.equal(presentationFrame(blocked, 1000).phase, "finished");
  assert.equal(presentationFrame(blocked, 1000).physicalTime, 0);
  const long = { ...blocked, rampDuration: 100, stoppingDuration: 100 };
  assert.equal(presentationFrame(long, 7500).phase, "finished");
});
