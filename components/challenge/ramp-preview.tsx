import { challengeConfig, challengeSurfaces } from "@/lib/challenge-config";
import { rampGeometry, challengeMotion } from "@/lib/challenge-physics";
import type { ChallengeDesign, ChallengeEvidence } from "@/lib/challenge-types";
import { Rover } from "@/components/mystery/rover";
import { formatNumber } from "@/lib/format";

export function RampPreview({
  design,
  evidence,
  elapsed = 0,
}: {
  design: ChallengeDesign;
  evidence?: ChallengeEvidence;
  elapsed?: number;
}) {
  const geometry = rampGeometry(design);
  // A fixed equal-axis scale preserves both slope angle and height comparisons.
  const scale = 1.6;
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
  const offscreen = vehicleX > 710;
  return (
    <section className="challenge-panel challenge-preview" aria-labelledby="ramp-preview-title">
      <h2 id="ramp-preview-title">Bản thiết kế đường dốc</h2>
      <p>Xe xuất phát từ trạng thái đứng yên. Vùng dừng được đo từ chân dốc.</p>
      <svg
        viewBox="0 0 760 330"
        role="img"
        aria-label={`Bản thiết kế: độ cao ${design.heightCm} xentimét, góc nghiêng ${design.angleDeg} độ, bề mặt ${surface.label.toLowerCase()}. Vùng dừng an toàn từ ${challengeConfig.safeZoneMinCm} đến ${challengeConfig.safeZoneMaxCm} xentimét tính từ chân dốc.${offscreen ? " Xe đang ở ngoài phạm vi hình vẽ." : ""}`}
      >
        <rect width="760" height="330" fill="#e4f0fb" />
        <path d={`M${left} ${top} L${bottom} ${ground} H${left} Z`} fill="#e6dccb" />
        <path
          d={`M${left} ${top} L${bottom} ${ground} H710`}
          fill="none"
          stroke={surface.color}
          strokeWidth="7"
        />
        <rect x={zoneStart} y={ground - 7} width={zoneEnd - zoneStart} height="25" fill="#28765a" />
        <path d={`M${left - 25} ${top} V${ground}`} stroke="#477da5" strokeDasharray="5 5" />
        <text x="15" y={top - 16} fontSize="20" fill="#173755">
          {design.heightCm} cm
        </text>
        <g
          transform={`translate(${Math.min(710, vehicleX)},${ground - motion.heightCm * scale}) rotate(${motion.angleDeg}) scale(0.4) translate(-78,-233)`}
        >
          <Rover />
        </g>
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
        <text x="30" y="310" fontSize="19" fill="#173755">
          Bề mặt: {surface.label}
        </text>
        {offscreen && (
          <text x="730" y="200" textAnchor="end" fontSize="19" fill="#173755">
            Xe đi tiếp ngoài khung →
          </text>
        )}
      </svg>
      <p className="challenge-zone-label">
        <span aria-hidden="true" />
        Vùng dừng an toàn: {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm tính
        từ chân dốc
      </p>
      <p>Hình học dốc được vẽ cùng tỉ lệ theo hai trục; hình xe là minh họa.</p>
      {offscreen && (
        <p>
          Xe đã vượt phạm vi hình vẽ. Quãng đường dừng theo mô hình:{" "}
          {formatNumber(evidence!.stoppingDistanceCm, 1)} cm tính từ chân dốc.
        </p>
      )}
    </section>
  );
}
