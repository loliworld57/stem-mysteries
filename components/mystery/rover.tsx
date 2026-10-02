export function Rover({ x = 0, blue = false }: { x?: number; blue?: boolean }) {
  return (
    <g transform={`translate(${x},0)`}>
      <rect x="30" y="176" width="96" height="43" rx="14" fill={blue ? "#399fce" : "#e5a13c"} />
      <path
        d="M49 176L61 150H96L112 176"
        fill={blue ? "#c5ecff" : "#ffe0a4"}
        stroke="#173755"
        strokeWidth="4"
      />
      <rect x="66" y="155" width="26" height="18" rx="3" fill="#173755" />
      {[51, 105].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="219" r="14" fill="#173755" />
          <circle cx={cx} cy="219" r="6" fill="#edf5fc" />
        </g>
      ))}
    </g>
  );
}
