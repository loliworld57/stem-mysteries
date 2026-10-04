import { ArrowRight, ArrowDown, CircleDot, Sparkles } from "lucide-react";
import Link from "next/link";
import { LearningIllustration } from "./learning-illustration";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div>
        <div className="eyebrow">Góc khám phá dành cho học sinh lớp 9</div>
        <h1 id="home-title">
          Mỗi bí ẩn là
          <br />
          một cơ hội <em>khám phá.</em>
        </h1>
        <p>
          Vì sao xe trượt xa? Năng lượng chuyển đi đâu? Cùng tìm câu trả lời bằng quan sát, thí
          nghiệm và suy luận của chính em.
        </p>
        <div className="home-hero-actions">
          <Link className="primary cta" href="#bi-an">
            Khám phá các bí ẩn <ArrowRight className="inline-icon" aria-hidden="true" />
          </Link>
          <Link className="text-link" href="#stem">
            Tìm hiểu STEM <ArrowDown className="inline-icon" aria-hidden="true" />
          </Link>
        </div>
        <div className="tags">
          <span>
            <CircleDot className="inline-icon" aria-hidden="true" /> Học qua trải nghiệm
          </span>
          <span>
            <Sparkles className="inline-icon" aria-hidden="true" /> Cùng cả lớp khám phá
          </span>
        </div>
      </div>
      <LearningIllustration />
    </section>
  );
}
