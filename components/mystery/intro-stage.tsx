import type { StageProps } from "./types";
import { MysteryScene } from "./mystery-scene";
export function IntroStage({ headingRef, onNavigate }: StageProps) {
  return (
    <section className="hero">
      <div>
        <div className="eyebrow">Mời các nhà khoa học nhí!</div>
        <h1 ref={headingRef} tabIndex={-1}>
          Chiếc xe
          <br />
          <em>trượt xa.</em>
        </h1>
        <p>
          Cùng vận tốc. Cùng phanh.
          <br />
          Vì sao một xe lại trượt xa hơn?
        </p>
        <button className="primary cta" onClick={() => onNavigate(1)}>
          Bắt đầu khám phá <span>→</span>
        </button>
        <div className="tags">
          <span>◷ 15–20 phút</span>
          <span>◎ Học qua trải nghiệm</span>
        </div>
      </div>

      <MysteryScene />
    </section>
  );
}
