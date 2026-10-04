import type { ProblemDefinition } from "./catalog-types";

export const slidingCarProblem = {
  id: "sliding-car",
  title: "Chiếc xe trượt xa",
  description:
    "Các xe có cùng vận tốc và cùng phanh. Vì sao xe trên băng lại trượt xa hơn xe trên cao su?",
  href: "/kham-pha/chiec-xe-truot-xa",
  topics: ["Ma sát", "Động năng", "Quãng đường phanh"],
  caseLabel: "BÍ ẨN 001 · VẬT LÍ LỚP 9",
  activitySummary: "1 thí nghiệm · 3 câu hỏi suy luận khoa học",
  metadata: {
    title: "Chiếc xe trượt xa",
    description:
      "Khám phá ảnh hưởng của ma sát và vận tốc đến quãng đường phanh qua thí nghiệm tương tác dành cho lớp 9.",
  },
} as const satisfies ProblemDefinition;

export const rampEnergyProblem = {
  id: "ramp-energy",
  title: "Năng lượng trên dốc",
  description:
    "Thả xe từ các độ cao khác nhau. Thế năng chuyển thành động năng thế nào và vận tốc ở chân dốc thay đổi ra sao?",
  href: "/kham-pha/nang-luong-tren-doc",
  topics: ["Thế năng", "Động năng", "Bảo toàn cơ năng"],
  caseLabel: "BÍ ẨN 002 · VẬT LÍ LỚP 9",
  activitySummary: "1 thí nghiệm · 3 câu hỏi suy luận khoa học",
  metadata: {
    title: "Năng lượng trên dốc",
    description:
      "Khám phá chuyển hóa thế năng, động năng và bảo toàn cơ năng trên dốc không ma sát.",
  },
} as const satisfies ProblemDefinition;

export const problemCatalog = [slidingCarProblem, rampEnergyProblem] as const;
