"use client";

import { useReducer, useEffect, useState } from "react";
import { challengeReducer, createChallengeState } from "@/lib/challenge-state";
import type { ChallengeDesign } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";
import { createSafeRampStorage } from "@/lib/challenge-storage";
import type { StorageStatus } from "@/lib/challenge-storage";

export function useEngineeringChallenge() {
  const [state, dispatch] = useReducer(challengeReducer, undefined, createChallengeState);
  const [storage] = useState(() => createSafeRampStorage());
  const [elapsed, setElapsed] = useState(0);
  const [storageStatus, setStorageStatus] = useState<StorageStatus | "loading">("loading");
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const loaded = storage.load();
      dispatch({ type: "restore", state: loaded.state });
      setStorageStatus(loaded.status);
    });
    return () => {
      active = false;
    };
  }, [storage]);
  useEffect(() => {
    if (storageStatus === "loading" || storageStatus === "unavailable") return;
    const saved = storage.save(state);
    if (!saved) queueMicrotask(() => setStorageStatus("unavailable"));
  }, [state, storageStatus, storage]);
  const currentAttempt = state.attempts.at(-1);
  useEffect(() => {
    if (state.stage !== "testing" || !currentAttempt) return;
    const duration =
      currentAttempt.evidence.rampDuration + currentAttempt.evidence.stoppingDuration;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let frame = 0;
    function animate(now: number) {
      const time = reduced ? duration : Math.min((now - started) / 1000, duration);
      setElapsed(time);
      if (time >= duration) dispatch({ type: "finish" });
      else frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [state.stage, currentAttempt]);
  return {
    ...state,
    storageStatus,
    start: () => dispatch({ type: "start" }),
    changeDesign: (design: ChallengeDesign) => dispatch({ type: "change-design", design }),
    elapsed:
      state.stage === "testing"
        ? elapsed
        : currentAttempt && ["results", "improvement", "review"].includes(state.stage)
          ? currentAttempt.evidence.rampDuration + currentAttempt.evidence.stoppingDuration
          : 0,
    currentAttempt,
    dispatch: (action: ChallengeAction) => {
      if (storageStatus === "loading") return;
      if (action.type === "run" && state.stage === "prediction") setElapsed(0);
      dispatch(
        action.type === "run"
          ? { ...action, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
          : action,
      );
    },
  };
}
