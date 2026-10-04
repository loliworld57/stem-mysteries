import { formatNumber } from "@/lib/format";
import { challengeConfig, statusLabels } from "@/lib/challenge-config";
import { hasMeaningfulReason } from "@/lib/challenge-state";
import type { ChallengeAttempt } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";

export function ExperimentResult({
  attempt,
  count,
  dispatch,
}: {
  attempt: ChallengeAttempt;
  count: number;
  dispatch: (action: ChallengeAction) => void;
}) {
  const evidence = attempt.evidence;
  return (
    <section
      className="challenge-panel challenge-controls"
      aria-labelledby="experiment-result-title"
    >
      <h2 id="experiment-result-title">Bằng chứng từ lần thử {count}</h2>
      <p role="status">
        <strong>{evidence.status === "success" ? "ĐẠT YÊU CẦU" : "CHƯA ĐẠT YÊU CẦU"}</strong> ·{" "}
        {statusLabels[evidence.status]}
      </p>
      <dl className="challenge-evidence">
        <div>
          <dt>Vận tốc tại chân dốc</dt>
          <dd>
            {evidence.reachesRampBottom
              ? `${formatNumber(evidence.bottomSpeedKmh, 1)} km/h`
              : "Không đến chân dốc"}
          </dd>
        </div>
        <div>
          <dt>Quãng đường dừng tính từ chân dốc</dt>
          <dd>
            {evidence.reachesRampBottom
              ? `${formatNumber(evidence.stoppingDistanceCm, 1)} cm`
              : "Chưa đi xuống dốc"}
          </dd>
        </div>
        <div>
          <dt>Thế năng ban đầu</dt>
          <dd>{formatNumber(evidence.initialPotentialJ, 1)} J</dd>
        </div>
        <div>
          <dt>Động năng tại chân dốc</dt>
          <dd>
            {evidence.reachesRampBottom
              ? `${formatNumber(evidence.bottomKineticJ, 1)} J`
              : "Không đến chân dốc"}
          </dd>
        </div>
      </dl>
      <p>Số liệu hiển thị được làm tròn; tiêu chí dùng giá trị chưa làm tròn.</p>
      <p>
        Dự đoán của nhóm: {attempt.prediction.safe ? "Có" : "Không"}.{" "}
        {attempt.prediction.explanation}
      </p>
      <label htmlFor="result-analysis">
        Dựa vào số liệu thu được, nhóm em nhận xét gì về thiết kế này?
      </label>
      <textarea
        id="result-analysis"
        rows={3}
        maxLength={2000}
        value={attempt.analysis}
        aria-describedby="analysis-help"
        onChange={(event) => dispatch({ type: "analysis", text: event.target.value })}
      />
      <p id="analysis-help">
        Viết nhận xét ngắn có ít nhất 10 ký tự. Liên hệ số liệu với dự đoán và tiêu chí thiết kế.
      </p>
      {evidence.status === "success" && (
        <p>
          Thiết kế đã đáp ứng tiêu chí. Nhóm có thể tiếp tục thử nghiệm để tìm hiểu liệu còn phương
          án khác hoặc cải tiến thiết kế.
        </p>
      )}
      {count < challengeConfig.maxAttempts ? (
        <>
          <p>
            Giải thích bằng chứng trước khi thiết kế phương án tiếp theo. Mỗi lần thử đều có giá
            trị.
          </p>
          <button
            className="primary"
            disabled={!hasMeaningfulReason(attempt.analysis)}
            onClick={() => dispatch({ type: "improve" })}
          >
            Lập kế hoạch cải tiến →
          </button>
        </>
      ) : (
        <>
          <p>
            Nhóm đã hoàn thành 5 lần thử nghiệm. Hãy xem lại bằng chứng trong Sổ tay kỹ sư để chuẩn
            bị lựa chọn phương án thiết kế.
          </p>
          <button
            className="primary"
            disabled={!hasMeaningfulReason(attempt.analysis)}
            onClick={() => dispatch({ type: "review" })}
          >
            Hoàn thiện phương án →
          </button>
        </>
      )}
    </section>
  );
}
