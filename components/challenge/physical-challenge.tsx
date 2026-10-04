import type { ChallengeAttempt, PhysicalValidation } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";
import { hasMeaningfulReason, isPhysicalReady } from "@/lib/challenge-state";
import { formatNumber } from "@/lib/format";

export function PhysicalChallenge({
  attempt,
  validation,
  dispatch,
}: {
  attempt: ChallengeAttempt;
  validation: PhysicalValidation;
  dispatch: (action: ChallengeAction) => void;
}) {
  function update(patch: Partial<PhysicalValidation>) {
    dispatch({ type: "physical", validation: { ...validation, ...patch } });
  }
  return (
    <section className="challenge-panel challenge-controls" aria-labelledby="physical-title">
      <h2 id="physical-title">Thử thách ngoài đời thật</h2>
      <p>
        Mô phỏng giúp nhóm dự đoán và thử nghiệm nhanh nhiều phương án. Bây giờ, hãy kiểm tra xem
        phương án đó có hoạt động tương tự với một mô hình thật hay không.
      </p>
      <p>
        Hoạt động này thực hiện khi có vật liệu trong lớp, không phải lần thử mô phỏng thứ sáu và
        không bắt buộc để hoàn thành phần trực tuyến.
      </p>
      <h3>Chế tạo</h3>
      <p>
        Dùng bìa carton hoặc tấm xốp, xe đồ chơi, thước đo, băng dính và vật liệu tạo các bề mặt
        khác nhau. Làm dốc gần với phương án đã chọn: cao {attempt.design.heightCm} cm, góc{" "}
        {attempt.design.angleDeg}°. Đánh dấu vùng 10–30 cm từ chân dốc.
      </p>
      <h3>Dự đoán</h3>
      <label htmlFor="physical-prediction">
        Nhóm dự đoán mô hình thật sẽ cho kết quả giống hay khác mô phỏng? Vì sao?
      </label>
      <textarea
        id="physical-prediction"
        rows={3}
        maxLength={2000}
        value={validation.prediction}
        disabled={validation.predictionSubmitted}
        onChange={(event) => update({ prediction: event.target.value })}
      />
      {!validation.predictionSubmitted && (
        <button
          className="secondary"
          disabled={!hasMeaningfulReason(validation.prediction)}
          onClick={() => dispatch({ type: "submit-physical-prediction" })}
        >
          Lưu dự đoán trước khi đo
        </button>
      )}
      {validation.predictionSubmitted && (
        <>
          <h3>Thử nghiệm</h3>
          <p>
            Thả xe từ trạng thái đứng yên, không đẩy xe. Dùng thước đo quãng đường từ chân dốc tới
            nơi xe dừng. Nếu xe chưa xuống hết dốc, ghi rõ trong phần so sánh.
          </p>
          <h3>So sánh</h3>
          <p>
            Quãng đường dừng trong mô phỏng:{" "}
            {attempt.evidence.reachesRampBottom
              ? `${formatNumber(attempt.evidence.stoppingDistanceCm, 1)} cm`
              : "Xe không đến chân dốc; không có quãng đường dừng trên đoạn ngang."}
          </p>
          <label htmlFor="physical-distance">Quãng đường dừng của mô hình thật (cm)</label>
          <input
            id="physical-distance"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={validation.measuredStoppingDistanceCm ?? ""}
            disabled={validation.submitted}
            onChange={(event) => {
              const value = event.target.valueAsNumber;
              if (event.target.value === "") update({ measuredStoppingDistanceCm: null });
              else if (Number.isFinite(value) && value >= 0)
                update({ measuredStoppingDistanceCm: value });
            }}
          />
          <label htmlFor="physical-comparison">Hai kết quả giống và khác nhau như thế nào?</label>
          <textarea
            id="physical-comparison"
            rows={3}
            maxLength={2000}
            value={validation.comparison}
            disabled={validation.submitted}
            onChange={(event) => update({ comparison: event.target.value })}
          />
          <label htmlFor="physical-limitations">
            Theo nhóm, vì sao mô hình thật có thể cho kết quả khác mô phỏng?
          </label>
          <textarea
            id="physical-limitations"
            rows={3}
            maxLength={2000}
            value={validation.modelLimitationsReasoning}
            disabled={validation.submitted}
            onChange={(event) => update({ modelLimitationsReasoning: event.target.value })}
          />
          <p>Ghi nhận xét ngắn, ít nhất 10 ký tự cho mỗi câu giải thích.</p>
          {!validation.submitted ? (
            <button
              className="primary"
              disabled={!isPhysicalReady(validation)}
              onClick={() => dispatch({ type: "submit-physical" })}
            >
              Lưu so sánh mô hình thật
            </button>
          ) : (
            <>
              <p role="status">Đã ghi kết quả kiểm chứng mô hình thật.</p>
              <p>
                Mô phỏng sử dụng một mô hình đơn giản hóa. Trong thực tế, chuyển động còn có thể
                chịu ảnh hưởng của bánh xe, độ không đều của bề mặt, sai số đo, lực cản không khí và
                nhiều yếu tố khác.
              </p>
            </>
          )}
        </>
      )}
    </section>
  );
}
