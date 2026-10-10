"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";

import Link from "next/link";
import { Toaster } from "sonner";
import { useEffect, useRef } from "react";
import { useEngineeringChallenge } from "@/hooks/use-engineering-challenge";
import { ChallengeIntroduction } from "./challenge-introduction";
import { ChallengeCriteria } from "./challenge-criteria";
import { ChallengeProgress } from "./challenge-progress";
import { DesignSummary } from "./design-summary";
import { DesignControls } from "./design-controls";
import { RampPreview } from "./ramp-preview";
import { PredictionPanel } from "./prediction-panel";
import { ExperimentResult } from "./experiment-result";
import { challengeConfig } from "@/lib/challenge-config";
import { IterationReflection } from "./iteration-reflection";
import { EngineeringNotebook } from "./engineering-notebook";
import { DesignComparison } from "./design-comparison";
import { ChallengeReset } from "./challenge-reset";

export function EngineeringChallenge() {
  const challenge = useEngineeringChallenge();
  const designHeading = useRef<HTMLHeadingElement>(null);
  const started = challenge.stage !== "intro";
  const previousStage = useRef(challenge.stage);
  const finalStage = ["review", "reflection", "completed"].includes(challenge.stage);
  useEffect(() => {
    if (started && !(previousStage.current === "completed" && challenge.stage === "reflection"))
      designHeading.current?.focus();
    previousStage.current = challenge.stage;
  }, [started, challenge.stage]);

  if (challenge.storageStatus === "loading")
    return <p role="status">Đang khôi phục tiến trình thử thách…</p>;

  return (
    <div className={`engineering-challenge${started ? " engineering-challenge--active" : ""}`}>
      <Toaster
        position="top-center"
        theme="light"
        closeButton
        containerAriaLabel="Thông báo"
        toastOptions={{ className: "challenge-toast", closeButtonAriaLabel: "Đóng thông báo" }}
      />
      <Link className="back-to-home" href="/#thu-thach">
        <ArrowLeft className="inline-icon" aria-hidden="true" /> Về danh sách thử thách STEM
      </Link>
      {started ? (
        <div className="challenge-workflow-header">
          <div>
            <div className="case-label">THỬ THÁCH STEM 01</div>
            <h1>Thiết kế đường dốc an toàn</h1>
          </div>
          <div className="challenge-attempt-budget" role="status">
            <strong>
              {challenge.attempts.length}/{challengeConfig.maxAttempts}
            </strong>
            <span>lần thử chính thức đã dùng</span>
            <small>
              Còn {Math.max(0, challengeConfig.maxAttempts - challenge.attempts.length)} lần thử
            </small>
          </div>
        </div>
      ) : (
        <div className="challenge-guide-header">
          <div className="case-label">THỬ THÁCH STEM 01</div>
          <h1>Thiết kế đường dốc an toàn</h1>
        </div>
      )}
      {started && (
        <ChallengeProgress
          completed={challenge.stage === "completed"}
          active={
            challenge.stage === "review" ||
            challenge.stage === "reflection" ||
            challenge.stage === "completed"
              ? "completion"
              : challenge.stage === "intro"
                ? undefined
                : challenge.stage === "testing"
                  ? "experiment"
                  : challenge.stage === "results"
                    ? "analysis"
                    : challenge.stage
          }
        />
      )}
      <div className={`challenge-layout${!started ? " challenge-layout--briefing" : ""}`}>
        <div className="challenge-workspace">
          {!started ? (
            <ChallengeIntroduction onStart={challenge.start} />
          ) : (
            <>
              <h2 ref={designHeading} tabIndex={-1} className="challenge-design-heading">
                {challenge.stage === "completed"
                  ? "Hoàn thành thử thách"
                  : finalStage
                    ? "Hoàn thiện phương án"
                    : challenge.stage === "testing"
                      ? "Quan sát chuyển động của xe"
                      : challenge.stage === "review"
                        ? "Xem lại bằng chứng"
                        : challenge.stage === "improvement"
                          ? "Kế hoạch cải tiến"
                          : challenge.stage === "results"
                            ? "Phân tích kết quả"
                            : challenge.stage === "prediction"
                              ? "Dự đoán chuyển động"
                              : "Thiết kế phương án"}
              </h2>
              {finalStage ? (
                <p>
                  {challenge.stage === "completed"
                    ? "Nhóm đã hoàn thành một chu trình thiết kế kĩ thuật: từ dự đoán, thử nghiệm và thu thập bằng chứng đến cải tiến và bảo vệ phương án."
                    : "Nhóm đã hoàn thành chu trình thử nghiệm. Hãy xem lại bằng chứng trong Sổ tay kỹ sư và lựa chọn phương án mà nhóm muốn đề xuất."}
                </p>
              ) : (
                <>
                  <p>
                    {challenge.stage === "design"
                      ? "Chọn các yếu tố thiết kế và quan sát đường dốc bên cạnh. Nhóm muốn kiểm chứng điều gì?"
                      : challenge.stage === "prediction"
                        ? "Đưa ra dự đoán cho phương án đang chọn và giải thích bằng kiến thức Vật lí."
                        : challenge.stage === "testing"
                          ? "Quan sát xe đi xuống dốc. Chờ xe dừng để thu thập bằng chứng."
                          : challenge.stage === "results"
                            ? "Đối chiếu số đo với tiêu chí và dự đoán. Bằng chứng cho thấy điều gì?"
                            : "Từ kết quả vừa quan sát, chọn điều nhóm muốn kiểm tra trong lần thử tiếp theo."}
                  </p>
                  <p className="challenge-current-attempt">
                    {challenge.stage === "design" ? "Chuẩn bị lần thử" : "Lần thử"}{" "}
                    {Math.min(
                      challengeConfig.maxAttempts,
                      challenge.attempts.length +
                        (["design", "prediction"].includes(challenge.stage) ? 1 : 0),
                    )}{" "}
                    / {challengeConfig.maxAttempts}
                  </p>
                  {challenge.stage !== "design" && <DesignSummary design={challenge.design} />}
                  <div
                    className={`challenge-apparatus-layout${challenge.stage === "design" ? " is-designing" : challenge.stage === "prediction" ? " is-predicting" : challenge.stage === "results" || challenge.stage === "improvement" ? " is-reviewing" : ""}`}
                  >
                    {challenge.stage === "design" && (
                      <DesignControls design={challenge.design} onChange={challenge.changeDesign} />
                    )}
                    {challenge.stage === "prediction" && (
                      <PredictionPanel
                        prediction={challenge.prediction}
                        dispatch={challenge.dispatch}
                      />
                    )}
                    {challenge.stage === "results" && challenge.currentAttempt && (
                      <ExperimentResult
                        attempt={challenge.currentAttempt}
                        count={challenge.attempts.length}
                        dispatch={challenge.dispatch}
                      />
                    )}
                    {challenge.stage === "improvement" && (
                      <IterationReflection
                        decision={challenge.improvement}
                        dispatch={challenge.dispatch}
                      />
                    )}
                    <RampPreview
                      key={challenge.currentAttempt?.id ?? "design"}
                      design={challenge.design}
                      evidence={
                        ["testing", "results", "improvement"].includes(challenge.stage)
                          ? challenge.currentAttempt?.evidence
                          : undefined
                      }
                      testing={challenge.stage === "testing"}
                      onComplete={challenge.finishExperiment}
                    />
                  </div>
                  {challenge.stage === "design" && (
                    <>
                      {challenge.currentAttempt && (
                        <DesignComparison
                          previous={challenge.currentAttempt.design}
                          current={challenge.design}
                        />
                      )}
                      <div className="challenge-next-action">
                        <button
                          className="primary"
                          onClick={() => challenge.dispatch({ type: "predict" })}
                        >
                          Tiếp tục dự đoán <ArrowRight className="inline-icon" aria-hidden="true" />
                        </button>
                      </div>
                    </>
                  )}
                  {challenge.stage === "testing" && challenge.prediction.safe !== null && (
                    <aside className="challenge-prediction-summary" aria-label="Dự đoán của nhóm">
                      <strong>Dự đoán của nhóm</strong>
                      <p>
                        {challenge.prediction.safe
                          ? "Xe sẽ dừng trong vùng an toàn."
                          : "Xe sẽ không dừng trong vùng an toàn."}
                      </p>
                      <p className="student-reason">{challenge.prediction.explanation}</p>
                    </aside>
                  )}
                  {challenge.stage === "testing" && (
                    <p role="status">
                      Đang thử nghiệm thiết kế… Quan sát xe đi xuống dốc và vùng dừng.
                    </p>
                  )}
                  <p className="challenge-phase-note">
                    Mô hình chất điểm, g = 10 m/s², khối lượng xe 2 kg. Ma sát không đổi trên dốc và
                    vùng dừng; bỏ qua năng lượng quay, lực cản không khí và tổn hao ở chỗ nối. Nếu
                    trọng lực không thắng ma sát trong mô hình, xe đứng yên. Kết quả có thể khác xe
                    thật.
                  </p>
                </>
              )}
            </>
          )}
        </div>
        {started && <ChallengeCriteria />}
      </div>
      {started && <EngineeringNotebook state={challenge} dispatch={challenge.dispatch} />}
      <p className="challenge-storage-status" role="status">
        {challenge.storageStatus === "unavailable"
          ? "Không thể lưu trên trình duyệt này. Tiến trình chỉ được giữ trong phiên hiện tại; tải lại trang có thể mất dữ liệu."
          : challenge.storageStatus === "invalid"
            ? "Dữ liệu đã lưu không hợp lệ hoặc không tương thích. Đã mở chu trình mới; tiến trình mới được lưu trên trình duyệt này."
            : "Tiến trình được lưu trên trình duyệt này."}
      </p>
      {started && (
        <section
          className="challenge-panel challenge-connections"
          aria-labelledby="challenge-connections-title"
        >
          <h2 id="challenge-connections-title">Kết nối với các vấn đề khám phá</h2>
          <p>
            Chưa chắc về ma sát?{" "}
            <Link href="/kham-pha/chiec-xe-truot-xa" target="_blank" rel="noopener">
              Khám phá “Chiếc xe trượt xa” (mở thẻ mới)
            </Link>
            .
          </p>
          <p>
            Muốn hiểu vì sao độ cao ảnh hưởng đến vận tốc?{" "}
            <Link href="/kham-pha/nang-luong-tren-doc" target="_blank" rel="noopener">
              Khám phá “Năng lượng trên dốc” (mở thẻ mới)
            </Link>
            .
          </p>
          <p>Mở bài khám phá trong thẻ mới rồi quay lại thử thách để tiếp tục thiết kế.</p>
        </section>
      )}
      <ChallengeReset
        hasAttempts={started || challenge.attempts.length > 0}
        disabled={challenge.stage === "testing"}
        completed={challenge.stage === "completed"}
        onReset={() => challenge.dispatch({ type: "reset" })}
      />
    </div>
  );
}
