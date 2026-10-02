"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRampSimulation } from "@/hooks/use-ramp-simulation";
import { useInvestigationQuiz } from "@/hooks/use-investigation-quiz";
import { rampQuestions } from "@/lib/investigation-questions";
import { HypothesisStage } from "@/components/mystery/hypothesis-stage";
import type { Stage } from "@/components/mystery/types";
import { EnergyLab } from "./energy-lab";
import { EnergyRamp } from "./energy-ramp";

export function EnergyExperience() {
  const [stage, setStage] = useState<Stage>(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const simulation = useRampSimulation();
  const quiz = useInvestigationQuiz(rampQuestions);
  useEffect(() => {
    headingRef.current?.focus();
  }, [stage]);
  function navigate(next: Stage) {
    if (!simulation.running) setStage(next === 1 ? 0 : next);
  }
  return (
    <>
      <div className="investigation-progress" aria-label="Tiến trình bài học">
        {["Tình huống", "Thí nghiệm", "Suy luận", "Tổng kết"].map((label, index) => (
          <div key={label} className={`step ${[0, 2, 3, 4][index] === stage ? "active" : ""}`}>
            <span>{index + 1}</span>
            {label}
          </div>
        ))}
      </div>
      <div className="case-label">
        ● BÍ ẨN 002 <span>/</span> NĂNG LƯỢNG TRÊN DỐC
      </div>
      {stage === 0 && (
        <section className="hero">
          <div>
            <div className="eyebrow">Khám phá chuyển hóa năng lượng</div>
            <h1 ref={headingRef} tabIndex={-1}>
              Từ độ cao
              <br />
              đến <em>vận tốc.</em>
            </h1>
            <p>
              Xe đứng yên ở đỉnh dốc nhưng chuyển động nhanh dần khi xuống thấp. Năng lượng của xe
              thay đổi thế nào?
            </p>
            <button className="primary cta" onClick={() => navigate(2)}>
              Khám phá dốc không ma sát →
            </button>
          </div>
          <div className="scene">
            <div className="scene-top">
              TÌNH HUỐNG <span>Thả xe từ trạng thái đứng yên</span>
            </div>
            <EnergyRamp height={2} progress={0} currentHeight={2} kinetic={0} potential={40} />
            <div className="scene-footer">Xe 2 kg · Mặt đất là mốc thế năng · Bỏ qua ma sát</div>
          </div>
        </section>
      )}
      {stage === 2 && (
        <section>
          <h1 ref={headingRef} tabIndex={-1}>
            Độ cao quyết định điều gì?
          </h1>
          <p className="intro">
            Thả xe từ các độ cao 1 m, 2 m và 4 m. So sánh vận tốc ở chân dốc và theo dõi các thanh
            năng lượng khi xe chuyển động.
          </p>
          <EnergyLab simulation={simulation} />
          <div className="actions">
            <button className="secondary" disabled={simulation.running} onClick={() => navigate(0)}>
              ← Xem lại tình huống
            </button>
            <button className="primary" disabled={simulation.running} onClick={() => navigate(3)}>
              Suy luận từ thí nghiệm →
            </button>
          </div>
        </section>
      )}
      {stage === 3 && <HypothesisStage headingRef={headingRef} onNavigate={navigate} quiz={quiz} />}
      {stage === 4 && (
        <section className="conclusion">
          <div className="solved">✓</div>
          <h1 ref={headingRef} tabIndex={-1}>
            Năng lượng chuyển hóa trên dốc
          </h1>
          <p className="lead">Thế năng giảm, động năng tăng.</p>
          <p>
            Trong mô hình không ma sát, tổng động năng và thế năng không đổi. Khi thả từ độ cao lớn
            hơn, xe có nhiều cơ năng hơn và vận tốc ở chân dốc lớn hơn.
          </p>
          <div className="learning-grid">
            <div>
              <span>01 · THẾ NĂNG</span>
              <h2>Phụ thuộc vào độ cao.</h2>
              <p>Với cùng xe và cùng mốc mặt đất, thế năng tỉ lệ với độ cao: Wt = mgh.</p>
            </div>
            <div>
              <span>02 · ĐỘNG NĂNG</span>
              <h2>Phụ thuộc vào bình phương vận tốc.</h2>
              <p>Ở chân dốc, thế năng bằng 0 và cơ năng chuyển thành động năng: Wđ = ½mv².</p>
            </div>
            <div>
              <span>03 · MÔ HÌNH</span>
              <h2>Kiểm tra các giả thiết.</h2>
              <p>
                Bỏ qua ma sát, lực cản và năng lượng quay của bánh xe. Đổi km/h sang m/s bằng cách
                chia cho 3,6 trước khi tính động năng.
              </p>
            </div>
          </div>
          <div className="conclusion-actions mt-8">
            <button className="primary" onClick={() => navigate(2)}>
              Tiếp tục thí nghiệm →
            </button>
            <Link className="secondary" href="/#bi-an">
              Chọn bài khám phá khác
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
