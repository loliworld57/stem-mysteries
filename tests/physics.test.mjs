import assert from "node:assert/strict";
import test from "node:test";
import { brakingResult, kineticEnergy, potentialEnergy, kmhToMs, msToKmh } from "../lib/physics.ts";

test("chuyển đổi vận tốc không thay đổi ý nghĩa vật lý", () => {
  assert.equal(kmhToMs(14.4), 4);
  assert.equal(msToKmh(4), 14.4);
});

test("phanh ở cùng vận tốc: băng có quãng đường dài hơn cao su", () => {
  const rubber = brakingResult(14.4, 0.65);
  const ice = brakingResult(14.4, 0.1);
  assert.equal(ice.distance, 8);
  assert.ok(Math.abs(rubber.distance - 16 / 13) < 1e-10);
  assert.ok(ice.distance > rubber.distance);
  assert.equal(kineticEnergy(2, rubber.initialSpeed), 16);
});

test("vận tốc tăng gấp đôi: động năng và quãng đường phanh tăng bốn lần", () => {
  assert.equal(kineticEnergy(2, 4) / kineticEnergy(2, 2), 4);
  assert.equal(brakingResult(14.4, 0.35).distance / brakingResult(7.2, 0.35).distance, 4);
});

test("xe xuống dốc không ma sát: thế năng chuyển thành động năng", () => {
  const totalEnergy = potentialEnergy(2, 2);
  assert.equal(totalEnergy, 40);
  for (const height of [2, 1, 0]) {
    const potential = potentialEnergy(2, height);
    const speed = Math.sqrt((2 * (totalEnergy - potential)) / 2);
    assert.ok(Math.abs(kineticEnergy(2, speed) + potential - totalEnergy) < 1e-10);
  }
});
