# STEM Mysteries — Chiếc xe trượt xa

Website dùng theme xanh dương cố định (`color-scheme: only light`), không đổi theo chế độ sáng/tối của hệ thống.

Bài học tương tác cho học sinh lớp 9 về ma sát, động năng, thế năng trọng trường và cơ năng. Giao diện tiếng Việt, chữ lớn, có chế độ trình chiếu.

## Chạy dự án

Dùng Node.js 22.18 trở lên để chạy kiểm thử TypeScript trực tiếp. Trang chủ: http://localhost:3000. Bài học: http://localhost:3000/kham-pha/chiec-xe-truot-xa.

```bash
npm install
npm run dev
```

Mở http://localhost:3000. Bật **Chế độ trình chiếu**; có thể nhấn F11 để mở toàn màn hình.

## Kịch bản trình bày

1. Giới thiệu các xe có cùng khối lượng, vận tốc ban đầu và phanh. Hỏi vì sao xe trên băng trượt xa hơn.
2. Xem ba manh mối cùng cả lớp.
3. Thử cao su và băng ở cùng vận tốc 14,4 km/h. Quan sát quãng đường phanh và động năng giảm.
4. Bài dốc là một bài riêng tại /kham-pha/nang-luong-tren-doc. Thả xe từ độ cao 2 m và quan sát chuyển hóa năng lượng.
5. Hai bài khám phá độc lập: Chiếc xe trượt xa (/kham-pha/chiec-xe-truot-xa) và Năng lượng trên dốc (/kham-pha/nang-luong-tren-doc). Mỗi bài có một thí nghiệm và 3 câu hỏi suy luận riêng. Đáp án được lưu mà chưa chấm; trả lời đủ rồi nộp bài để xem điểm và các câu sai. Học sinh tự xem lại thí nghiệm để kiểm chứng, không có đáp án đúng hoặc lời giải trong bảng kết quả.

Sổ ghi giữ tám lần thử gần nhất trong phiên hiện tại. Tải lại trang hoặc bắt đầu lại sẽ xóa tiến trình. Toàn bộ mô phỏng chạy trong trình duyệt.

## Đơn vị và mô hình

- Hiển thị vận tốc bằng km/h; đổi sang m/s bằng cách chia cho 3,6 trước khi tính.
- Khối lượng: kg; độ cao và quãng đường: m; năng lượng: J (jun).
- Dùng dấu phẩy thập phân theo cách hiển thị tiếng Việt.
- Khối lượng xe cố định: 2 kg. Lấy g = 10 m/s² để thuận tiện cho bài tập.
- Động năng: Wđ = ½mv²; thế năng: Wt = mgh; cơ năng: W = Wđ + Wt.

### Phanh trên đường ngang

Bánh xe khóa, ma sát trượt không đổi, mặt đường làm mốc thế năng. Bỏ qua phản ứng của người lái và chuyển động quay của bánh xe.

Độ lớn gia tốc chậm dần a = μg; quãng đường phanh s = v²/(2a). Hệ số minh họa: cao su 0,65; gỗ 0,35; băng 0,10. Đây không phải số liệu đo cho vật liệu thực tế.

Ở 14,4 km/h (4 m/s), động năng ban đầu là 16 J; quãng đường phanh khoảng 1,23 m trên cao su, 2,29 m trên gỗ, 8,00 m trên băng. Cơ năng giảm và chuyển thành nội năng do ma sát.

### Dốc không ma sát

Xe được xem là chất điểm thả từ trạng thái đứng yên. Dốc có chiều dài hình chiếu ngang 8 m; độ cao chọn từ 1 đến 4 m. Bỏ qua ma sát, lực cản không khí và năng lượng quay; thí nghiệm kết thúc ở chân dốc.

Thế năng chuyển thành động năng, tổng cơ năng không đổi. Với độ cao thả 2 m, cơ năng là 40 J; ở chân dốc, thế năng bằng 0 J và động năng bằng 40 J. Hình vẽ dốc là minh họa, không cùng tỉ lệ với đường thử phanh.

## Cấu trúc dự án

- `app/page.tsx`: trang chủ dạng Server Component, ghép các phần giới thiệu.
- `app/layout.tsx`: layout gốc, metadata, font Be Vietnam Pro và khung trang dùng chung.
- `app/kham-pha/layout.tsx`: layout của khu khám phá.
- `app/kham-pha/chiec-xe-truot-xa/page.tsx`: route bài học, hiển thị component tương tác.
- `components/layout/`: header, footer, khung trang và chế độ trình chiếu.
- `components/home/`: lời giới thiệu, bốn lĩnh vực STEM, cách học và danh sách bí ẩn.
- `components/mystery/`: các bước khám phá, hình xe, đường thử, điều khiển và sổ kết quả.
- `components/energy/`: mô phỏng dốc và hình minh họa.
- `components/quiz/`: bảng chọn câu, nội dung câu hỏi và bảng điểm.
- `hooks/`: trạng thái hai mô phỏng và bài trả lời; giữ đáp án khi quay lại thí nghiệm.
- `lib/`: công thức vật lý, kiểu dữ liệu, định dạng số và nội dung câu hỏi.
- `styles/`: CSS theo nhóm trang chủ, bài học và năng lượng; CSS nền nằm ở `app/globals.css`.
- `tests/physics.test.mjs`: kiểm thử đổi đơn vị, quãng đường phanh và bảo toàn năng lượng.
- `public/fonts/`: font được phục vụ từ dự án, kèm giấy phép OFL.

### Nơi chỉnh sửa nhanh

Muốn sửa nội dung câu hỏi: chỉnh `lib/investigation-questions.ts`. Muốn sửa công thức: chỉnh `lib/physics.ts`. Muốn sửa hình xe: chỉnh `components/mystery/rover.tsx`. Muốn sửa điều khiển phanh: chỉnh `components/mystery/braking-controls.tsx`.

Route và layout chỉ phụ trách ghép giao diện. Trạng thái bài học nằm trong `MysteryExperience`; trạng thái mô phỏng nằm trong từng hook. Các component bên dưới nhận dữ liệu và callback qua props. Không cần backend hay thư viện quản lý trạng thái.

## Kiểm tra

```bash
npm run lint
npm test
npm run format:check
npm run build
```
