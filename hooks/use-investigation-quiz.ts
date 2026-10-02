"use client";

import { useState } from "react";
import { gradeQuiz, type QuizQuestion } from "@/lib/quiz";

export function useInvestigationQuiz(questions: QuizQuestion[]) {
  const emptyAnswers = () => questions.map(() => null as number | null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(emptyAnswers);
  const [submitted, setSubmitted] = useState(false);
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const allAnswered = answeredCount === questions.length;

  function selectAnswer(optionIndex: number) {
    if (submitted) return;
    setAnswers((previous) =>
      previous.map((answer, index) => (index === activeIndex ? optionIndex : answer)),
    );
  }

  function submit() {
    if (allAnswered) setSubmitted(true);
  }

  function editAnswers(index = activeIndex) {
    setActiveIndex(index);
    setSubmitted(false);
  }

  function reset() {
    setAnswers(emptyAnswers());
    setActiveIndex(0);
    setSubmitted(false);
  }

  return {
    questions,
    activeIndex,
    answers,
    submitted,
    answeredCount,
    allAnswered,
    result: submitted ? gradeQuiz(questions, answers) : null,
    selectQuestion: setActiveIndex,
    selectAnswer,
    submit,
    editAnswers,
    reset,
  };
}

export type InvestigationQuiz = ReturnType<typeof useInvestigationQuiz>;
