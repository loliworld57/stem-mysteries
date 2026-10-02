import { surfaces } from "@/lib/mystery-data";
import { formatNumber } from "@/lib/format";
import { kineticEnergy, kmhToMs, msToKmh, ROVER_MASS } from "@/lib/physics";
import type { BrakingSimulation } from "@/hooks/use-braking-simulation";
import { Rover } from "./rover";
export function BrakingTrack({ simulation }: { simulation: BrakingSimulation }) {
  const { surface, speedKmh, motion, running } = simulation;
  const currentEnergy = kineticEnergy(
    ROVER_MASS,
    motion.distance > 0 || running ? motion.speedMs : kmhToMs(speedKmh),
  );
  return (
    <div className="simulation">
      <div className="panel-title">
        <h2>Đường thử phanh</h2>
        <span>
          {running
            ? "● Xe đang trượt"
            : motion.distance > 0
              ? "✓ Xe đã dừng"
              : "Sẵn sàng thử nghiệm"}
        </span>
      </div>
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label={`${surfaces[surface].name}: xe đã đi được ${formatNumber(motion.distance, 2)} mét`}
      >
        <rect x="20" y="233" width="835" height="34" rx="10" fill={surfaces[surface].color} />
        <path d="M80 125V280" stroke="#477da5" strokeDasharray="6 6" strokeWidth="2" />
        <text x="45" y="100" fontSize="20" fill="#173755">
          PHANH
        </text>
        {[0, 5, 10, 15, 20, 25].map((n) => (
          <g key={n}>
            <path d={`M${80 + n * 28} 267v12`} stroke="#477da5" />
            <text x={80 + n * 28} y="306" textAnchor="middle" fontSize="20" fill="#173755">
              {n} m
            </text>
          </g>
        ))}
        <path d={`M80 248H${80 + motion.distance * 28}`} stroke="white" strokeWidth="5" />
        <Rover x={motion.distance * 28} />
        <text x="655" y="150" fontSize="23" fill="#173755">
          {surfaces[surface].name}
        </text>
      </svg>
      <div className="readings">
        <div>
          <span>Quãng đường đã đi</span>
          <strong>
            {formatNumber(motion.distance, 2)} <small>m</small>
          </strong>
        </div>
        <div>
          <span>Vận tốc hiện tại</span>
          <strong>
            {formatNumber(motion.distance > 0 || running ? msToKmh(motion.speedMs) : speedKmh)}{" "}
            <small>km/h</small>
          </strong>
        </div>
      </div>
      <div className="energy-readings">
        <div>
          <span>Động năng</span>
          <strong>{formatNumber(currentEnergy)} J</strong>
        </div>
        <div>
          <span>Thế năng (h = 0 m)</span>
          <strong>0 J</strong>
        </div>
        <div>
          <span>Cơ năng</span>
          <strong>{formatNumber(currentEnergy)} J</strong>
        </div>
      </div>
      <p className="model-note">
        Mô hình: xe 2 kg, bánh bị khóa, đường nằm ngang, ma sát trượt không đổi. Mốc thế năng tại
        mặt đường.
      </p>
    </div>
  );
}
