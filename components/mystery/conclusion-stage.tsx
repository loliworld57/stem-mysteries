import type { StageProps } from "./types";
interface ConclusionStageProps extends StageProps {
  onRestart: () => void;
}
export function ConclusionStage({ headingRef, onNavigate, onRestart }: ConclusionStageProps) {
  return (
    <section className="conclusion">
      <div className="solved">✓</div>
      <div className="eyebrow">Cả lớp đã khám phá rất tốt!</div>
      <h1 ref={headingRef} tabIndex={-1}>
        Đã tìm ra lời giải!
      </h1>
      <p className="lead">Ma sát nhỏ hơn. Xe trượt xa hơn.</p>
      <p>
        Trong mô hình, mặt băng có ma sát trượt nhỏ hơn cao su khô. Cùng vận tốc ban đầu, xe B mất
        nhiều thời gian hơn để dừng và trượt xa hơn.
      </p>
      <div className="learning-grid">
        <div>
          <span>01 · ĐỘNG NĂNG</span>
          <h2>Xe chuyển động có động năng.</h2>
          <p>Khi phanh, ma sát làm động năng giảm và chuyển thành nội năng của xe và mặt đường.</p>
        </div>
        <div>
          <span>02 · THẾ NĂNG</span>
          <h2>Chọn mốc độ cao rõ ràng.</h2>
          <p>
            Lấy mặt đường ngang làm mốc: h = 0 m, thế năng trọng trường bằng 0 J trong mô hình chất
            điểm.
          </p>
        </div>
        <div>
          <span>03 · CƠ NĂNG</span>
          <h2>Cơ năng có bảo toàn không?</h2>
          <p>
            Khi phanh trên đường ngang, thế năng không đổi và động năng giảm. Cơ năng chuyển dần
            thành nội năng do ma sát.
          </p>
        </div>
      </div>
      <details>
        <summary>Xem công thức và giả thiết →</summary>
        <p>
          Động năng Wđ = ½mv²; thế năng trọng trường Wt = mgh; cơ năng W = Wđ + Wt. Khi thay số: m
          dùng kg, v dùng m/s, h dùng m, năng lượng dùng J. Đổi v từ km/h sang m/s bằng cách chia
          cho 3,6. Lấy g = 10 m/s². Quãng đường phanh s = v²/(2μg); hệ số minh họa: cao su 0,65, gỗ
          0,35, băng 0,10. Bỏ qua chuyển động quay của bánh xe.
        </p>
      </details>
      <div className="conclusion-actions mt-8">
        <button className="primary" onClick={() => onNavigate(2)}>
          Tiếp tục thí nghiệm →
        </button>
        <button className="secondary" onClick={onRestart}>
          ↺ Khám phá lại từ đầu
        </button>
      </div>
    </section>
  );
}
