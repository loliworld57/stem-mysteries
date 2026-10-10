export interface TopicDefinition {
  id: string;
  label: string;
  colorToken: string;
}

export const subjectDefinitions: Record<string, string> = {
  physics: "Vật lí",
  chemistry: "Hóa học",
  biology: "Sinh học",
};
export const gradeDefinitions: Record<string, string> = {
  "8": "Lớp 8",
  "9": "Lớp 9",
};
export const topicDefinitions: readonly TopicDefinition[] = [
  { id: "friction", label: "Ma sát", colorToken: "orange" },
  { id: "energy", label: "Năng lượng", colorToken: "amber" },
  { id: "motion", label: "Chuyển động", colorToken: "teal" },
  { id: "force", label: "Lực", colorToken: "purple" },
  { id: "mechanics", label: "Cơ học", colorToken: "green" },
  { id: "kinetic-energy", label: "Động năng", colorToken: "amber" },
  { id: "potential-energy", label: "Thế năng", colorToken: "amber" },
  { id: "energy-conservation", label: "Bảo toàn cơ năng", colorToken: "amber" },
  { id: "energy-transfer", label: "Chuyển hóa năng lượng", colorToken: "amber" },
  { id: "braking-distance", label: "Quãng đường phanh", colorToken: "teal" },
  { id: "height", label: "Độ cao", colorToken: "green" },
];

export function getTopic(id: string): TopicDefinition {
  return (
    topicDefinitions.find((topic) => topic.id === id) ?? { id, label: id, colorToken: "neutral" }
  );
}

export function academicLabel(entry: {
  subjectIds: readonly string[];
  gradeIds: readonly string[];
}) {
  return [
    entry.subjectIds.map((id) => subjectDefinitions[id] ?? id).join(", "),
    entry.gradeIds.map((id) => gradeDefinitions[id] ?? `Lớp ${id}`).join(", "),
  ]
    .filter(Boolean)
    .join(" · ");
}
