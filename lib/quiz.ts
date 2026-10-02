export interface QuizQuestion {
  topic: string;
  question: string;
  options: string[];
  correct: number;
}

export function gradeQuiz(questions: QuizQuestion[], answers: (number | null)[]) {
  const incorrect = questions.flatMap((question, index) =>
    answers[index] === question.correct ? [] : [index],
  );
  const correctCount = questions.length - incorrect.length;
  return {
    correctCount,
    incorrect,
    score: questions.length === 0 ? 0 : (correctCount / questions.length) * 10,
  };
}
