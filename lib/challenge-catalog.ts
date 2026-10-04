import type { ChallengeDefinition } from "./catalog-types";
import { challengeConfig } from "./challenge-config.ts";

export const safeRampChallenge = {
  id: "safe-ramp",
  number: 1,
  title: "Thiết kế đường dốc an toàn",
  description: `Xe cần đến đích và dừng trong vùng ${challengeConfig.safeZoneMinCm}–${challengeConfig.safeZoneMaxCm} cm tính từ chân dốc. Nhóm em sẽ thiết kế phương án nào?`,
  href: "/thu-thach/duong-doc-an-toan",
  topics: ["Ma sát", "Độ cao", "Chuyển hóa năng lượng"],
  caseLabel: "THỬ THÁCH STEM 01",
  relatedProblemIds: ["sliding-car", "ramp-energy"],
  metadata: {
    title: "Thử thách STEM 01 — Thiết kế đường dốc an toàn",
    description:
      "Vận dụng kiến thức về ma sát và năng lượng để thiết kế đường dốc cho xe mô hình dành cho học sinh lớp 9.",
  },
} as const satisfies ChallengeDefinition;

export const challengeCatalog = [safeRampChallenge] as const;
