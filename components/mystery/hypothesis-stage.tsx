import type { StageProps } from "./types";
import type { InvestigationQuiz } from "@/hooks/use-investigation-quiz";
import { QuestionNavigator } from "@/components/quiz/question-navigator";
import { QuestionPanel } from "@/components/quiz/question-panel";
import { QuizResults } from "@/components/quiz/quiz-results";

interface HypothesisStageProps extends StageProps {
  quiz: InvestigationQuiz;
}

export function HypothesisStage({ headingRef, onNavigate, quiz }: HypothesisStageProps) {
  return (
    <section className="hypothesis">
      <h1 ref={headingRef} tabIndex={-1}>
        Em giải thích thế nào?
      </h1>
      <p className="intro">
        Chọn câu hỏi theo thứ tự em muốn. Trả lời toàn bộ rồi nộp bài để xem kết quả.
      </p>
      {quiz.submitted ? (
        <QuizResults quiz={quiz} onReviewExperiments={() => onNavigate(2)} />
      ) : (
        <>
          <div className="quiz-layout">
            <QuestionNavigator quiz={quiz} />
            <QuestionPanel quiz={quiz} />
          </div>
          <div className="quiz-submit">
            <p>
              {quiz.allAnswered
                ? "Em đã chọn đáp án cho tất cả câu hỏi. Sẵn sàng nộp bài?"
                : `Còn ${quiz.answers.length - quiz.answeredCount} câu chưa trả lời.`}
            </p>
            <button className="primary cta" disabled={!quiz.allAnswered} onClick={quiz.submit}>
              Nộp bài và xem kết quả →
            </button>
          </div>
        </>
      )}
      <div className="actions">
        <button className="secondary" onClick={() => onNavigate(2)}>
          ← Xem lại thí nghiệm
        </button>
        <button className="primary" disabled={!quiz.submitted} onClick={() => onNavigate(4)}>
          Tổng kết bài học →
        </button>
      </div>
    </section>
  );
}
