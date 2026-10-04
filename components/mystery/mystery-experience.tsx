"use client";

import { CircleDot } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useInvestigationQuiz } from "@/hooks/use-investigation-quiz";
import { useBrakingSimulation } from "@/hooks/use-braking-simulation";
import { InvestigationProgress } from "./investigation-progress";
import { IntroStage } from "./intro-stage";
import { CluesStage } from "./clues-stage";
import { ExperimentStage } from "./experiment-stage";
import { HypothesisStage } from "./hypothesis-stage";
import { ConclusionStage } from "./conclusion-stage";
import type { Stage } from "./types";
import { brakingQuestions } from "@/lib/investigation-questions";

export function MysteryExperience() {
  const [stage, setStage] = useState<Stage>(0);
  const [seen, setSeen] = useState<number[]>([]);
  const [clue, setClue] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const simulation = useBrakingSimulation();
  const quiz = useInvestigationQuiz(brakingQuestions);

  useEffect(() => {
    headingRef.current?.focus();
  }, [stage]);

  function navigate(nextStage: Stage) {
    if (simulation.running) return;
    setStage(nextStage);
  }

  function inspect(index: number) {
    setClue(index);
    setSeen((previous) => (previous.includes(index) ? previous : [...previous, index]));
  }

  function restart() {
    simulation.reset();
    setSeen([]);
    setClue(null);
    quiz.reset();
    setStage(0);
  }

  const stageProps = { headingRef, onNavigate: navigate };

  return (
    <>
      <InvestigationProgress stage={stage} />
      <div className="case-label">
        <CircleDot className="inline-icon" aria-hidden="true" /> BÍ ẨN 001 <span>/</span> CHUYỂN
        ĐỘNG & NĂNG LƯỢNG
      </div>
      {stage === 0 && <IntroStage {...stageProps} />}
      {stage === 1 && <CluesStage {...stageProps} seen={seen} clue={clue} onInspect={inspect} />}
      {stage === 2 && <ExperimentStage {...stageProps} simulation={simulation} />}
      {stage === 3 && <HypothesisStage {...stageProps} quiz={quiz} />}
      {stage === 4 && <ConclusionStage {...stageProps} onRestart={restart} />}
    </>
  );
}
