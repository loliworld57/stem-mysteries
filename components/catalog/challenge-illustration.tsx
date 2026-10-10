import { SafeRampIllustration } from "./safe-ramp-illustration";

// Simulation illustrations are explicitly composed, independently of catalog metadata.
export function challengeIllustration(id: string) {
  return id === "safe-ramp" ? <SafeRampIllustration /> : null;
}
