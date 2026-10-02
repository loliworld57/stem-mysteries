const pillars = [
  {
    letter: "S",
    title: "Khoa học",
    example: "Quan sát và giải thích hiện tượng.",
    question: "Vì sao xe chuyển động rồi dừng lại?",
    color: "science",
  },
  {
    letter: "T",
    title: "Công nghệ",
    example: "Dùng công cụ để tìm hiểu thế giới.",
    question: "Mô phỏng giúp em đo được điều gì?",
    color: "technology",
  },
  {
    letter: "E",
    title: "Kỹ thuật",
    example: "Thiết kế, thử nghiệm và cải tiến.",
    question: "Chọn bề mặt nào để xe dừng sớm hơn?",
    color: "engineering",
  },
  {
    letter: "M",
    title: "Toán học",
    example: "Đo đạc, tính toán và so sánh.",
    question: "Động năng thay đổi thế nào khi xe nhanh hơn?",
    color: "mathematics",
  },
];

export function StemIntroduction() {
  return (
    <section id="stem" className="home-section stem-section" aria-labelledby="stem-title">
      <div className="stem-heading">
        <div>
          <div className="eyebrow">Bốn lĩnh vực, một cách học</div>
          <h2 id="stem-title" className="section-title">
            STEM là gì?
          </h2>
          <p className="stem-tagline">
            Kết nối kiến thức.
            <br />
            Khám phá thế giới.
          </p>
        </div>
        <div className="stem-definition">
          <span className="definition-label">HỌC ĐỂ HIỂU, THỬ ĐỂ BIẾT</span>
          <p>
            STEM kết hợp <strong>Khoa học, Công nghệ, Kỹ thuật và Toán học</strong> để giải quyết
            vấn đề thực tế.
          </p>
          <p>Ở đây, em sẽ đặt câu hỏi, tự thử nghiệm và dùng bằng chứng để tìm lời giải.</p>
        </div>
      </div>
      <div className="stem-grid">
        {pillars.map((pillar) => (
          <article className={`stem-card ${pillar.color}`} key={pillar.letter}>
            <span className="stem-letter" aria-hidden="true">
              {pillar.letter}
            </span>
            <h3>{pillar.title}</h3>
            <p>{pillar.example}</p>
            <div className="stem-example">{pillar.question}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
