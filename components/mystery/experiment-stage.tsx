import { ArrowRight, ArrowLeft } from "lucide-react";
import type { StageProps } from "./types";
import type { BrakingSimulation } from "@/hooks/use-braking-simulation";
import { BrakingTrack } from "./braking-track";
import { BrakingControls } from "./braking-controls";
import { ExperimentNotebook } from "./experiment-notebook";

interface ExperimentStageProps extends StageProps {
  simulation: BrakingSimulation;
}

export function ExperimentStage({ headingRef, onNavigate, simulation }: ExperimentStageProps) {
  return (
    <section>
      <h1 ref={headingRef} tabIndex={-1}>
        Cùng kiểm chứng nhé!
      </h1>
      <p className="intro">
        Giữ nguyên vận tốc, thay đổi bề mặt đường và so sánh quãng đường phanh.
      </p>
      <div className="lab">
        <BrakingTrack simulation={simulation} />
        <BrakingControls simulation={simulation} />
      </div>
      <ExperimentNotebook trials={simulation.trials} comparison={simulation.comparison} />
      <div className="actions">
        <button className="secondary" disabled={simulation.running} onClick={() => onNavigate(1)}>
          <ArrowLeft className="inline-icon" aria-hidden="true" /> Xem lại manh mối
        </button>
        <button
          className="primary"
          disabled={!simulation.comparison || simulation.running}
          onClick={() => onNavigate(3)}
        >
          Đưa ra giả thuyết <ArrowRight className="inline-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
