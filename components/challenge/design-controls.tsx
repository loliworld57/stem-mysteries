import { challengeConfig, challengeSurfaces } from "@/lib/challenge-config";
import type { ChallengeDesign, ChallengeSurfaceId } from "@/lib/challenge-types";

export function DesignControls({
  design,
  onChange,
}: {
  design: ChallengeDesign;
  onChange: (design: ChallengeDesign) => void;
}) {
  return (
    <section
      className="challenge-panel challenge-controls challenge-design-controls"
      aria-labelledby="design-controls-title"
    >
      <h2 id="design-controls-title">Phương án của nhóm</h2>
      <label htmlFor="challenge-height">
        Độ cao: <strong>{design.heightCm} cm</strong>
      </label>
      <input
        id="challenge-height"
        type="range"
        {...challengeConfig.height}
        value={design.heightCm}
        aria-valuetext={`${design.heightCm} xentimét`}
        onChange={(event) => onChange({ ...design, heightCm: Number(event.target.value) })}
      />
      <div className="range-label">
        <span>{challengeConfig.height.min} cm</span>
        <span>{challengeConfig.height.max} cm</span>
      </div>
      <label htmlFor="challenge-angle">
        Góc nghiêng: <strong>{design.angleDeg}°</strong>
      </label>
      <input
        id="challenge-angle"
        type="range"
        {...challengeConfig.angle}
        value={design.angleDeg}
        aria-valuetext={`${design.angleDeg} độ`}
        onChange={(event) => onChange({ ...design, angleDeg: Number(event.target.value) })}
      />
      <div className="range-label">
        <span>{challengeConfig.angle.min}°</span>
        <span>{challengeConfig.angle.max}°</span>
      </div>
      <fieldset>
        <legend>Bề mặt dốc và vùng dừng</legend>
        {(Object.keys(challengeSurfaces) as ChallengeSurfaceId[]).map((id) => (
          <label key={id} className="challenge-surface" data-selected={design.surfaceId === id}>
            <input
              type="radio"
              name="challenge-surface"
              value={id}
              checked={design.surfaceId === id}
              onChange={() => onChange({ ...design, surfaceId: id })}
            />
            <span aria-hidden="true" style={{ background: challengeSurfaces[id].color }} />
            {challengeSurfaces[id].label}
          </label>
        ))}
      </fieldset>
      <p>
        Các bề mặt dùng mức ma sát minh họa cho mô hình học tập, không phải số đo vật liệu thật.
      </p>
    </section>
  );
}
