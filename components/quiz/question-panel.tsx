import { ArrowRight, ArrowLeft } from "lucide-react";
import type { InvestigationQuiz } from "@/hooks/use-investigation-quiz";

export function QuestionPanel({ quiz }: { quiz: InvestigationQuiz }) {
  const question = quiz.questions[quiz.activeIndex];

  return (
    <section className="question-panel" aria-labelledby="question-title">
      <div className="question-topic">
        CÂU {quiz.activeIndex + 1} / {quiz.questions.length} · {question.topic}
      </div>
      <h2 id="question-title" className="quiz-question">
        {question.question}
      </h2>
      <div className="answers" role="group" aria-label={`Đáp án câu ${quiz.activeIndex + 1}`}>
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`answer ${quiz.answers[quiz.activeIndex] === index ? "selected" : ""}`}
            aria-pressed={quiz.answers[quiz.activeIndex] === index}
            onClick={() => quiz.selectAnswer(index)}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            {option}
          </button>
        ))}
      </div>
      <p className="answer-saved" role="status">
        {quiz.answers[quiz.activeIndex] === null
          ? "Chọn một đáp án. Kết quả chỉ hiện sau khi em nộp toàn bộ bài."
          : "Đã lưu lựa chọn của em. Em vẫn có thể thay đổi trước khi nộp bài."}
      </p>
      <div className="question-actions">
        <button
          className="secondary"
          disabled={quiz.activeIndex === 0}
          onClick={() => quiz.selectQuestion(quiz.activeIndex - 1)}
        >
          <ArrowLeft className="inline-icon" aria-hidden="true" /> Câu trước
        </button>
        <button
          className="secondary"
          disabled={quiz.activeIndex === quiz.questions.length - 1}
          onClick={() => quiz.selectQuestion(quiz.activeIndex + 1)}
        >
          Câu tiếp theo <ArrowRight className="inline-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
