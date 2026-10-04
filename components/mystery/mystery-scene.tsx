import { CircleDot } from "lucide-react";
import { Rover } from "./rover";
export function MysteryScene() {
  return (
    <div className="scene">
      <div className="scene-top">
        HIỆN TRƯỜNG <span>Chuyện gì đã xảy ra?</span>
      </div>
      <svg
        viewBox="0 0 700 440"
        role="img"
        aria-label="Xe vàng dừng trên cao su, xe xanh trượt xa hơn trên băng"
      >
        <defs>
          <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M35 0H0V35" fill="none" stroke="#caddf0" />
          </pattern>
        </defs>
        <rect width="700" height="440" fill="url(#grid)" />
        <circle cx="560" cy="80" r="44" fill="#f5ce78" />
        <path d="M0 120Q180 45 340 120T700 120" fill="none" stroke="#aecbe3" strokeWidth="2" />
        <g transform="translate(40,0)">
          <rect y="233" width="620" height="30" rx="10" fill="#65716d" />
          <Rover x={100} />
          <text x="20" y="295" fontSize="23" fontWeight="700" fill="#173755">
            A · Cao su khô
          </text>
        </g>
        <g transform="translate(40,140)">
          <rect y="233" width="620" height="30" rx="10" fill="#b7dff5" />
          <path d="M100 247H450" stroke="white" strokeWidth="4" strokeDasharray="12 10" />
          <Rover x={460} blue />
          <text x="20" y="283" fontSize="23" fontWeight="700" fill="#236895">
            B · Băng
          </text>
        </g>
        <text x="555" y="170" fontSize="65" fill="#236895" fontWeight="700">
          ?
        </text>
      </svg>
      <div className="scene-footer">
        <CircleDot className="inline-icon" aria-hidden="true" /> Cùng tìm lời giải cho điều bí ẩn.
      </div>
    </div>
  );
}
