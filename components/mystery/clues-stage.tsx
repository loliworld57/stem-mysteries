import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import type { StageProps } from "./types";
import { clues } from "@/lib/mystery-data";
interface CluesStageProps extends StageProps {
  seen: number[];
  clue: number | null;
  onInspect: (index: number) => void;
}
export function CluesStage({ headingRef, onNavigate, seen, clue, onInspect }: CluesStageProps) {
  return (
    <section>
      <h1 ref={headingRef} tabIndex={-1}>
        Khám phá từng manh mối.
      </h1>
      <p className="intro">Quan sát bằng chứng. Các xe khác nhau ở điểm nào?</p>
      <div className="clue-grid">
        {clues.map((c, i) => (
          <button
            key={c.title}
            className={`clue-card ${seen.includes(i) ? "selected" : ""}`}
            aria-expanded={clue === i}
            onClick={() => {
              onInspect(i);
            }}
          >
            <span className="clue-number">0{i + 1}</span>
            <h2>{c.title}</h2>
            <span className="clue-action">
              {seen.includes(i) ? (
                <>
                  <Check className="inline-icon" aria-hidden="true" /> Đã xem
                </>
              ) : (
                <>
                  Xem manh mối <ArrowRight className="inline-icon" aria-hidden="true" />
                </>
              )}
            </span>
            {clue === i && <p>{c.text}</p>}
          </button>
        ))}
      </div>
      <div className="prompt">
        <span>CÙNG THẢO LUẬN · {seen.length}/3 MANH MỐI ĐÃ XEM</span>
        <p>Bề mặt đường có ảnh hưởng đến quãng đường phanh không?</p>
      </div>
      <div className="actions">
        <button className="secondary" onClick={() => onNavigate(0)}>
          <ArrowLeft className="inline-icon" aria-hidden="true" /> Quay lại
        </button>
        <button className="primary" disabled={seen.length < 3} onClick={() => onNavigate(2)}>
          Làm thí nghiệm <ArrowRight className="inline-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
