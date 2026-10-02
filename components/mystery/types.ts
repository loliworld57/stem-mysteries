import type { RefObject } from "react";
export type Stage = 0 | 1 | 2 | 3 | 4;
export interface StageProps {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onNavigate: (stage: Stage) => void;
}
