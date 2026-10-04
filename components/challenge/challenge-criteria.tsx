import { challengeConfig } from "@/lib/challenge-config";

export function ChallengeCriteria() {
  return (
    <aside className="challenge-panel challenge-criteria" aria-labelledby="criteria-title">
      <h2 id="criteria-title">TIÊU CHÍ THIẾT KẾ</h2>
      <ul>
        <li>Xe phải đi xuống hết đường dốc.</li>
        <li>Xe phải đến được vùng dừng an toàn.</li>
        <li>
          Xe phải dừng từ {challengeConfig.safeZoneMinCm} cm đến {challengeConfig.safeZoneMaxCm} cm
          tính từ chân dốc.
        </li>
      </ul>
      <p>
        <strong>Số lần thử nghiệm: tối đa {challengeConfig.maxAttempts}</strong>
      </p>
      <p>Vận tốc tại chân dốc là số liệu để phân tích, không phải tiêu chí đạt yêu cầu.</p>
      <p>Mỗi lần thử đều cung cấp bằng chứng để nhóm cải tiến thiết kế.</p>
    </aside>
  );
}
