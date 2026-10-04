import { challengeSurfaces, statusLabels } from "@/lib/challenge-config";
import { formatNumber } from "@/lib/format";
import type { ChallengeAttempt } from "@/lib/challenge-types";

export function AttemptEvidence({ attempt }: { attempt: ChallengeAttempt }) {
  return (
    <div className="challenge-evidence-summary">
      <strong>Lần thử {attempt.attemptNumber}</strong>
      <p>
        Độ cao: {attempt.design.heightCm} cm · Góc nghiêng: {attempt.design.angleDeg}° · Bề mặt:{" "}
        {challengeSurfaces[attempt.design.surfaceId].label}
      </p>
      <p>
        {attempt.evidence.reachesRampBottom
          ? `Vận tốc tại chân dốc: ${formatNumber(attempt.evidence.bottomSpeedKmh, 1)} km/h · Quãng đường dừng: ${formatNumber(attempt.evidence.stoppingDistanceCm, 1)} cm`
          : "Xe không đến chân dốc; chưa có số liệu tại chân dốc."}
      </p>
      <p className={attempt.evidence.status === "success" ? "challenge-in-zone" : undefined}>
        {statusLabels[attempt.evidence.status]}
      </p>
    </div>
  );
}
