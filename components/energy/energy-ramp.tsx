import { formatNumber as format } from "@/lib/format";
interface EnergyRampProps {
  height: number;
  progress: number;
  currentHeight: number;
  kinetic: number;
  potential: number;
}
export function EnergyRamp({
  height,
  progress,
  currentHeight,
  kinetic,
  potential,
}: EnergyRampProps) {
  const topY = 250 - height * 45;
  const x = 100 + progress * 530;
  const y = topY + progress * (250 - topY);
  const angle = (Math.atan2(250 - topY, 530) * 180) / Math.PI;
  return (
    <svg
      viewBox="0 0 760 330"
      role="img"
      aria-label={`Xe ở độ cao ${format(currentHeight)} mét, động năng ${format(kinetic)} jun, thế năng ${format(potential)} jun`}
    >
      <rect width="760" height="330" fill="#e4f0fb" />
      <path d={`M100 ${topY} L630 250 L100 250 Z`} fill="#e6dccb" />
      <path d={`M100 ${topY} L630 250 H710`} fill="none" stroke="#8a7963" strokeWidth="7" />
      <path d={`M60 ${topY} V250`} stroke="#477da5" strokeDasharray="5 5" />
      <text x="24" y={topY - 18} fontSize="21" fill="#173755">
        {height} m
      </text>
      <g transform={`translate(${x},${y}) rotate(${angle})`}>
        <rect x="-27" y="-38" width="54" height="25" rx="6" fill="#e5a13c" />
        <circle cx="-17" cy="-9" r="9" fill="#173755" />
        <circle cx="17" cy="-9" r="9" fill="#173755" />
      </g>
      <text x="320" y="300" fontSize="21" fill="#173755">
        Mặt đất: mốc thế năng (h = 0 m)
      </text>
    </svg>
  );
}
