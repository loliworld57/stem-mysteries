import type { ChallengeDesign, ChallengeStep, ChallengeSurfaceId } from "./challenge-types";

export const challengeConfig = {
  safeZoneMinCm: 10,
  safeZoneMaxCm: 30,
  maxAttempts: 5,
  height: { min: 20, max: 60, step: 1 },
  angle: { min: 10, max: 40, step: 1 },
} as const;

// Illustrative teaching-model coefficients, not measured material properties.
export const challengeSurfaces: Record<
  ChallengeSurfaceId,
  { label: string; friction: number; color: string }
> = {
  smooth: { label: "Nhẵn", friction: 0.1, color: "#87bddf" },
  medium: { label: "Trung bình", friction: 0.2, color: "#ba8651" },
  rough: { label: "Nhám", friction: 0.35, color: "#65716d" },
};

export const defaultChallengeDesign: ChallengeDesign = {
  heightCm: 40,
  angleDeg: 25,
  surfaceId: "medium",
};

export const challengeSteps: { id: ChallengeStep; label: string }[] = [
  { id: "design", label: "Thiết kế" },
  { id: "prediction", label: "Dự đoán" },
  { id: "experiment", label: "Thử nghiệm" },
  { id: "analysis", label: "Phân tích" },
  { id: "improvement", label: "Cải tiến" },
  { id: "completion", label: "Hoàn thiện" },
];

export const improvementFactors = {
  height: "Độ cao",
  angle: "Góc nghiêng",
  surface: "Bề mặt",
  multiple: "Nhiều hơn một yếu tố",
  repeat: "Giữ nguyên thiết kế để kiểm tra lại",
} as const;

export const statusLabels = {
  does_not_reach: "Xe không hoàn thành hành trình",
  stops_too_early: "Xe chưa đến vùng dừng an toàn",
  success: "Xe dừng trong vùng an toàn",
  overshoots: "Xe vượt vùng dừng an toàn",
} as const;

export const reflectionQuestions = [
  "Thiết kế cuối cùng khác thiết kế ban đầu của nhóm như thế nào?",
  "Bằng chứng nào khiến nhóm thay đổi thiết kế trong quá trình thử nghiệm?",
  "Yếu tố nào có ảnh hưởng rõ nhất đến chuyển động của xe trong các lần thử của nhóm? Bằng chứng nào cho thấy điều đó?",
  "Có kết quả nào khác với dự đoán ban đầu của nhóm không? Nhóm đã học được gì từ kết quả đó?",
  "Nếu được thực hiện thêm một lần thử, nhóm muốn kiểm tra hoặc cải tiến điều gì?",
];
