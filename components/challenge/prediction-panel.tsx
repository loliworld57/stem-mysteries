import type { ChallengeState } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";

export function PredictionPanel({
  prediction,
  dispatch,
}: {
  prediction: ChallengeState["prediction"];
  dispatch: (action: ChallengeAction) => void;
}) {
  const ready = prediction.safe !== null && prediction.explanation.trim().length > 0;
  return (
    <section className="challenge-panel challenge-controls" aria-labelledby="prediction-title">
      <h2 id="prediction-title">Dự đoán trước khi thử nghiệm</h2>
      <fieldset>
        <legend>Em dự đoán thiết kế này có giúp xe dừng trong vùng an toàn không?</legend>
        {[true, false].map((safe) => (
          <label className="challenge-surface" key={String(safe)}>
            <input
              type="radio"
              name="prediction"
              checked={prediction.safe === safe}
              onChange={() =>
                dispatch({ type: "prediction", safe, explanation: prediction.explanation })
              }
            />
            {safe ? "Có" : "Không"}
          </label>
        ))}
      </fieldset>
      <label htmlFor="prediction-reason">Vì sao em dự đoán như vậy?</label>
      <textarea
        id="prediction-reason"
        rows={3}
        maxLength={2000}
        value={prediction.explanation}
        onChange={(event) =>
          dispatch({ type: "prediction", safe: prediction.safe, explanation: event.target.value })
        }
        aria-describedby="prediction-help"
      />
      <p id="prediction-help">
        Chọn Có hoặc Không và giải thích trước khi thử nghiệm. Dự đoán là ý tưởng để kiểm chứng,
        không được chấm điểm.
      </p>
      <div className="actions">
        <button className="secondary" onClick={() => dispatch({ type: "edit" })}>
          ← Xem lại thiết kế
        </button>
        <button className="primary" disabled={!ready} onClick={() => dispatch({ type: "run" })}>
          Thử nghiệm thiết kế
        </button>
      </div>
    </section>
  );
}
