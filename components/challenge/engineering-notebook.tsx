import { ArrowRight } from "lucide-react";
import {
  challengeConfig,
  challengeSurfaces,
  improvementFactors,
  statusLabels,
} from "@/lib/challenge-config";
import { changedDesignFactors } from "@/lib/challenge-state";
import { formatNumber } from "@/lib/format";
import type { ChallengeState } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";
import { StoppingDistanceComparison } from "./stopping-distance-comparison";
import { ChallengeCriteria } from "./challenge-criteria";
import { FinalDesign } from "./final-design";
import { ChallengeReflection } from "./challenge-reflection";
import { PhysicalChallenge } from "./physical-challenge";

export function EngineeringNotebook({
  state,
  dispatch,
}: {
  state: ChallengeState;
  dispatch: (action: ChallengeAction) => void;
}) {
  const { attempts } = state;
  const completed = attempts.filter((attempt) => attempt.completed);
  const selected = attempts.find((attempt) => attempt.id === state.finalDesign.attemptId);
  const finalStage = ["review", "reflection", "completed"].includes(state.stage);
  return (
    <section className="challenge-panel challenge-notebook" aria-labelledby="notebook-title">
      <h2 id="notebook-title">Báo cáo thiết kế kĩ thuật</h2>
      <section className="report-section">
        <h3>1. Mục tiêu thiết kế</h3>
        <p>Thiết kế đường dốc để xe đến đích và dừng trong vùng an toàn.</p>
        <ChallengeCriteria titleId="report-criteria-title" />
        <p>
          Thiết kế của chúng ta đã thay đổi như thế nào, và bằng chứng nào khiến chúng ta thay đổi?
        </p>
      </section>
      <section className="report-section">
        <h3>2. Phương án thiết kế</h3>
        <p>
          Phương án đang chọn: độ cao {state.design.heightCm} cm; góc nghiêng{" "}
          {state.design.angleDeg}°; bề mặt {challengeSurfaces[state.design.surfaceId].label}.
        </p>
      </section>
      <section className="report-section">
        <h3>3. Quá trình thử nghiệm</h3>
        <p>
          {completed.length}/{challengeConfig.maxAttempts} lần thử đã được ghi nhận.
        </p>
        <p>
          Vùng dừng an toàn: {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm tính
          từ chân dốc. So sánh các lần thử để nhận xét từ số liệu.
        </p>
        {!completed.length && <p>Thí nghiệm hoàn thành sẽ tự động được ghi tại đây.</p>}
        <StoppingDistanceComparison attempts={attempts} />
        <div className="challenge-attempt-grid">
          {completed.map((attempt, index) => {
            const previous = completed[index - 1];
            const changed = previous ? changedDesignFactors(previous.design, attempt.design) : [];
            return (
              <article
                className="challenge-attempt"
                key={attempt.id}
                aria-labelledby={`attempt-${attempt.id}`}
              >
                <h3 id={`attempt-${attempt.id}`}>Lần thử {attempt.attemptNumber}</h3>
                <dl>
                  <div>
                    <dt>Độ cao</dt>
                    <dd>{attempt.design.heightCm} cm</dd>
                  </div>
                  <div>
                    <dt>Góc nghiêng</dt>
                    <dd>{attempt.design.angleDeg}°</dd>
                  </div>
                  <div>
                    <dt>Bề mặt</dt>
                    <dd>{challengeSurfaces[attempt.design.surfaceId].label}</dd>
                  </div>
                  <div>
                    <dt>Dự đoán</dt>
                    <dd>
                      {attempt.prediction.safe ? "Trong vùng an toàn" : "Không trong vùng an toàn"}
                    </dd>
                  </div>
                  <div>
                    <dt>Vận tốc tại chân dốc</dt>
                    <dd>
                      {attempt.evidence.reachesRampBottom
                        ? `${formatNumber(attempt.evidence.bottomSpeedKmh, 1)} km/h`
                        : "Không đến chân dốc"}
                    </dd>
                  </div>
                  <div>
                    <dt>Quãng đường dừng</dt>
                    <dd
                      className={
                        attempt.evidence.status === "success" ? "challenge-in-zone" : undefined
                      }
                    >
                      {attempt.evidence.reachesRampBottom
                        ? `${formatNumber(attempt.evidence.stoppingDistanceCm, 1)} cm`
                        : "Chưa đi xuống dốc"}
                    </dd>
                  </div>
                  <div>
                    <dt>Kết quả</dt>
                    <dd>{statusLabels[attempt.evidence.status]}</dd>
                  </div>
                </dl>
                {previous && (
                  <p>
                    {changed.length === 0
                      ? "Giữ nguyên cả ba yếu tố so với lần trước."
                      : `Đã thay đổi ${changed.length} yếu tố so với lần trước.`}
                  </p>
                )}
                {changed.length > 1 && (
                  <p>
                    Nhiều yếu tố đã thay đổi giữa hai lần thử, vì vậy chưa thể kết luận một yếu tố
                    duy nhất gây ra sự khác biệt.
                  </p>
                )}
                <details>
                  <summary>
                    Dự đoán <ArrowRight className="inline-icon" aria-hidden="true" /> Phân tích{" "}
                    <ArrowRight className="inline-icon" aria-hidden="true" /> Cải tiến
                  </summary>
                  <h4>Vì sao nhóm dự đoán như vậy?</h4>
                  <p>{attempt.prediction.explanation}</p>
                  <h4>Phân tích kết quả</h4>
                  <p>{attempt.analysis || "Nhóm chưa ghi nhận xét."}</p>
                  <h4>Kế hoạch cải tiến</h4>
                  <p>
                    {attempt.improvement?.factor
                      ? `${improvementFactors[attempt.improvement.factor]}: ${attempt.improvement.explanation}`
                      : attempt.attemptNumber === challengeConfig.maxAttempts
                        ? "Đã đủ 5 lần thử. Xem lại bằng chứng để chuẩn bị lựa chọn phương án."
                        : "Nhóm chưa hoàn thành kế hoạch cải tiến."}
                  </p>
                  <p>
                    Thế năng ban đầu: {formatNumber(attempt.evidence.initialPotentialJ, 1)} J.{" "}
                    {attempt.evidence.reachesRampBottom &&
                      `Động năng tại chân dốc: ${formatNumber(attempt.evidence.bottomKineticJ, 1)} J.`}
                  </p>
                </details>
              </article>
            );
          })}
        </div>
      </section>
      <section className="report-section">
        <h3>4. Phân tích và cải tiến</h3>
        {completed.length === 0 && (
          <p>Nhận xét và quyết định cải tiến của nhóm sẽ xuất hiện sau mỗi lần thử.</p>
        )}
        {completed.map((attempt) => (
          <article key={attempt.id}>
            <h4>Lần thử {attempt.attemptNumber}</h4>
            <p className="student-reason">{attempt.analysis || "Nhóm chưa ghi nhận xét."}</p>
            {attempt.improvement?.factor && (
              <p className="student-reason">
                {improvementFactors[attempt.improvement.factor]}: {attempt.improvement.explanation}
              </p>
            )}
          </article>
        ))}
      </section>
      <section className="report-section">
        <h3>5. Phương án đề xuất</h3>
        {finalStage ? (
          <FinalDesign state={state} dispatch={dispatch} />
        ) : (
          <p>Sau năm lần thử, nhóm chọn phương án và bằng chứng để giải thích lựa chọn.</p>
        )}
      </section>
      <section className="report-section">
        <h3>6. Kết luận và bài học rút ra</h3>
        {state.finalDesign.submitted ? (
          <>
            <StoppingDistanceComparison attempts={attempts} titleId="reflection-distance-title" />
            <ChallengeReflection
              responses={state.reflections}
              completed={state.stage === "completed"}
              dispatch={dispatch}
            />
          </>
        ) : (
          <p>Nhóm sẽ ghi bài học của mình sau khi đề xuất phương án.</p>
        )}
      </section>
      <section className="report-section">
        <h3>7. Kiểm chứng bằng mô hình thực tế</h3>
        {state.finalDesign.submitted && selected ? (
          <PhysicalChallenge
            attempt={selected}
            validation={state.physicalValidation}
            dispatch={dispatch}
          />
        ) : (
          <p>Phần tùy chọn: đối chiếu phương án đề xuất với xe và đường dốc thật.</p>
        )}
      </section>
    </section>
  );
}
