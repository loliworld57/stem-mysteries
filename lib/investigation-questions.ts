import type { QuizQuestion } from "./quiz";

export const brakingQuestions: QuizQuestion[] = [
  {
    topic: "Thiết kế phép so sánh",
    question:
      "Muốn kiểm tra riêng ảnh hưởng của bề mặt đến quãng đường phanh, em cần chọn cặp thí nghiệm nào? Cả hai lần dùng cùng xe 2 kg và cùng khóa bánh khi phanh.",
    options: [
      "Cao su và băng đều ở 14,4 km/h; so sánh quãng đường dừng.",
      "Cao su ở 7,2 km/h và băng ở 14,4 km/h; so sánh quãng đường dừng.",
      "Cao su ở 14,4 km/h và băng ở 7,2 km/h; so sánh thời gian dừng.",
      "Gỗ ở 7,2 km/h và băng ở 21,6 km/h; so sánh quãng đường dừng.",
    ],
    correct: 0,
  },
  {
    topic: "Vận tốc và quãng đường phanh",
    question:
      "Trên cùng mặt gỗ, chạy xe ở 7,2 km/h rồi 14,4 km/h. Giữ nguyên khối lượng, cách phanh và lực ma sát trong mô hình. Nếu lần đầu xe trượt khoảng 0,57 m rồi dừng, dự đoán nào phù hợp với lần thứ hai?",
    options: [
      "Động năng tăng 2 lần; quãng đường phanh khoảng 1,14 m.",
      "Động năng tăng 4 lần; quãng đường phanh khoảng 1,14 m.",
      "Động năng tăng 2 lần; quãng đường phanh khoảng 2,28 m.",
      "Động năng tăng 4 lần; quãng đường phanh khoảng 2,28 m.",
    ],
    correct: 3,
  },
  {
    topic: "Ma sát và năng lượng chuyển hóa",
    question:
      "Cùng xe 2 kg, cùng vận tốc 14,4 km/h: xe dừng sau khoảng 1,23 m trên cao su và 8,00 m trên băng. Đường nằm ngang, chọn mặt đường làm mốc thế năng. Trong mô hình chỉ xét ma sát trượt, nhận định nào đúng khi cả hai xe đã dừng?",
    options: [
      "Xe trên băng giảm nhiều cơ năng hơn vì trượt xa hơn; lực ma sát trên băng nhỏ hơn.",
      "Cả hai cùng giảm 16 J cơ năng; lực ma sát trên cao su lớn hơn nên xe dừng trên quãng đường ngắn hơn.",
      "Xe trên cao su giảm nhiều cơ năng hơn vì lực ma sát lớn hơn; cả hai đều dừng lại.",
      "Cả hai cùng giảm 16 J cơ năng; lực ma sát bằng nhau vì vận tốc ban đầu bằng nhau.",
    ],
    correct: 1,
  },
];

export const rampQuestions: QuizQuestion[] = [
  {
    topic: "Năng lượng tại một vị trí trên dốc",
    question:
      "Thả xe 2 kg từ trạng thái đứng yên ở độ cao 4 m trên dốc không ma sát. Chọn mặt đất làm mốc thế năng, g = 10 m/s². Khi xe xuống đến độ cao 1 m, bộ giá trị (thế năng; động năng; cơ năng) nào phù hợp?",
    options: [
      "(20 J; 20 J; 40 J).",
      "(60 J; 20 J; 80 J).",
      "(20 J; 60 J; 80 J).",
      "(20 J; 80 J; 100 J).",
    ],
    correct: 2,
  },
  {
    topic: "Dự đoán từ độ cao thả xe",
    question:
      "Thả cùng xe từ trạng thái đứng yên ở độ cao 1 m rồi 4 m trên dốc không ma sát. Cả hai lần đều đo ở chân dốc với cùng mốc thế năng. So với lần thả từ 1 m, lần thả từ 4 m có động năng và vận tốc ở chân dốc thay đổi thế nào?",
    options: [
      "Động năng gấp 4 lần; vận tốc gấp 4 lần.",
      "Động năng gấp 4 lần; vận tốc gấp 2 lần.",
      "Động năng gấp 2 lần; vận tốc gấp 2 lần.",
      "Động năng gấp 2 lần; vận tốc gấp 4 lần.",
    ],
    correct: 1,
  },
  {
    topic: "Kiểm tra mô hình bằng số liệu",
    question:
      "Thả xe 2 kg từ trạng thái đứng yên ở độ cao 2 m. Một lần đo trên dốc thực cho thấy ở độ cao 1 m, động năng chỉ đạt 12 J. Dùng mặt đất làm mốc thế năng và g = 10 m/s². Nếu số đo chính xác và bỏ qua năng lượng quay, kết luận nào phù hợp khi so với mô hình dốc không ma sát?",
    options: [
      "Cơ năng còn 12 J; toàn bộ thế năng ban đầu đã chuyển thành động năng.",
      "Cơ năng vẫn là 40 J; thế năng ở vị trí đo phải bằng 28 J.",
      "Cơ năng còn 32 J; độ giảm cơ năng là 12 J.",
      "Cơ năng còn 32 J; 8 J đã chuyển sang dạng năng lượng khác, nên mô hình không ma sát chưa phù hợp với lần đo này.",
    ],
    correct: 3,
  },
];
