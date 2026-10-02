"use client";

import { useEffect, useRef, useState } from "react";
import { GRAVITY, ROVER_MASS, potentialEnergy, msToKmh } from "@/lib/physics";

export function useRampSimulation() {
  const [height, setHeight] = useState(2);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const currentHeight = height * (1 - progress);
  const potential = potentialEnergy(ROVER_MASS, currentHeight);
  const total = potentialEnergy(ROVER_MASS, height);
  const kinetic = total - potential;
  const speed = msToKmh(Math.sqrt((2 * kinetic) / ROVER_MASS));

  function changeHeight(value: number) {
    if (running) return;
    setHeight(value);
    setProgress(0);
  }

  function release() {
    if (running) return;
    setProgress(0);
    setRunning(true);
    const length = Math.hypot(8, height);
    const acceleration = (GRAVITY * height) / length;
    const duration = Math.sqrt((2 * length) / acceleration);
    const started = performance.now();

    function animate(now: number) {
      const time = Math.min((now - started) / 1000, duration);
      setProgress(Math.min(1, (0.5 * acceleration * time ** 2) / length));
      if (time < duration) frame.current = requestAnimationFrame(animate);
      else setRunning(false);
    }

    frame.current = requestAnimationFrame(animate);
  }

  return {
    height,
    progress,
    running,
    currentHeight,
    potential,
    total,
    kinetic,
    speed,
    release,
    changeHeight,
  };
}
