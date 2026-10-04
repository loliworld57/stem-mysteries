import { checkRequiredFields } from "./submit-feedback";
import { reflectionQuestions } from "@/lib/challenge-config";
import { hasMeaningfulReason } from "@/lib/challenge-state";
import type { ChallengeAction } from "@/lib/challenge-state";

const reflectionHints = [
  "Gợi ý: so sánh độ cao, góc hoặc bề mặt của lần đầu và phương án cuối.",
  "Gợi ý: nhớ lại một số đo khiến nhóm chú ý.",
  "Gợi ý: đối chiếu hai lần thử; nếu đổi nhiều yếu tố, có thể ghi rằng nhóm chưa chắc.",
  "Gợi ý: chọn một lần thử có kết quả giống hoặc khác điều nhóm nghĩ trước đó.",
  "Gợi ý: nêu một điều nhóm còn muốn kiểm tra.",
];

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
        Mỗi câu chỉ cần một ý ngắn theo trải nghiệm của nhóm; không có giới hạn độ dài tối thiểu. Có
        thể dừng giữa chừng và quay lại; nội dung được lưu cùng tiến trình nếu trình duyệt cho phép
        lưu.
      </p>
      {reflectionQuestions.map((question, index) => (
        <div key={question}>
          <label htmlFor={`reflection-${index}`}>
            {index + 1}. {question}
          </label>
          <textarea
            id={`reflection-${index}`}
            placeholder={reflectionHints[index]}
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
          onClick={() => {
            if (
              checkRequiredFields(
                reflectionQuestions.map((_, index) => ({
                  valid: hasMeaningfulReason(responses[index]),
                  message: `Câu suy ngẫm ${index + 1}: ghi một ý ngắn của nhóm.`,
                  selector: `#reflection-${index}`,
                })),
              )
            )
              dispatch({ type: "complete" });
          }}
        >
          Hoàn thành thử thách
        </button>
      )}
    </section>
  );
}
