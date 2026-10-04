# STEM Mysteries

**Từ sự tò mò đến khám phá bằng bằng chứng khoa học.**

![Next.js](https://img.shields.io/badge/Next.js-App_Router-111827)
![TypeScript](https://img.shields.io/badge/TypeScript-Type_safe-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8)
![Trạng thái](https://img.shields.io/badge/Trạng_thái-Prototype_được_kiểm_thử-2563EB)
![Giấy phép](https://img.shields.io/badge/Giấy_phép-Chưa_chọn-lightgrey)

Website giáo dục tiếng Việt dành cho học sinh lớp 9, kết hợp mô phỏng vật lí, câu hỏi suy luận và giao diện E-learning. Bộ UI mở rộng có chuyển động mượt, thẻ khóa học, giáo trình, thông báo và một dashboard minh họa. Thiết kế ưu tiên chữ dễ đọc, khoảng trắng và khả năng trình chiếu trong lớp học.

## Tính năng

### Khám phá khoa học

- Hai bài độc lập: **Chiếc xe trượt xa** và **Năng lượng trên dốc**.
- Thay đổi điều kiện mô phỏng để so sánh ma sát, vận tốc, độ cao và năng lượng.
- Mỗi bài có 3 câu hỏi suy luận; chọn câu tự do, chấm cả bài sau khi nộp.
- Bảng kết quả chỉ nêu điểm và câu sai. Học sinh quay lại thí nghiệm để tự kiểm chứng.
- Vận tốc hiển thị bằng km/h, năng lượng bằng J; định dạng số theo tiếng Việt.

### Thử thách STEM — Hoàn thiện Challenge 01

- Trang chủ phân biệt **Vấn đề khám phá** (tìm hiểu hiện tượng) và **Thử thách STEM** (thiết kế giải pháp).
- **Thử thách STEM 01 — Thiết kế đường dốc an toàn** tại `/thu-thach/duong-doc-an-toan`.
- Nhận tình huống, xem tiêu chí và thiết kế bằng độ cao 20–60 cm, góc nghiêng 10–40°, bề mặt Nhẵn / Trung bình / Nhám.
- Hình dốc cập nhật theo thiết kế, cùng tỉ lệ hai trục. Vùng dừng an toàn: 10–30 cm tính từ chân dốc; tối đa 5 lần thử chính thức.
- Chọn dự đoán Có / Không và giải thích trước mỗi lần thử. Đổi thiết kế sẽ xóa dự đoán cũ. Mô phỏng dùng cùng mô hình với số liệu kết quả và bỏ chuyển động khi bật giảm chuyển động.
- Vận tốc là bằng chứng để phân tích, **không phải tiêu chí đạt yêu cầu**. Kết quả hiển thị vận tốc tại chân dốc, quãng đường dừng, thế năng ban đầu và động năng tại chân dốc.
- Sổ tay kỹ sư tự ghi thí nghiệm hoàn thành, gồm thiết kế, dự đoán, số liệu, phân tích và kế hoạch cải tiến. Thẻ kết quả responsive giúp so sánh các lần thử; bảng thiết kế mới đánh dấu yếu tố thay đổi so với lần trước. Không suy ra quan hệ nhân quả khi đổi nhiều yếu tố.
- Biểu đồ quãng đường dừng dùng chung thang 0–60 cm, đánh dấu vùng 10–30 cm. Giá trị vượt phạm vi có mũi tên và số liệu thật; xe chưa đến chân dốc không được vẽ như giá trị 0 cm. Số liệu hiển thị một chữ số thập phân theo tiếng Việt, mô hình và tiêu chí giữ độ chính xác nội bộ.
- Sau lần 1–4, nhóm phải phân tích số liệu rồi chọn yếu tố cải tiến (hoặc giữ nguyên để kiểm tra lại) và giải thích trước khi thiết kế tiếp. Nhận xét chấp nhận ý ngắn có chữ hoặc số, không quy định độ dài tối thiểu; gợi ý giúp nhóm liên hệ số liệu, không chấm đúng/sai. Thiết kế đạt yêu cầu vẫn được tiếp tục thử. Sau lần 5, chỉ phân tích và xem lại bằng chứng; không có lần thử thứ 6 hoặc yêu cầu kế hoạch cải tiến nữa.
- Sau lần thử thứ 5 và phân tích, nhóm xem lại sổ tay, tự chọn bất kỳ phương án đã thử (kể cả chưa đạt), chọn lần thử làm bằng chứng và viết lựa chọn, nhận xét số liệu, giải thích và so sánh. Không tự chọn phương án tốt nhất, chấm điểm hoặc đánh giá đúng/sai bài viết. Phương án đã nộp được giữ nguyên cùng bản tổng kết.
- Năm câu suy ngẫm có thể lưu từng phần. Hoàn thành phần trực tuyến khi đã nộp phương án và ghi đủ năm nhận xét; vẫn xem được sổ tay và phương án. Sửa suy ngẫm sau hoàn thành mở lại bước suy ngẫm để nhóm xác nhận lại.
- Hoạt động mô hình thật dùng vật liệu lớp học, lưu dự đoán trước khi nhập số đo, so sánh với phương án đã chọn và giải thích khác biệt. Ghi nhận này độc lập với năm lần thử mô phỏng và không bắt buộc để hoàn thành phần trực tuyến. Ghi chú giới hạn mô hình chỉ hiện trong phần kiểm chứng thật sau khi nộp nhận xét.
- Tiến trình được lưu trên trình duyệt này qua localStorage phiên bản 2, giữ khóa `stem-mysteries:safe-ramp:v1` để nâng cấp dữ liệu phiên bản 1 tại chỗ: thiết kế nháp, dự đoán, giai đoạn, các lần thử, phân tích, cải tiến, phương án đề xuất, bằng chứng, suy ngẫm và kiểm chứng thật. Nâng cấp giữ nguyên sổ tay và không tự chọn phương án. Khi tải lại giữa hoạt ảnh, kết quả đã tính được khôi phục để phân tích mà không chạy lại hoặc ghi trùng. Dữ liệu không hợp lệ/phiên bản không hỗ trợ mở chu trình mới và thông báo; khi trình duyệt từ chối lưu, bài vẫn chạy trong bộ nhớ và thông báo giới hạn lưu trữ. Không tải lên máy chủ hoặc đồng bộ đám mây.
- Nút bắt đầu lại ở cuối trang yêu cầu xác nhận khi đã có lần thử, xóa toàn bộ dữ liệu chu trình (cả phương án, suy ngẫm và kiểm chứng thật) và không hoạt động khi đang thử nghiệm. Sau hoàn thành, nút có nhãn “Bắt đầu chu trình thiết kế mới”. Không ảnh hưởng hai vấn đề khám phá.
- Cấu hình: `lib/challenge-config.ts`; kiểu dữ liệu và reducer: `lib/challenge-types.ts`, `lib/challenge-state.ts`; mô hình dốc: `lib/challenge-physics.ts`; kiểm tra và lưu dữ liệu: `lib/challenge-storage.ts`; trạng thái giao diện: `hooks/use-engineering-challenge.ts`.
- Mô hình động lực học: `L = h / sin(θ)`, `a = g(sin(θ) − μcos(θ))`, `v² = 2aL` khi `a > 0`, `s = v²/(2μg)`. Dùng g = 10 m/s²; μ minh họa là 0,10 / 0,20 / 0,35, không phải số đo vật liệu thật. Bỏ qua năng lượng quay, lực cản không khí và tổn hao ở chân dốc. Khi gia tốc không dương, xe đứng yên; số liệu tại chân dốc được ghi là không đến chân dốc. Khi xe vượt khung hình, chỉ báo cho biết xe đi tiếp ngoài khung, số liệu vẫn ghi toàn bộ quãng đường.

### Bộ UI E-learning

- `CourseCard`: ảnh Next Image, danh mục, giảng viên, điểm đánh giá, số học viên và hiệu ứng nhấc thẻ khi hover.
- `SkeletonCard`: cùng tỉ lệ ảnh và kích thước nội dung với thẻ thật, shimmer bằng CSS.
- `InteractiveButton`: hover gradient, phản hồi nhấn, trạng thái disabled và loading.
- `SyllabusAccordion`: mở chương với AnimatePresence, chiều cao tự động và chevron xoay.
- `CourseNavigation`: thanh tiến độ cuộn, menu xuất hiện sau hero và chỉ báo mục đang đọc.
- Sonner: thông báo success, error và info cho các thao tác minh họa.
- `ThemeToggle`: công tắc sáng/tối bằng next-themes **chỉ cho khu demo UI**; khu STEM vẫn sáng cố định.
- `EmptyState`: bố cục nội dung trống với hành động chính rõ ràng.

### Hiệu năng và khả năng tiếp cận

- Ảnh có vùng bố cục cố định, `sizes` responsive; avatar có width/height.
- Nút và liên kết có focus ring; accordion dùng `aria-expanded` và `aria-controls`.
- Skeleton có trạng thái tải dành cho trình đọc màn hình.
- Chuyển động tôn trọng `prefers-reduced-motion`; listener và observer được dọn khi unmount.
- Font Be Vietnam Pro được phục vụ tại chỗ, hỗ trợ tiếng Việt.

## Công nghệ

| Công nghệ                     | Vai trò                                                |
| ----------------------------- | ------------------------------------------------------ |
| Next.js 16 / React 19         | App Router, Server Components, routing và ảnh          |
| TypeScript                    | Kiểu dữ liệu component và mô phỏng                     |
| Tailwind CSS 4                | Utility classes, responsive và dark variant có phạm vi |
| Framer Motion                 | Hover, tap, accordion, chỉ báo điều hướng và tiến độ   |
| Lucide React                  | Icon SVG thống nhất                                    |
| Sonner                        | Thông báo thao tác                                     |
| next-themes                   | Lưu lựa chọn sáng/tối của demo                         |
| ESLint / Prettier / Node test | Kiểm tra mã, định dạng và kiểm thử                     |

## Bắt đầu

### 1. Chuẩn bị

Dùng Node.js **22.18 trở lên** và npm. Mức này hỗ trợ chạy các kiểm thử TypeScript trực tiếp bằng Node.

### 2. Lấy mã nguồn

Thay placeholder bằng URL repository của bạn:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 3. Cài thư viện

```bash
npm install
```

Không cần biến môi trường cho phiên bản hiện tại. Chưa tích hợp cơ sở dữ liệu, đăng nhập, thanh toán hoặc dịch vụ ngoài.

### 4. Chạy local

```bash
npm run dev
```

| Trang                        | Đường dẫn                                          |
| ---------------------------- | -------------------------------------------------- |
| Trang chủ                    | http://localhost:3000/                             |
| Ma sát và phanh xe           | http://localhost:3000/kham-pha/chiec-xe-truot-xa   |
| Năng lượng trên dốc          | http://localhost:3000/kham-pha/nang-luong-tren-doc |
| UI kit và dashboard minh họa | http://localhost:3000/ui-kit                       |

### 5. Kiểm tra và chạy bản build

```bash
npm run lint
npm test
npm run format:check
npm run build
npm start
```

`npm start` phục vụ bản production sau khi build. Dùng `npm run format` để định dạng mã.

## Kiến trúc

```text
app/
  layout.tsx                       # Font, metadata và khung trang
  page.tsx                         # Trang chủ Server Component
  globals.css                      # Theme STEM và Tailwind
  kham-pha/
    layout.tsx
    chiec-xe-truot-xa/page.tsx
    nang-luong-tren-doc/page.tsx
  ui-kit/
    layout.tsx                     # Provider và CSS có phạm vi
    page.tsx                       # Trang showcase
components/
  layout/                          # Header, footer, trình chiếu
  home/                            # Hero, STEM, quy trình và danh sách bài
  mystery/                         # Luồng phanh xe
  energy/                          # Luồng dốc và mô phỏng năng lượng
  quiz/                            # Chọn câu, trả lời và bảng điểm
  ui-kit/                          # Các component E-learning dùng lại
hooks/                             # Mô phỏng và trạng thái trả lời
lib/                               # Công thức, định dạng số, bộ câu hỏi
styles/                            # CSS theo khu giao diện
public/
  fonts/                           # Be Vietnam Pro và giấy phép OFL
  ui-kit/                          # Minh họa SVG local dùng qua Next Image
tests/                             # Vật lí, chấm bài và độc lập giữa hai bài
```

Route chỉ ghép giao diện; logic tương tác nằm trong component client và hook. Bộ câu hỏi của từng bài được truyền vào hook chấm bài, không phụ thuộc vào một ngân hàng câu hỏi toàn cục.

## Sử dụng component

```tsx
"use client";

import { InteractiveButton, SyllabusAccordion, type Chapter } from "@/components/ui-kit";

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    title: "Quan sát và đặt câu hỏi",
    lessons: [
      { id: "lesson-1", title: "Thiết kế thí nghiệm", kind: "text", duration: "5 phút đọc" },
    ],
  },
];

export function Curriculum() {
  return (
    <>
      <InteractiveButton onClick={() => console.log("Bắt đầu")}>Bắt đầu học</InteractiveButton>
      <SyllabusAccordion chapters={chapters} onSelectLesson={(lesson) => console.log(lesson.id)} />
    </>
  );
}
```

Khi sao chép bộ kit sang dự án khác, cài bốn thư viện UI, sao chép `components/ui-kit`, import `styles/ui-kit.css` và bọc khu giao diện trong `KitProviders`. Thêm dark variant từ `app/globals.css` và `suppressHydrationWarning` cho thẻ `html`. Provider dùng thuộc tính `data-kit-theme`, không đổi theme các trang STEM. CSS bổ sung có phạm vi `.ui-kit` để tương thích các style gốc của website hiện tại.

- `CourseCard`: truyền `href` thật, ảnh local hoặc static import. Với ảnh remote, cấu hình `images.remotePatterns` trong Next config.
- `SyllabusAccordion`: callback nhận bài được chọn; kết nối callback với trình phát hoặc route bài học của bạn.
- `CourseNavigation`: truyền `heroId` và danh sách `{ id, label }`; section đích cần `id`, `tabIndex={-1}` và scroll margin.
- Sonner: gọi `toast.success()`, `toast.error()` hoặc `toast.info()` bên trong provider.
- Đổi nội dung học: `lib/investigation-questions.ts`; đổi mô hình: `lib/physics.ts`.

## Phạm vi hiện tại

Dashboard, tên giảng viên, đánh giá và số học viên trong UI kit là **dữ liệu minh họa**. Chưa có đăng ký khóa học, trình phát video hoặc API lưu ghi chú. Tiến trình và ghi chú demo mất khi tải lại trang; lựa chọn theme demo lưu trong localStorage. Hai bài STEM vẫn chạy hoàn toàn trong trình duyệt.

Xem [hướng dẫn mô hình STEM](docs/stem-guide.md) để biết công thức, giả thiết và cách trình bày thí nghiệm. Dự án chưa chọn giấy phép mã nguồn; font có giấy phép riêng tại `public/fonts/OFL.txt`.

## Tài liệu tham khảo

[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image) · [Motion](https://motion.dev/docs/react-animate-presence) · [Tailwind dark mode](https://tailwindcss.com/docs/dark-mode) · [next-themes](https://github.com/pacocoursey/next-themes) · [Sonner](https://github.com/emilkowalski/sonner)

## Đăng ký nội dung và lưu trạng thái

Vấn đề khám phá và Thử thách STEM là hai kiểu riêng trong `lib/catalog-types.ts`. Thêm ID và định nghĩa vào `lib/problem-catalog.ts` hoặc `lib/challenge-catalog.ts`, rồi thêm mục vào danh sách theo thứ tự hiển thị. Tạo route tĩnh và ghép component riêng; route đọc metadata từ định nghĩa. Challenge liên kết các Problem qua `relatedProblemIds`. Hình minh họa vẫn được ghép rõ ràng trong component trang chủ.

`lib/browser-state-storage.ts` chỉ quản lý đọc/ghi đồng bộ theo key và trạng thái saved/invalid/unavailable. `lib/challenge-storage.ts` vẫn sở hữu key Safe Ramp, codec, kiểm tra dữ liệu/vật lí và migration phiên bản 1 → 2. Hook giữ thứ tự khôi phục trước khi lưu và tiếp tục bằng bộ nhớ khi trình duyệt từ chối lưu. Reset ghi trạng thái sạch theo schema hiện tại.
