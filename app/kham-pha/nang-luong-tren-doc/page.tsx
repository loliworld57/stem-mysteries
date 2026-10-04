import type { Metadata } from "next";
import { rampEnergyProblem } from "@/lib/problem-catalog";
import { EnergyExperience } from "@/components/energy/energy-experience";

export const metadata: Metadata = rampEnergyProblem.metadata;

export default function EnergyMysteryPage() {
  return <EnergyExperience />;
}
