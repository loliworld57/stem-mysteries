import { challengeSteps } from "@/lib/challenge-config";
import type { ChallengeStep } from "@/lib/challenge-types";
import { progressStepStatus } from "@/lib/challenge-visualization";

export function ChallengeProgress({
  active,
  completed = false,
}: {
  active?: ChallengeStep;
  completed?: boolean;
}) {
  return (
    <nav aria-label="Quy trình thiết kế kỹ thuật" className="challenge-progress">
      <ol>
        {challengeSteps.map((step, index) => {
          const status = progressStepStatus(step.id, active, completed);
          return (
            <li
              key={step.id}
              data-state={status}
              aria-current={status === "current" ? "step" : undefined}
            >
              <span aria-hidden="true">0{index + 1}</span> {step.label}
              <small>
                {status === "done" ? "Đã qua" : status === "current" ? "Đang thực hiện" : "Sắp tới"}
              </small>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
