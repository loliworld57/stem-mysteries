import { challengeSurfaces } from "@/lib/challenge-config";
import type { ChallengeDesign } from "@/lib/challenge-types";

export function DesignSummary({ design }: { design: ChallengeDesign }) {
  return (
    <dl className="challenge-design-summary" aria-label="Phương án đang kiểm chứng">
      <div>
        <dt>Độ cao</dt>
        <dd>{design.heightCm} cm</dd>
      </div>
      <div>
        <dt>Góc nghiêng</dt>
        <dd>{design.angleDeg}°</dd>
      </div>
      <div>
        <dt>Bề mặt</dt>
        <dd>{challengeSurfaces[design.surfaceId].label}</dd>
      </div>
    </dl>
  );
}
