"use client";

import { useEffect, useRef, useState } from "react";
import { surfaces } from "@/lib/mystery-data";
import { brakingResult, DEFAULT_SPEED_KMH, kmhToMs } from "@/lib/physics";
import type { Trial } from "@/lib/mystery-types";

export function useBrakingSimulation() {
  const [surface, setSurface] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(DEFAULT_SPEED_KMH);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [running, setRunning] = useState(false);
  const [motion, setMotion] = useState({
    distance: 0,
    speedMs: kmhToMs(DEFAULT_SPEED_KMH),
  });
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const comparison = trials.some((a) =>
    trials.some((b) => a.surface !== b.surface && a.speedKmh === b.speedKmh),
  );

  function changeSurface(index: number) {
    if (running) return;
    setSurface(index);
    setMotion({ distance: 0, speedMs: kmhToMs(speedKmh) });
  }

  function changeSpeed(value: number) {
    if (running) return;
    setSpeedKmh(value);
    setMotion({ distance: 0, speedMs: kmhToMs(value) });
  }

  function run() {
    if (running) return;
    const result = brakingResult(speedKmh, surfaces[surface].mu);
    const started = performance.now();
    setRunning(true);
    setMotion({ distance: 0, speedMs: result.initialSpeed });

    function animate(now: number) {
      const time = Math.min((now - started) / 1000, result.duration);
      setMotion({
        distance: result.initialSpeed * time - 0.5 * result.deceleration * time ** 2,
        speedMs: Math.max(0, result.initialSpeed - result.deceleration * time),
      });

      if (time < result.duration) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setRunning(false);
        setTrials((previous) =>
          [...previous, { surface, speedKmh, distance: result.distance }].slice(-8),
        );
      }
    }

    frame.current = requestAnimationFrame(animate);
  }

  function reset() {
    cancelAnimationFrame(frame.current);
    setRunning(false);
    setSurface(0);
    setSpeedKmh(DEFAULT_SPEED_KMH);
    setTrials([]);
    setMotion({ distance: 0, speedMs: kmhToMs(DEFAULT_SPEED_KMH) });
  }

  return {
    surface,
    speedKmh,
    motion,
    trials,
    running,
    comparison,
    changeSurface,
    changeSpeed,
    run,
    reset,
  };
}

export type BrakingSimulation = ReturnType<typeof useBrakingSimulation>;
