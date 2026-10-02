"use client";

import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";
import type { InvestigationQuiz } from "@/hooks/use-investigation-quiz";

export function QuizResults({
  quiz,
  onReviewExperiments,
}: {
  quiz: InvestigationQuiz;
  onReviewExperiments: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  if (!quiz.result) return null;

  return (
    <section className="quiz-results" aria-labelledby="results-title">
      <div className="results-heading">
        <div>
          <div className="eyebrow">Đã nộp bài</div>
          <h2 id="results-title" ref={heading} tabIndex={-1}>
            Kết quả khám phá
          </h2>
        </div>
        <div className="score">
          <strong>{formatNumber(quiz.result.score)}</strong>
          <span>/ 10 điểm</span>
        </div>
      </div>
      <div className="score-summary" role="status">
        Đúng {quiz.result.correctCount}/{quiz.questions.length} câu · Sai{" "}
        {quiz.result.incorrect.length} câu
      </div>
      {quiz.result.incorrect.length === 0 ? (
        <p>Em đã trả lời đúng tất cả câu hỏi. Hãy tiếp tục đến phần tổng kết bài học!</p>
      ) : (
        <>
          <h3>Các câu cần kiểm tra lại</h3>
          <p>Quay lại thí nghiệm, quan sát bằng chứng và tự kiểm tra lựa chọn của em.</p>
          <div className="incorrect-list">
            {quiz.result.incorrect.map((index) => (
              <article key={index} className="incorrect-question">
                <div className="incorrect-label">
                  Câu {index + 1} · {quiz.questions[index].topic}
                </div>
                <h4>{quiz.questions[index].question}</h4>
                <p>Em đã chọn: {quiz.questions[index].options[quiz.answers[index]!]}</p>
                <button className="secondary compact" onClick={() => quiz.editAnswers(index)}>
                  Xem lại câu {index + 1} →
                </button>
              </article>
            ))}
          </div>
        </>
      )}
      <div className="results-actions">
        <button className="primary" onClick={onReviewExperiments}>
          ← Tự kiểm chứng bằng thí nghiệm
        </button>
        <button className="secondary" onClick={() => quiz.editAnswers()}>
          Điều chỉnh đáp án
        </button>
      </div>
    </section>
  );
}
