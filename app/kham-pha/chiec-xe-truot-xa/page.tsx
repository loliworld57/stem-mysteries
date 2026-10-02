import type { Metadata } from "next";
import { MysteryExperience } from "@/components/mystery/mystery-experience";

export const metadata: Metadata = {
  title: "Chiếc xe trượt xa",
  description:
    "Khám phá ảnh hưởng của ma sát và vận tốc đến quãng đường phanh qua thí nghiệm tương tác dành cho lớp 9.",
};

export default function RoverMysteryPage() {
  return <MysteryExperience />;
}
