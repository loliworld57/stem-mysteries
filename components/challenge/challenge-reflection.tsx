import { reflectionQuestions } from "@/lib/challenge-config";
import { hasMeaningfulReason } from "@/lib/challenge-state";
import type { ChallengeAction } from "@/lib/challenge-state";

export function ChallengeReflection({
  responses,
  completed,
  dispatch,
}: {
  responses: string[];
  completed: boolean;
  dispatch: (action: ChallengeAction) => void;
}) {
  return (
    <section className="challenge-panel challenge-controls" aria-labelledby="reflection-title">
      <h2 id="reflection-title">Nhìn lại quá trình thiết kế</h2>
      <p id="reflection-help">
        Viết ngắn gọn theo trải nghiệm của nhóm, ít nhất 10 ký tự mỗi câu. Có thể dừng giữa chừng và
        quay lại; nội dung được lưu cùng tiến trình nếu trình duyệt cho phép lưu.
      </p>
      {reflectionQuestions.map((question, index) => (
        <div key={question}>
          <label htmlFor={`reflection-${index}`}>
            {index + 1}. {question}
          </label>
          <textarea
            id={`reflection-${index}`}
            rows={3}
            maxLength={2000}
            value={responses[index]}
            aria-describedby="reflection-help"
            onChange={(event) => dispatch({ type: "reflection", index, text: event.target.value })}
          />
        </div>
      ))}
      {!completed && (
        <button
          className="primary"
          disabled={!responses.every(hasMeaningfulReason)}
          onClick={() => dispatch({ type: "complete" })}
        >
          Hoàn thành thử thách
        </button>
      )}
    </section>
  );
}
