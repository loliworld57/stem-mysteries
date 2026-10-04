"use client";

import { useEffect, useState } from "react";
import { presentationFrame } from "@/lib/challenge-presentation";
import type { ChallengeEvidence } from "@/lib/challenge-types";

// Frame updates stay inside the apparatus, rather than rerendering the notebook and forms.
export function useRampPresentation(
  evidence: ChallengeEvidence | undefined,
  testing: boolean,
  onComplete: () => void,
) {
  const [elapsedMs, setElapsedMs] = useState(0);
  useEffect(() => {
    if (!testing || !evidence) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const started = performance.now();
    let frame = 0;
    function animate(now: number) {
      const elapsed = now - started;
      setElapsedMs(elapsed);
      if (presentationFrame(evidence!, elapsed, preference.matches).phase === "finished")
        onComplete();
      else frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [evidence, testing, onComplete]);
  return evidence
    ? presentationFrame(evidence, elapsedMs)
    : { physicalTime: 0, phase: "ready" as const };
}
