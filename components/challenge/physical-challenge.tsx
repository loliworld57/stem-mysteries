import { checkRequiredFields } from "./submit-feedback";
import type { ChallengeAttempt, PhysicalValidation } from "@/lib/challenge-types";
import type { ChallengeAction } from "@/lib/challenge-state";
import { hasMeaningfulReason } from "@/lib/challenge-state";
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
        placeholder="Gợi ý: nhóm nghĩ kết quả sẽ giống hay khác? Vì sao?"
        rows={3}
        maxLength={2000}
        value={validation.prediction}
        disabled={validation.predictionSubmitted}
        onChange={(event) => update({ prediction: event.target.value })}
      />
      {!validation.predictionSubmitted && (
        <button
          className="secondary"
          onClick={() => {
            if (
              checkRequiredFields([
                {
                  valid: hasMeaningfulReason(validation.prediction),
                  message: "Ghi ngắn gọn dự đoán về mô hình thật và lí do.",
                  selector: "#physical-prediction",
                },
              ])
            )
              dispatch({ type: "submit-physical-prediction" });
          }}
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
            placeholder="Gợi ý: hai quãng đường dừng chênh lệch bao nhiêu, hoặc giống nhau ở đâu?"
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
            placeholder="Gợi ý: điều kiện nào khi làm mô hình thật có thể khác lúc mô phỏng?"
            rows={3}
            maxLength={2000}
            value={validation.modelLimitationsReasoning}
            disabled={validation.submitted}
            onChange={(event) => update({ modelLimitationsReasoning: event.target.value })}
          />
          <p>
            Mỗi phần chỉ cần một ý ngắn. Gợi ý: đối chiếu hai số đo và nêu điều nhóm muốn kiểm tra
            thêm.
          </p>
          {!validation.submitted ? (
            <button
              className="primary"
              onClick={() => {
                if (
                  checkRequiredFields([
                    {
                      valid:
                        validation.measuredStoppingDistanceCm !== null &&
                        Number.isFinite(validation.measuredStoppingDistanceCm) &&
                        validation.measuredStoppingDistanceCm >= 0,
                      message: "Nhập quãng đường dừng đo được bằng cm, từ 0 trở lên.",
                      selector: "#physical-distance",
                    },
                    {
                      valid: hasMeaningfulReason(validation.comparison),
                      message: "Ghi một ý về điểm giống hoặc khác giữa hai kết quả.",
                      selector: "#physical-comparison",
                    },
                    {
                      valid: hasMeaningfulReason(validation.modelLimitationsReasoning),
                      message: "Ghi một ý về điều có thể khiến mô hình thật khác mô phỏng.",
                      selector: "#physical-limitations",
                    },
                  ])
                )
                  dispatch({ type: "submit-physical" });
              }}
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
