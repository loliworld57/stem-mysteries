"use client";
import { formatNumber as format } from "@/lib/format";
import { useRampSimulation } from "@/hooks/use-ramp-simulation";
import { EnergyRamp } from "./energy-ramp";
export function EnergyLab({ simulation }: { simulation: ReturnType<typeof useRampSimulation> }) {
  const {
    height,
    progress,
    running,
    currentHeight,
    potential,
    total,
    kinetic,
    speed,
    release,
    changeHeight,
  } = simulation;
  return (
    <section className="energy-lab" aria-labelledby="energy-title">
      <div className="panel-title">
        <h2 id="energy-title">Năng lượng chuyển đi đâu?</h2>
        <span>DỐC KHÔNG MA SÁT</span>
      </div>
      <p className="energy-intro">
        Thả xe từ trạng thái đứng yên. Dự đoán: khi xe xuống thấp, động năng và thế năng thay đổi
        thế nào?
      </p>
      <div className="energy-layout">
        <div>
          <EnergyRamp
            height={height}
            progress={progress}
            currentHeight={currentHeight}
            kinetic={kinetic}
            potential={potential}
          />
          <div className="energy-readings">
            <div>
              <span>Độ cao hiện tại</span>
              <strong>{format(currentHeight)} m</strong>
            </div>
            <div>
              <span>Vận tốc hiện tại</span>
              <strong>{format(speed)} km/h</strong>
            </div>
          </div>
        </div>
        <div className="energy-controls">
          <label htmlFor="height">
            Độ cao thả xe <b>{height} m</b>
          </label>
          <input
            id="height"
            type="range"
            min="1"
            max="4"
            step="1"
            value={height}
            disabled={running}
            onChange={(event) => {
              changeHeight(Number(event.target.value));
            }}
          />
          <button className="primary run" disabled={running} onClick={release}>
            {running ? "Xe đang xuống dốc…" : "▶ Thả xe xuống dốc"}
          </button>
          <div className="energy-bars">
            {[
              { name: "Động năng", value: kinetic, color: "#d38b26" },
              { name: "Thế năng", value: potential, color: "#7956b5" },
              { name: "Cơ năng", value: total, color: "#28765a" },
            ].map((item) => (
              <div key={item.name}>
                <div className="energy-bar-label">
                  <span>{item.name}</span>
                  <strong>{format(item.value)} J</strong>
                </div>
                <div className="bar">
                  <div style={{ width: `${(item.value / 80) * 100}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="energy-observation" role="status">
            {running
              ? "Thế năng giảm, động năng tăng. Cơ năng giữ nguyên."
              : progress === 1
                ? "Ở chân dốc: thế năng bằng 0, toàn bộ cơ năng là động năng."
                : "Ở đỉnh dốc: xe đứng yên, động năng bằng 0."}
          </p>
        </div>
      </div>
      <p className="model-note">
        Xe được xem là chất điểm có khối lượng 2 kg; g = 10 m/s². Bỏ qua ma sát, lực cản không khí
        và năng lượng quay của bánh xe. Thí nghiệm kết thúc ở chân dốc.
      </p>
    </section>
  );
}
