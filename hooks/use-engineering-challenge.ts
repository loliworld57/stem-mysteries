"use client";

import { useReducer, useEffect, useState, useCallback } from "react";
import { challengeReducer, createChallengeState } from "@/lib/challenge-state";
import type { ChallengeDesign } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";
import { createSafeRampStorage } from "@/lib/challenge-storage";
import type { StorageStatus } from "@/lib/challenge-storage";

export function useEngineeringChallenge() {
  const [state, dispatch] = useReducer(challengeReducer, undefined, createChallengeState);
  const [storage] = useState(() => createSafeRampStorage());
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
  const finishExperiment = useCallback(() => dispatch({ type: "finish" }), []);
  return {
    ...state,
    storageStatus,
    start: () => dispatch({ type: "start" }),
    changeDesign: (design: ChallengeDesign) => dispatch({ type: "change-design", design }),
    finishExperiment,
    currentAttempt,
    dispatch: (action: ChallengeAction) => {
      if (storageStatus === "loading") return;
      dispatch(
        action.type === "run"
          ? { ...action, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
          : action,
      );
    },
  };
}
