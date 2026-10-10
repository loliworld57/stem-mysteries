import { checkRequiredFields } from "./submit-feedback";
import { improvementFactors } from "@/lib/challenge-config";
import { hasMeaningfulReason } from "@/lib/challenge-state";
import type { ChallengeAction } from "@/lib/challenge-state";
import type { ImprovementDecision, ImprovementFactor } from "@/lib/challenge-types";

export function IterationReflection({
  decision,
  dispatch,
}: {
  decision: ImprovementDecision;
  dispatch: (action: ChallengeAction) => void;
}) {
  return (
    <section
      className="challenge-panel challenge-controls challenge-improvement-panel"
      aria-labelledby="improvement-title"
    >
      <h2 id="improvement-title">Kế hoạch cải tiến</h2>
      <fieldset>
        <legend>Ở lần thử tiếp theo, nhóm em muốn thay đổi yếu tố nào?</legend>
        {(Object.keys(improvementFactors) as ImprovementFactor[]).map((factor) => (
          <label
            className="challenge-surface"
            key={factor}
            data-selected={decision.factor === factor}
          >
            <input
              type="radio"
              name="improvement-factor"
              checked={decision.factor === factor}
              onChange={() => dispatch({ type: "improvement", decision: { ...decision, factor } })}
            />
            {improvementFactors[factor]}
          </label>
        ))}
      </fieldset>
      {decision.factor === "multiple" && (
        <p>
          Khi thay đổi nhiều yếu tố cùng lúc, nhóm có thể khó xác định yếu tố nào tạo ra sự khác
          biệt trong kết quả.
        </p>
      )}
      <label htmlFor="improvement-reason">Vì sao nhóm em muốn thay đổi như vậy?</label>
      <textarea
        id="improvement-reason"
        placeholder="Gợi ý: nhóm muốn kiểm tra điều gì khi đổi yếu tố này hoặc giữ nguyên?"
        rows={3}
        maxLength={2000}
        value={decision.explanation}
        aria-describedby="improvement-help"
        onChange={(event) =>
          dispatch({
            type: "improvement",
            decision: { ...decision, explanation: event.target.value },
          })
        }
      />
      <p id="improvement-help">
        Chỉ cần ghi một ý ngắn. Gợi ý: nhóm muốn kiểm tra điều gì từ kết quả vừa rồi?
      </p>
      <button
        className="primary"
        onClick={() => {
          if (
            checkRequiredFields([
              {
                valid: decision.factor !== null,
                message: "Chọn yếu tố muốn thay đổi hoặc giữ nguyên để kiểm tra lại.",
                selector: 'input[name="improvement-factor"]',
              },
              {
                valid: hasMeaningfulReason(decision.explanation),
                message: "Ghi ngắn gọn vì sao nhóm chọn thay đổi hoặc thử lại.",
                selector: "#improvement-reason",
              },
            ])
          )
            dispatch({ type: "next" });
        }}
      >
        Lưu kế hoạch và thiết kế tiếp
      </button>
    </section>
  );
}
