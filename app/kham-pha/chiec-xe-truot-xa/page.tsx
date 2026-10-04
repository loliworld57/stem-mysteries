import type { Metadata } from "next";
import { slidingCarProblem } from "@/lib/problem-catalog";
import { MysteryExperience } from "@/components/mystery/mystery-experience";

export const metadata: Metadata = slidingCarProblem.metadata;

export default function RoverMysteryPage() {
  return <MysteryExperience />;
}
