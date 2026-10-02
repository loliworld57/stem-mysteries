import type { InvestigationQuiz } from "@/hooks/use-investigation-quiz";

export function QuestionNavigator({ quiz }: { quiz: InvestigationQuiz }) {
  return (
    <aside className="question-navigator" aria-labelledby="navigator-title">
      <h2 id="navigator-title">Bảng câu hỏi</h2>
      <p>
        {quiz.answeredCount}/{quiz.questions.length} câu đã chọn đáp án
      </p>
      <nav aria-label="Chọn câu hỏi" className="question-grid">
        {quiz.questions.map((question, index) => (
          <button
            key={question.topic}
            className={`question-number ${quiz.activeIndex === index ? "current" : ""} ${quiz.answers[index] !== null ? "answered" : ""}`}
            onClick={() => quiz.selectQuestion(index)}
            aria-current={quiz.activeIndex === index ? "step" : undefined}
            aria-label={`Câu ${index + 1}: ${question.topic}, ${quiz.answers[index] === null ? "chưa trả lời" : "đã trả lời"}`}
          >
            {index + 1}
            <span aria-hidden="true">{quiz.answers[index] === null ? "○" : "✓"}</span>
          </button>
        ))}
      </nav>
      <div className="quiz-legend">
        <span>✓ Đã chọn đáp án</span>
        <span>○ Chưa trả lời</span>
      </div>
      <p className="quiz-guidance">
        Em có thể chọn bất kỳ câu nào và đổi đáp án trước khi nộp bài.
      </p>
    </aside>
  );
}
