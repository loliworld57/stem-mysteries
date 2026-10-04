import { challengeSurfaces } from "@/lib/challenge-config";
import { changedDesignFactors } from "@/lib/challenge-state";
import type { ChallengeDesign } from "@/lib/challenge-types";

export function DesignComparison({
  previous,
  current,
  previousLabel = "Lần trước",
  currentLabel = "Thiết kế mới",
}: {
  previous: ChallengeDesign;
  current: ChallengeDesign;
  previousLabel?: string;
  currentLabel?: string;
}) {
  const changed = changedDesignFactors(previous, current);
  const rows = [
    {
      key: "heightCm",
      label: "Độ cao",
      before: `${previous.heightCm} cm`,
      after: `${current.heightCm} cm`,
    },
    {
      key: "angleDeg",
      label: "Góc nghiêng",
      before: `${previous.angleDeg}°`,
      after: `${current.angleDeg}°`,
    },
    {
      key: "surfaceId",
      label: "Bề mặt",
      before: challengeSurfaces[previous.surfaceId].label,
      after: challengeSurfaces[current.surfaceId].label,
    },
  ] as const;
  return (
    <section
      className="challenge-panel challenge-comparison"
      aria-labelledby="design-comparison-title"
    >
      <h2 id="design-comparison-title">So sánh thiết kế</h2>
      <table>
        <caption>
          {previousLabel} và {currentLabel}
        </caption>
        <thead>
          <tr>
            <th scope="col">Yếu tố</th>
            <th scope="col">{previousLabel}</th>
            <th scope="col">{currentLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <th scope="row">{row.label}</th>
              <td>{row.before}</td>
              <td className={changed.includes(row.key) ? "challenge-changed" : undefined}>
                {row.after}
                {changed.includes(row.key) && <small>Đã thay đổi</small>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {changed.length > 1 && (
        <p>
          Nhiều yếu tố đã thay đổi giữa hai lần thử, vì vậy chưa thể kết luận một yếu tố duy nhất
          gây ra sự khác biệt.
        </p>
      )}
    </section>
  );
}
