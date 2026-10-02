import Link from "next/link";
import { MysteryScene } from "@/components/mystery/mystery-scene";
import { EnergyRamp } from "@/components/energy/energy-ramp";

export function MysteryCatalog() {
  return (
    <section id="bi-an" className="home-section catalog-section" aria-labelledby="catalog-title">
      <div className="eyebrow">Sẵn sàng làm nhà điều tra?</div>
      <h2 id="catalog-title" className="section-title">
        Chọn một bí ẩn để khám phá.
      </h2>
      <p className="section-description">
        Mỗi bài có tình huống, thí nghiệm và bộ câu hỏi riêng để em tự tìm ra lời giải.
      </p>
      <div className="mystery-catalog-grid">
        <article className="mystery-card">
          <MysteryScene />
          <div className="mystery-card-copy">
            <div className="case-label">BÍ ẨN 001 · VẬT LÍ LỚP 9</div>
            <h3>Chiếc xe trượt xa</h3>
            <p>
              Các xe có cùng vận tốc và cùng phanh. Vì sao xe trên băng lại trượt xa hơn xe trên cao
              su?
            </p>
            <ul className="topic-tags">
              <li>Ma sát</li>
              <li>Động năng</li>
              <li>Quãng đường phanh</li>
            </ul>
            <div className="mystery-meta">1 thí nghiệm · 3 câu hỏi suy luận khoa học</div>
            <Link className="primary cta" href="/kham-pha/chiec-xe-truot-xa">
              Bắt đầu khám phá →
            </Link>
          </div>
        </article>
        <article className="mystery-card">
          <div className="scene">
            <div className="scene-top">DỐC KHÔNG MA SÁT</div>
            <EnergyRamp height={2} progress={0} currentHeight={2} kinetic={0} potential={40} />
            <div className="scene-footer">Từ độ cao đến vận tốc</div>
          </div>
          <div className="mystery-card-copy">
            <div className="case-label">BÍ ẨN 002 · VẬT LÍ LỚP 9</div>
            <h3>Năng lượng trên dốc</h3>
            <p>
              Thả xe từ các độ cao khác nhau. Thế năng chuyển thành động năng thế nào và vận tốc ở
              chân dốc thay đổi ra sao?
            </p>
            <ul className="topic-tags">
              <li>Thế năng</li>
              <li>Động năng</li>
              <li>Bảo toàn cơ năng</li>
            </ul>
            <div className="mystery-meta">1 thí nghiệm · 3 câu hỏi suy luận khoa học</div>
            <Link className="primary cta" href="/kham-pha/nang-luong-tren-doc">
              Bắt đầu khám phá →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
