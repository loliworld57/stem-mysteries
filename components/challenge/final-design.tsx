import { isFinalArgumentReady, changedDesignFactors } from "@/lib/challenge-state";
import type { ChallengeAction } from "@/lib/challenge-state";
import type { ChallengeState, FinalDesignArgument } from "@/lib/challenge-types";
import { AttemptEvidence } from "./attempt-evidence";
import { DesignComparison } from "./design-comparison";

export function FinalDesign({
  state,
  dispatch,
}: {
  state: ChallengeState;
  dispatch: (action: ChallengeAction) => void;
}) {
  const argument = state.finalDesign;
  const selected = state.attempts.find((attempt) => attempt.id === argument.attemptId);
  const evidence = state.attempts.filter((attempt) => argument.evidenceIds.includes(attempt.id));
  const comparison =
    evidence.find((attempt) => attempt.id !== selected?.id) ??
    state.attempts.find((attempt) => attempt.id !== selected?.id);
  function update(patch: Partial<FinalDesignArgument>) {
    dispatch({ type: "final-argument", argument: { ...argument, ...patch } });
  }
  if (argument.submitted && selected)
    return (
      <section className="challenge-panel challenge-final" aria-labelledby="final-summary-title">
        <h2 id="final-summary-title">Phương án đề xuất của nhóm</h2>
        <p>Nhóm đã hoàn thành phương án đề xuất dựa trên bằng chứng thử nghiệm.</p>
        <AttemptEvidence attempt={selected} />
        <h3>Lựa chọn</h3>
        <p className="student-reason">{argument.claim}</p>
        <h3>Bằng chứng được chọn</h3>
        {evidence.map((attempt) => (
          <AttemptEvidence key={attempt.id} attempt={attempt} />
        ))}
        <p className="student-reason">{argument.evidenceReasoning}</p>
        <h3>Giải thích</h3>
        <p className="student-reason">{argument.reasoning}</p>
        <h3>So sánh phương án</h3>
        <p className="student-reason">{argument.comparisonReasoning}</p>
        {comparison && changedDesignFactors(comparison.design, selected.design).length > 1 && (
          <p>
            Nhiều yếu tố đã thay đổi giữa hai lần thử, vì vậy chưa thể kết luận một yếu tố duy nhất
            gây ra sự khác biệt.
          </p>
        )}
      </section>
    );
  return (
    <section
      className="challenge-panel challenge-controls challenge-final"
      aria-labelledby="final-choice-title"
    >
      <h2 id="final-choice-title">Phương án nhóm lựa chọn</h2>
      <fieldset>
        <legend>Nhóm chọn lần thử nào làm phương án đề xuất?</legend>
        {state.attempts
          .filter((attempt) => attempt.completed)
          .map((attempt) => (
            <div className="challenge-final-option" key={attempt.id}>
              <label className="challenge-surface">
                <input
                  type="radio"
                  name="final-attempt"
                  checked={argument.attemptId === attempt.id}
                  onChange={() => update({ attemptId: attempt.id })}
                />
                Lần thử {attempt.attemptNumber}
              </label>
              <AttemptEvidence attempt={attempt} />
            </div>
          ))}
      </fieldset>
      {selected && selected.evidence.status !== "success" && (
        <p>
          Phương án này chưa đáp ứng đầy đủ tiêu chí thiết kế. Nếu nhóm vẫn lựa chọn, hãy sử dụng
          bằng chứng để giải thích quyết định.
        </p>
      )}
      <h2>Bảo vệ phương án</h2>
      <p id="argument-help">
        Mỗi câu trả lời cần một nhận xét ngắn có ít nhất 10 ký tự. Số liệu được hiển thị để nhóm
        tham khảo; không cần chép lại tất cả.
      </p>
      <label htmlFor="final-claim">1. Lựa chọn — Nhóm đề xuất phương án này vì:</label>
      <textarea
        id="final-claim"
        rows={3}
        maxLength={2000}
        value={argument.claim}
        aria-describedby="argument-help"
        onChange={(event) => update({ claim: event.target.value })}
      />
      <fieldset>
        <legend>2. Bằng chứng — Sử dụng bằng chứng từ:</legend>
        {state.attempts.map((attempt) => (
          <label className="challenge-surface" key={attempt.id}>
            <input
              type="checkbox"
              checked={argument.evidenceIds.includes(attempt.id)}
              onChange={(event) =>
                update({
                  evidenceIds: event.target.checked
                    ? [...argument.evidenceIds, attempt.id]
                    : argument.evidenceIds.filter((id) => id !== attempt.id),
                })
              }
            />
            Lần thử {attempt.attemptNumber}
          </label>
        ))}
      </fieldset>
      {evidence.map((attempt) => (
        <AttemptEvidence key={attempt.id} attempt={attempt} />
      ))}
      <label htmlFor="final-evidence">
        Những số liệu nào từ các lần thử nghiệm ủng hộ lựa chọn của nhóm?
      </label>
      <textarea
        id="final-evidence"
        rows={3}
        maxLength={2000}
        value={argument.evidenceReasoning}
        aria-describedby="argument-help"
        onChange={(event) => update({ evidenceReasoning: event.target.value })}
      />
      <label htmlFor="final-reasoning">
        3. Giải thích — Bằng chứng trên cho thấy phương án nhóm chọn phù hợp như thế nào với tiêu
        chí thiết kế?
      </label>
      <textarea
        id="final-reasoning"
        rows={3}
        maxLength={2000}
        value={argument.reasoning}
        aria-describedby="argument-help"
        onChange={(event) => update({ reasoning: event.target.value })}
      />
      {selected && comparison && (
        <>
          <p>So sánh phương án đề xuất với lần thử {comparison.attemptNumber}.</p>
          <DesignComparison
            previous={comparison.design}
            current={selected.design}
            previousLabel={`Lần thử ${comparison.attemptNumber}`}
            currentLabel={`Phương án đề xuất: lần ${selected.attemptNumber}`}
          />
        </>
      )}
      <label htmlFor="final-comparison">
        Phương án được chọn khác một phương án trước đó ở điểm nào? Sự thay đổi đó liên quan như thế
        nào đến kết quả thử nghiệm?
      </label>
      <textarea
        id="final-comparison"
        rows={3}
        maxLength={2000}
        value={argument.comparisonReasoning}
        aria-describedby="argument-help"
        onChange={(event) => update({ comparisonReasoning: event.target.value })}
      />
      <button
        className="primary"
        disabled={!isFinalArgumentReady(state)}
        onClick={() => dispatch({ type: "submit-final" })}
      >
        Nộp phương án đề xuất
      </button>
    </section>
  );
}
