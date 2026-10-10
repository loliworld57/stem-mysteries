import { ArrowRight, Circle } from "lucide-react";
import { challengeConfig, statusLabels } from "@/lib/challenge-config";
import { stoppingChartMaxCm, stoppingDistanceMarker } from "@/lib/challenge-visualization";
import { formatNumber } from "@/lib/format";
import type { ChallengeAttempt } from "@/lib/challenge-types";

export function StoppingDistanceComparison({
  attempts,
  titleId = "distance-comparison-title",
}: {
  attempts: ChallengeAttempt[];
  titleId?: string;
}) {
  const completed = attempts.filter((attempt) => attempt.completed);
  if (!completed.length) return null;
  return (
    <section className="challenge-distance-comparison" aria-labelledby={titleId}>
      <h3 id={titleId}>So sánh quãng đường dừng</h3>
      <p>
        Vùng dừng an toàn: {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm. Các
        lần thử dùng chung thang đo; hình chỉ hiển thị đến {stoppingChartMaxCm} cm.
      </p>
      <div className="challenge-distance-axis" aria-hidden="true">
        <span>0 cm</span>
        <span>
          {stoppingChartMaxCm} cm <ArrowRight className="inline-icon" aria-hidden="true" />
        </span>
      </div>
      <ol className="challenge-distance-list">
        {completed.map((attempt) => {
          const marker = stoppingDistanceMarker(attempt.evidence);
          return (
            <li key={attempt.id}>
              <strong>Lần thử {attempt.attemptNumber}</strong>
              <div className="challenge-distance-track" aria-hidden="true">
                <span
                  className="challenge-distance-zone"
                  style={{
                    left: `${(challengeConfig.safeZoneMinCm / stoppingChartMaxCm) * 100}%`,
                    width: `${((challengeConfig.safeZoneMaxCm - challengeConfig.safeZoneMinCm) / stoppingChartMaxCm) * 100}%`,
                  }}
                />
                {marker.positionPercent !== null && (
                  <span
                    className="challenge-distance-marker"
                    style={{ left: `${marker.positionPercent}%` }}
                  >
                    {marker.overflow ? (
                      <ArrowRight size={26} aria-hidden="true" />
                    ) : (
                      <Circle size={16} fill="currentColor" aria-hidden="true" />
                    )}
                  </span>
                )}
              </div>
              <span>
                {marker.positionPercent === null
                  ? "Không đến chân dốc"
                  : `${formatNumber(attempt.evidence.stoppingDistanceCm, 1)} cm`}
                {marker.overflow && (
                  <small>&gt; {stoppingChartMaxCm} cm — vượt phạm vi biểu đồ</small>
                )}
              </span>
              <span className="challenge-distance-status">
                {statusLabels[attempt.evidence.status]}
              </span>
            </li>
          );
        })}
      </ol>
      <p>
        Vùng tô nền là vùng an toàn; mũi tên chỉ giá trị vượt phạm vi, không phải xe dừng tại{" "}
        {stoppingChartMaxCm} cm. So sánh số liệu cùng các yếu tố thiết kế trong sổ tay.
      </p>
    </section>
  );
}
