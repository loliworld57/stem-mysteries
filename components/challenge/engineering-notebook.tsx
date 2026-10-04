import { ArrowRight } from "lucide-react";
import {
  challengeConfig,
  challengeSurfaces,
  improvementFactors,
  statusLabels,
} from "@/lib/challenge-config";
import { changedDesignFactors } from "@/lib/challenge-state";
import { formatNumber } from "@/lib/format";
import type { ChallengeAttempt } from "@/lib/challenge-types";
import { StoppingDistanceComparison } from "./stopping-distance-comparison";

export function EngineeringNotebook({ attempts }: { attempts: ChallengeAttempt[] }) {
  const completed = attempts.filter((attempt) => attempt.completed);
  return (
    <section className="challenge-panel challenge-notebook" aria-labelledby="notebook-title">
      <h2 id="notebook-title">Sổ tay kỹ sư</h2>
      <p>
        Thiết kế của chúng ta đã thay đổi như thế nào, và bằng chứng nào khiến chúng ta thay đổi?
      </p>
      <p>
        Vùng dừng an toàn: {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm tính
        từ chân dốc. So sánh các lần thử để nhận xét từ số liệu.
      </p>
      {!completed.length && <p>Thí nghiệm hoàn thành sẽ tự động được ghi tại đây.</p>}
      <StoppingDistanceComparison attempts={attempts} />
      <div className="challenge-attempt-grid">
        {completed.map((attempt, index) => {
          const previous = completed[index - 1];
          const changed = previous ? changedDesignFactors(previous.design, attempt.design) : [];
          return (
            <article
              className="challenge-attempt"
              key={attempt.id}
              aria-labelledby={`attempt-${attempt.id}`}
            >
              <h3 id={`attempt-${attempt.id}`}>Lần thử {attempt.attemptNumber}</h3>
              <dl>
                <div>
                  <dt>Độ cao</dt>
                  <dd>{attempt.design.heightCm} cm</dd>
                </div>
                <div>
                  <dt>Góc nghiêng</dt>
                  <dd>{attempt.design.angleDeg}°</dd>
                </div>
                <div>
                  <dt>Bề mặt</dt>
                  <dd>{challengeSurfaces[attempt.design.surfaceId].label}</dd>
                </div>
                <div>
                  <dt>Dự đoán</dt>
                  <dd>
                    {attempt.prediction.safe ? "Trong vùng an toàn" : "Không trong vùng an toàn"}
                  </dd>
                </div>
                <div>
                  <dt>Vận tốc tại chân dốc</dt>
                  <dd>
                    {attempt.evidence.reachesRampBottom
                      ? `${formatNumber(attempt.evidence.bottomSpeedKmh, 1)} km/h`
                      : "Không đến chân dốc"}
                  </dd>
                </div>
                <div>
                  <dt>Quãng đường dừng</dt>
                  <dd
                    className={
                      attempt.evidence.status === "success" ? "challenge-in-zone" : undefined
                    }
                  >
                    {attempt.evidence.reachesRampBottom
                      ? `${formatNumber(attempt.evidence.stoppingDistanceCm, 1)} cm`
                      : "Chưa đi xuống dốc"}
                  </dd>
                </div>
                <div>
                  <dt>Kết quả</dt>
                  <dd>{statusLabels[attempt.evidence.status]}</dd>
                </div>
              </dl>
              {previous && (
                <p>
                  {changed.length === 0
                    ? "Giữ nguyên cả ba yếu tố so với lần trước."
                    : `Đã thay đổi ${changed.length} yếu tố so với lần trước.`}
                </p>
              )}
              {changed.length > 1 && (
                <p>
                  Nhiều yếu tố đã thay đổi giữa hai lần thử, vì vậy chưa thể kết luận một yếu tố duy
                  nhất gây ra sự khác biệt.
                </p>
              )}
              <details>
                <summary>
                  Dự đoán <ArrowRight className="inline-icon" aria-hidden="true" /> Phân tích{" "}
                  <ArrowRight className="inline-icon" aria-hidden="true" /> Cải tiến
                </summary>
                <h4>Vì sao nhóm dự đoán như vậy?</h4>
                <p>{attempt.prediction.explanation}</p>
                <h4>Phân tích kết quả</h4>
                <p>{attempt.analysis || "Nhóm chưa ghi nhận xét."}</p>
                <h4>Kế hoạch cải tiến</h4>
                <p>
                  {attempt.improvement?.factor
                    ? `${improvementFactors[attempt.improvement.factor]}: ${attempt.improvement.explanation}`
                    : attempt.attemptNumber === challengeConfig.maxAttempts
                      ? "Đã đủ 5 lần thử. Xem lại bằng chứng để chuẩn bị lựa chọn phương án."
                      : "Nhóm chưa hoàn thành kế hoạch cải tiến."}
                </p>
                <p>
                  Thế năng ban đầu: {formatNumber(attempt.evidence.initialPotentialJ, 1)} J.{" "}
                  {attempt.evidence.reachesRampBottom &&
                    `Động năng tại chân dốc: ${formatNumber(attempt.evidence.bottomKineticJ, 1)} J.`}
                </p>
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
