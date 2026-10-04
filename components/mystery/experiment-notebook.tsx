import { Check } from "lucide-react";
import { surfaces } from "@/lib/mystery-data";
import { TRACK_LENGTH } from "@/lib/physics";
import { formatNumber } from "@/lib/format";
import type { Trial } from "@/lib/mystery-types";
export function ExperimentNotebook({
  trials,
  comparison,
}: {
  trials: Trial[];
  comparison: boolean;
}) {
  return (
    <div className="notebook">
      <div className="panel-title">
        <h2>Sổ ghi kết quả</h2>
        <span>8 lần thử gần nhất</span>
      </div>
      {trials.length === 0 ? (
        <p>Chạy thí nghiệm đầu tiên để thu thập bằng chứng.</p>
      ) : (
        <div className="trials">
          {trials.map((t, i) => (
            <div className="trial" key={i}>
              <span>
                {i + 1}. {surfaces[t.surface].name}
                <small>{formatNumber(t.speedKmh)} km/h vận tốc ban đầu</small>
              </span>
              <div className="bar">
                <div
                  style={{
                    width: `${(t.distance / TRACK_LENGTH) * 100}%`,
                    background: surfaces[t.surface].color,
                  }}
                />
              </div>
              <strong>{formatNumber(t.distance, 2)} m</strong>
            </div>
          ))}
        </div>
      )}
      <p className="comparison" role="status">
        {comparison ? (
          <>
            <Check className="inline-icon" aria-hidden="true" /> Đã có phép so sánh công bằng: khác
            bề mặt, cùng vận tốc ban đầu.
          </>
        ) : (
          "Thử hai bề mặt khác nhau với cùng vận tốc ban đầu để so sánh công bằng."
        )}
      </p>
    </div>
  );
}
