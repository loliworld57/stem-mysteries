import { StemIcon } from "./stem-icon";

export function LearningIllustration() {
  return (
    <div
      className="learning-illustration"
      aria-label="Bốn lĩnh vực STEM cùng giải quyết một câu hỏi"
      role="img"
    >
      <div className="illustration-grid" aria-hidden="true" />
      <div className="illustration-orbit" aria-hidden="true" />
      <div className="illustration-center">
        <span>?</span>
        <strong>Vì sao nhỉ?</strong>
      </div>
      <div className="illustration-topic science">
        <StemIcon type="science" />
        <strong>Khoa học</strong>
      </div>
      <div className="illustration-topic technology">
        <StemIcon type="technology" />
        <strong>Công nghệ</strong>
      </div>
      <div className="illustration-topic engineering">
        <StemIcon type="engineering" />
        <strong>Kỹ thuật</strong>
      </div>
      <div className="illustration-topic mathematics">
        <StemIcon type="mathematics" />
        <strong>Toán học</strong>
      </div>
      <div className="illustration-caption">Một câu hỏi. Nhiều cách khám phá.</div>
    </div>
  );
}
