"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Ruler, FlaskConical } from "lucide-react";
import { challengeConfig } from "@/lib/challenge-config";
import { ChallengeProgress } from "./challenge-progress";

function BriefingHeading({ number, title, id }: { number: string; title: string; id?: string }) {
  return (
    <h2 className="briefing-heading" id={id}>
      <span className="briefing-section-number">{number}</span>
      <span>{title}</span>
    </h2>
  );
}

export function ChallengeIntroduction({ onStart }: { onStart: () => void }) {
  const [acknowledged, setAcknowledged] = useState(false);
  const acknowledgmentId = useId();
  return (
    <article className="challenge-briefing" aria-label="Bản hướng dẫn nhiệm vụ thiết kế">
      <section className="briefing-section">
        <BriefingHeading number="01" title="Tình huống thực tiễn" />
        <p>
          Một khu vui chơi cần đường dốc đưa xe mô hình từ vị trí xuất phát đến khu vực đón xe. Nếu
          xe dừng quá sớm hoặc trượt quá xa, đường dốc chưa đáp ứng nhu cầu sử dụng. Làm thế nào để
          thiết kế một hành trình an toàn?
        </p>
      </section>
      <section className="briefing-section briefing-mission">
        <BriefingHeading number="02" title="Nhiệm vụ thiết kế" />
        <p>
          Nhóm em thiết kế đường dốc: chọn <strong>độ cao, góc nghiêng và bề mặt</strong> phù hợp.
          Đề xuất phương án và giải thích lựa chọn bằng kiến thức Vật lí.
        </p>
      </section>
      <section className="briefing-section briefing-requirements">
        <BriefingHeading number="03" title="Tiêu chí và ràng buộc" />
        <div className="briefing-criteria-grid">
          <div className="briefing-criterion">
            <h3>
              <Ruler size={20} aria-hidden="true" />
              Tiêu chí thành công
            </h3>
            <p>
              Xe phải <strong>đi xuống hết đường dốc</strong> và dừng trong vùng an toàn.
            </p>
            <div className="briefing-number">
              {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} <span>cm</span>
            </div>
            <p className="briefing-measurement">
              Quãng đường dừng được đo <strong>từ chân dốc</strong>.
            </p>
          </div>
          <div className="briefing-criterion briefing-rules">
            <h3>
              <FlaskConical size={20} aria-hidden="true" />
              Quy tắc thử nghiệm
            </h3>
            <div className="briefing-number">
              {challengeConfig.maxAttempts} <span>lần thử chính thức tối đa</span>
            </div>
            <p>
              Ghi dự đoán trước khi thử; sau mỗi lần thử, thu thập số liệu và phân tích kết quả để
              quyết định giữ nguyên hay cải tiến thiết kế.
            </p>
          </div>
        </div>
        <p className="briefing-evidence-note">
          <strong>Bằng chứng để phân tích:</strong> vận tốc tại chân dốc và quãng đường dừng. Vận
          tốc không phải tiêu chí thành công độc lập.
        </p>
      </section>
      <section className="briefing-section">
        <BriefingHeading number="04" title="Kiến thức cần vận dụng" />
        <ul className="briefing-knowledge">
          <li>
            <strong>Thế năng và động năng:</strong> năng lượng của xe thay đổi thế nào khi xuống
            dốc?
          </li>
          <li>
            <strong>Góc nghiêng và chuyển động:</strong> điều gì ảnh hưởng đến việc xe bắt đầu đi và
            đến chân dốc?
          </li>
          <li>
            <strong>Ma sát:</strong> bề mặt ảnh hưởng thế nào đến vận tốc và quãng đường dừng?
          </li>
        </ul>
        <p className="briefing-resource-links">
          Ôn lại qua{" "}
          <Link href="/kham-pha/chiec-xe-truot-xa" target="_blank" rel="noopener">
            Chiếc xe trượt xa (thẻ mới)
          </Link>{" "}
          hoặc{" "}
          <Link href="/kham-pha/nang-luong-tren-doc" target="_blank" rel="noopener">
            Năng lượng trên dốc (thẻ mới)
          </Link>
          .
        </p>
      </section>
      <section className="briefing-section">
        <BriefingHeading number="05" title="Quy trình thực hiện" />
        <p>
          Phương án đầu tiên chưa cần hoàn hảo. Qua các bước dưới đây, nhóm sẽ kiểm chứng ý tưởng,
          chọn phương án đề xuất và viết báo cáo bảo vệ lựa chọn bằng số liệu.
        </p>
        <ChallengeProgress compact />
        <p className="briefing-prototype">
          <strong>Mở rộng tùy chọn:</strong> khi có vật liệu trong lớp, nhóm có thể chế tạo nguyên
          mẫu để so sánh với mô phỏng. Hoạt động này không tính vào số lần thử chính thức và không
          bắt buộc để hoàn thành phần trực tuyến.
        </p>
      </section>
      <section className="briefing-start" aria-labelledby="briefing-start-title">
        <BriefingHeading number="06" title="Bắt đầu thiết kế" id="briefing-start-title" />
        <label className="briefing-acknowledgment" htmlFor={acknowledgmentId}>
          <input
            id={acknowledgmentId}
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.currentTarget.checked)}
          />
          <span>Em đã đọc nhiệm vụ, tiêu chí thiết kế và quy tắc thử nghiệm.</span>
        </label>
        <button
          type="button"
          className="primary"
          disabled={!acknowledged}
          onClick={() => {
            if (acknowledged) onStart();
          }}
        >
          Bắt đầu thiết kế <ArrowRight size={20} aria-hidden="true" />
        </button>
      </section>
    </article>
  );
}
