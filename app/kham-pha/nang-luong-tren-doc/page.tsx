import type { Metadata } from "next";
import { EnergyExperience } from "@/components/energy/energy-experience";

export const metadata: Metadata = {
  title: "Năng lượng trên dốc",
  description: "Khám phá chuyển hóa thế năng, động năng và bảo toàn cơ năng trên dốc không ma sát.",
};

export default function EnergyMysteryPage() {
  return <EnergyExperience />;
}
