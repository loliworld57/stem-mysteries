import test from "node:test";
import assert from "node:assert/strict";
import { createBrowserStateStorage } from "../lib/browser-state-storage.ts";
import {
  createSafeRampStorage,
  challengeStorageKey,
  storageVersion,
} from "../lib/challenge-storage.ts";
import { createChallengeState } from "../lib/challenge-state.ts";

function memoryStorage() {
  const values = new Map();
  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}
function adapter(key, getStorage) {
  return createBrowserStateStorage({
    key,
    getStorage,
    createInitialState: () => ({ count: 0 }),
    encode: JSON.stringify,
    decode: (raw) => {
      try {
        return { state: raw ? JSON.parse(raw) : { count: 0 }, status: "saved" };
      } catch {
        return { state: { count: 0 }, status: "invalid" };
      }
    },
  });
}

test("storage keys are isolated and reset writes clean state only to its own key", () => {
  const storage = memoryStorage();
  const first = adapter("first", () => storage);
  const second = adapter("second", () => storage);
  assert.ok(first.save({ count: 2 }));
  assert.ok(second.save({ count: 7 }));
  assert.ok(first.clear());
  assert.deepEqual(first.load(), { state: { count: 0 }, status: "saved" });
  assert.equal(second.load().state.count, 7);
  assert.ok(storage.values.has("first"));
  storage.setItem("first", "broken");
  assert.equal(first.load().status, "invalid");
});

test("denied property access, reads and writes retain unavailable outcomes", () => {
  for (const getStorage of [
    () => {
      throw new Error("Access denied");
    },
    () => ({
      getItem() {
        throw new Error("Read denied");
      },
      setItem() {
        throw new Error("Quota exceeded");
      },
    }),
  ]) {
    const store = adapter("first", getStorage);
    assert.deepEqual(store.load(), { state: { count: 0 }, status: "unavailable" });
    assert.equal(store.save({ count: 3 }), false);
    assert.equal(store.clear(), false);
  }
});

test("Safe Ramp adapter preserves key, migration, persistence and clean reset", () => {
  const storage = memoryStorage();
  const store = createSafeRampStorage(() => storage);
  assert.equal(challengeStorageKey, "stem-mysteries:safe-ramp:v1");
  const state = createChallengeState();
  const legacy = { ...state };
  delete legacy.finalDesign;
  delete legacy.reflections;
  delete legacy.physicalValidation;
  storage.setItem(challengeStorageKey, JSON.stringify({ version: 1, state: legacy }));
  assert.deepEqual(store.load(), { state, status: "saved" });
  assert.ok(store.save(state));
  assert.equal(JSON.parse(storage.getItem(challengeStorageKey)).version, storageVersion);
  assert.deepEqual(store.load().state, state);
  assert.ok(store.clear());
  assert.deepEqual(store.load().state, createChallengeState());
});
