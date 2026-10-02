import { stages } from "@/lib/mystery-data";
import type { Stage } from "./types";

export function InvestigationProgress({ stage }: { stage: Stage }) {
  return (
    <nav className="investigation-progress" aria-label="Tiến trình khám phá">
      {stages.map((label, index) => (
        <div
          key={label}
          className={`step ${index === stage ? "active" : ""} ${index < stage ? "done" : ""}`}
          aria-current={index === stage ? "step" : undefined}
        >
          <span>{index < stage ? "✓" : `0${index + 1}`}</span>
          {label}
        </div>
      ))}
    </nav>
  );
}
