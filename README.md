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
