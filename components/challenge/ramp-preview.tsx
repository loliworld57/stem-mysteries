import { ArrowRight } from "lucide-react";
import { challengeConfig, challengeSurfaces } from "@/lib/challenge-config";
import { rampGeometry, challengeMotion } from "@/lib/challenge-physics";
import type { ChallengeDesign, ChallengeEvidence } from "@/lib/challenge-types";
import { useId } from "react";
import { useRampPresentation } from "@/hooks/use-ramp-presentation";
import { statusLabels } from "@/lib/challenge-config";
import { formatNumber } from "@/lib/format";

export function RampPreview({
  design,
  evidence,
  testing = false,
  onComplete,
}: {
  design: ChallengeDesign;
  evidence?: ChallengeEvidence;
  testing?: boolean;
  onComplete: () => void;
}) {
  const textureId = useId();
  const presentation = useRampPresentation(evidence, testing, onComplete);
  const elapsed = testing
    ? presentation.physicalTime
    : evidence
      ? evidence.rampDuration + evidence.stoppingDuration
      : 0;
  const stopped = Boolean(
    evidence && (!testing || ["measuring", "finished"].includes(presentation.phase)),
  );
  const geometry = rampGeometry(design);
  // A fixed equal-axis scale preserves both slope angle and height comparisons.
  const scale = Math.min(2.5, 580 / (geometry.horizontalCm + 60));
  const left = 75;
  const ground = 235;
  const top = ground - geometry.heightCm * scale;
  const bottom = left + geometry.horizontalCm * scale;
  const zoneStart = bottom + challengeConfig.safeZoneMinCm * scale;
  const zoneEnd = bottom + challengeConfig.safeZoneMaxCm * scale;
  const surface = challengeSurfaces[design.surfaceId];
  const motion = evidence
    ? challengeMotion(design, evidence, elapsed)
    : { horizontalCm: 0, heightCm: design.heightCm, angleDeg: design.angleDeg };
  const vehicleX = left + motion.horizontalCm * scale;
  // Only the body's visual orientation eases at the join; its position remains model-derived.
  const vehicleAngle = evidence?.reachesRampBottom
    ? motion.angleDeg * Math.min(1, Math.max(0, (evidence.rampDuration - elapsed) / 0.06))
    : motion.angleDeg;
  const offscreen = vehicleX > 710;
  return (
    <section className="challenge-panel challenge-preview" aria-labelledby="ramp-preview-title">
      <h2 id="ramp-preview-title">Mô phỏng đường dốc</h2>
      <p className="challenge-apparatus-status" role="status">
        {testing
          ? presentation.phase === "ready"
            ? "Sẵn sàng thử nghiệm"
            : presentation.phase === "moving"
              ? "Thả xe · Quan sát chuyển động"
              : "Xe đã dừng · Đo quãng đường"
          : stopped
            ? "Đã hoàn thành quan sát"
            : "Bản thiết kế · Chưa thử nghiệm"}
      </p>
      <p>Xe xuất phát từ trạng thái đứng yên. Vùng dừng được đo từ chân dốc.</p>
      <svg
        viewBox="0 0 760 370"
        role="img"
        aria-label={`Bản thiết kế: độ cao ${design.heightCm} xentimét, góc nghiêng ${design.angleDeg} độ, bề mặt ${surface.label.toLowerCase()}. Vùng dừng an toàn từ ${challengeConfig.safeZoneMinCm} đến ${challengeConfig.safeZoneMaxCm} xentimét tính từ chân dốc.${offscreen ? " Xe đang ở ngoài phạm vi hình vẽ." : ""}`}
      >
        <defs>
          <pattern
            id={textureId}
            width={design.surfaceId === "rough" ? 8 : 16}
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 6 L4 3 L8 6"
              fill="none"
              stroke="#173755"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="760" height="370" fill="#f0f6ff" />
        <path d={`M${bottom} ${ground + 5} H710`} stroke="#caddf0" strokeWidth="26" />
        <text x={left} y={top - 44} fontSize="17" fill="#173755">
          Xuất phát
        </text>
        <path d={`M${left} ${top} L${bottom} ${ground} H${left} Z`} fill="#e6dccb" />
        <path
          d={`M${left} ${top} L${bottom} ${ground} H710`}
          fill="none"
          stroke={surface.color}
          strokeWidth="7"
        />
        {design.surfaceId !== "smooth" && (
          <path
            d={`M${left} ${top} L${bottom} ${ground} H710`}
            fill="none"
            stroke={`url(#${textureId})`}
            strokeWidth="7"
          />
        )}
        <rect
          className={
            stopped && evidence?.status === "success" ? "challenge-zone-highlight" : undefined
          }
          x={zoneStart}
          y={ground - 7}
          width={zoneEnd - zoneStart}
          height="25"
          fill="#b8dacb"
          stroke="#28765a"
          strokeWidth="2"
        />
        <path
          d={`M${zoneStart} ${ground - 12} V${ground + 24} M${zoneEnd} ${ground - 12} V${ground + 24}`}
          stroke="#28765a"
          strokeDasharray="3 3"
        />
        <text
          x={(zoneStart + zoneEnd) / 2}
          y={ground + 78}
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill="#28765a"
        >
          {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm
        </text>
        <path d={`M${left - 25} ${top} V${ground}`} stroke="#477da5" strokeDasharray="5 5" />
        <text x="15" y={top - 16} fontSize="20" fill="#173755">
          {design.heightCm} cm
        </text>
        <g
          transform={`translate(${Math.min(710, vehicleX)},${ground - motion.heightCm * scale}) rotate(${vehicleAngle})`}
        >
          <path
            d="M-31 -13 V-27 Q-31 -33 -24 -33 H-10 L0 -45 H19 L30 -32 H36 V-13 Z"
            fill="#fbbf24"
            stroke="#173755"
            strokeWidth="2.5"
          />
          <path d="M4 -40 H16 L23 -32 H-2 Z" fill="#173755" />
          <path d="M27 -24 H36" stroke="#ffffff" strokeWidth="3" />
          {[-19, 23].map((x) => (
            <g key={x} transform={`translate(${x},-8)`}>
              <circle r="8" fill="#173755" />
              <circle r="3" fill="#f0f6ff" />
            </g>
          ))}
        </g>
        {stopped && evidence?.reachesRampBottom && (
          <g className="challenge-measurement">
            <path
              className="challenge-measurement-line"
              pathLength="1"
              d={`M${bottom} ${ground + 100} H${Math.min(710, vehicleX)} M${bottom} ${ground + 94} V${ground + 106} M${Math.min(710, vehicleX)} ${ground + 94} V${ground + 106}`}
              stroke="#1e3a8a"
              strokeWidth="2"
              fill="none"
            />
            <circle cx={Math.min(710, vehicleX)} cy={ground + 100} r="4" fill="#1e3a8a" />
            <text
              x={(bottom + Math.min(710, vehicleX)) / 2}
              y={ground + 124}
              textAnchor="middle"
              fontSize="19"
              fill="#1e3a8a"
            >
              {formatNumber(evidence.stoppingDistanceCm, 1)} cm{offscreen ? " · ngoài khung" : ""}
            </text>
          </g>
        )}
        <text x={left + 45} y={ground - 12} fontSize="20" fill="#173755">
          {design.angleDeg}°
        </text>
        <path d={`M${bottom} ${ground + 7} V${ground + 32}`} stroke="#173755" />
        <text x={bottom} y={ground + 55} textAnchor="middle" fontSize="18" fill="#173755">
          Chân dốc · 0 cm
        </text>
        <path
          d={`M${zoneStart} ${ground + 18} V${ground + 28} H${zoneEnd} V${ground + 18}`}
          fill="none"
          stroke="#28765a"
          strokeWidth="2"
        />
        <text x="30" y="285" fontSize="19" fill="#173755">
          Bề mặt: {surface.label}
        </text>
        {offscreen && <ArrowRight x={704} y={174} size={24} color="#173755" aria-hidden="true" />}
        {offscreen && (
          <text x="730" y="200" textAnchor="end" fontSize="19" fill="#173755">
            Xe đi tiếp ngoài khung
          </text>
        )}
      </svg>
      <p className="challenge-zone-label">
        <span aria-hidden="true" />
        VÙNG DỪNG AN TOÀN: {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm tính
        từ chân dốc
      </p>
      {stopped && evidence && (
        <p className="challenge-stop-status">{statusLabels[evidence.status]}</p>
      )}
      <p>Hình học dốc được vẽ cùng tỉ lệ theo hai trục; hình xe là minh họa.</p>
      <p>Thời gian chuyển động được điều chỉnh để dễ quan sát; số liệu vẫn theo mô hình.</p>
      {stopped && evidence?.reachesRampBottom && (
        <p className="challenge-stop-measurement">
          Quãng đường dừng: <strong>{formatNumber(evidence.stoppingDistanceCm, 1)} cm</strong>
          {offscreen ? " · Xe dừng ngoài phạm vi hình vẽ." : ""}
        </p>
      )}
      {offscreen && stopped && (
        <p>
          Xe đã vượt phạm vi hình vẽ. Quãng đường dừng theo mô hình:{" "}
          {formatNumber(evidence!.stoppingDistanceCm, 1)} cm tính từ chân dốc.
        </p>
      )}
    </section>
  );
}
