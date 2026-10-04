import type { Metadata } from "next";
import { safeRampChallenge } from "@/lib/challenge-catalog";
import { EngineeringChallenge } from "@/components/challenge/engineering-challenge";
import "@/styles/challenge.css";

export const metadata: Metadata = safeRampChallenge.metadata;

export default function SafeRampChallengePage() {
  return <EngineeringChallenge />;
}
