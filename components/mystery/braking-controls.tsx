import { surfaces } from "@/lib/mystery-data";
import { formatNumber } from "@/lib/format";
import type { BrakingSimulation } from "@/hooks/use-braking-simulation";
export function BrakingControls({ simulation }: { simulation: BrakingSimulation }) {
  const { surface, speedKmh, running, changeSurface, changeSpeed, run } = simulation;
  return (
    <aside className="controls">
      <h2>Thiết lập thí nghiệm</h2>
      <fieldset disabled={running}>
        <legend>1. Chọn bề mặt đường</legend>
        {surfaces.map((s, i) => (
          <button
            className={`surface ${surface === i ? "selected" : ""}`}
            aria-pressed={surface === i}
            key={s.name}
            onClick={() => changeSurface(i)}
          >
            <span style={{ background: s.color }} />
            {s.name}
            <b>{surface === i ? "●" : "○"}</b>
          </button>
        ))}
        <label htmlFor="speedKmh">
          2. Vận tốc ban đầu <b>{formatNumber(speedKmh)} km/h</b>
        </label>
        <input
          id="speedKmh"
          type="range"
          min="7.2"
          max="21.6"
          step="3.6"
          value={speedKmh}
          onChange={(event) => changeSpeed(Number(event.target.value))}
        />
        <div className="range-label">
          <span>7,2 km/h</span>
          <span>21,6 km/h</span>
        </div>
      </fieldset>
      <button className="primary run" disabled={running} onClick={run}>
        {running ? "Đang thử nghiệm…" : "▶ Chạy thí nghiệm"}
      </button>
    </aside>
  );
}
