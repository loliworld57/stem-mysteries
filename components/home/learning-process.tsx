const steps = [
  { title: "Gặp một bí ẩn", text: "Đọc tình huống và đặt câu hỏi." },
  { title: "Tìm bằng chứng", text: "Quan sát và khám phá các manh mối." },
  { title: "Tự thử nghiệm", text: "Thay đổi điều kiện, đo và so sánh kết quả." },
  { title: "Giải thích kết quả", text: "Đưa ra giả thuyết và rút ra kiến thức." },
];

export function LearningProcess() {
  return (
    <section className="home-section process-section" aria-labelledby="process-title">
      <div className="eyebrow">Em sẽ học như thế nào?</div>
      <h2 id="process-title" className="section-title">
        Từ tò mò đến hiểu biết.
      </h2>
      <p className="section-description">
        Không chỉ đọc kiến thức. Em được quan sát, thử nghiệm và tự kiểm chứng suy luận của mình.
      </p>
      <ol className="process-grid">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="process-number">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
