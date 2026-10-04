import { FlaskConical, Cpu, Settings, Pi } from "lucide-react";

type StemIconType = "science" | "technology" | "engineering" | "mathematics";
const stemIcons = {
  science: FlaskConical,
  technology: Cpu,
  engineering: Settings,
  mathematics: Pi,
};

export function StemIcon({ type }: { type: StemIconType }) {
  const Icon = stemIcons[type];
  return <Icon size={38} aria-hidden="true" />;
}
