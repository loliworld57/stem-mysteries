"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Save, Info } from "lucide-react";
import { CourseCard } from "./course-card";
import { SkeletonCard } from "./skeleton-card";
import { InteractiveButton } from "./interactive-button";
import { SyllabusAccordion, type Chapter } from "./syllabus-accordion";
import { EmptyState } from "./empty-state";
import { ThemeToggle } from "./theme-toggle";
import { CourseNavigation, type CourseSection } from "./course-navigation";
import { focusRing } from "./motion";

const sections: CourseSection[] = [
  { id: "kit-overview", label: "Tổng quan" },
  { id: "kit-curriculum", label: "Giáo trình" },
  { id: "kit-reviews", label: "Đánh giá" },
  { id: "kit-instructor", label: "Giảng viên" },
];
const chapters: Chapter[] = [
  {
    id: "observe",
    title: "01 · Quan sát và đặt câu hỏi",
    lessons: [
      { id: "intro", title: "Nhận diện vấn đề cần tìm hiểu", kind: "video", duration: "05:20" },
      {
        id: "variables",
        title: "Xác định biến và điều kiện thí nghiệm",
        kind: "text",
        duration: "4 phút đọc",
      },
    ],
  },
  {
    id: "experiment",
    title: "02 · Thí nghiệm và kiểm chứng",
    lessons: [
      { id: "measure", title: "Thu thập số liệu từ mô phỏng", kind: "video", duration: "08:10" },
      { id: "reason", title: "So sánh kết quả với dự đoán", kind: "text", duration: "6 phút đọc" },
      { id: "conclude", title: "Rút ra kết luận từ bằng chứng", kind: "video", duration: "06:30" },
    ],
  },
];

export function KitShowcase() {
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);
  function saveNotes() {
    if (!notes.trim()) {
      toast.error("Chưa có nội dung để lưu", {
        description: "Nhập ghi chú trước khi thử thao tác.",
      });
      return;
    }
    toast.success("Đã nhận ghi chú trong phiên demo", {
      description: "Bản demo chưa kết nối máy chủ; ghi chú mất khi tải lại trang.",
    });
  }
  return (
    <>
      <CourseNavigation heroId="kit-hero" sections={sections} />
      <section id="kit-hero" className="grid gap-8 pb-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-800">
              STEM MYSTERIES · UI KIT
            </span>
            <ThemeToggle />
          </div>
          <h1>
            Học từ sự tò mò.
            <br />
            <span className="text-blue-600 dark:text-blue-400">Hiểu bằng trải nghiệm.</span>
          </h1>
          <p className="my-6 max-w-xl text-lg leading-8">
            Bộ giao diện học tập với chuyển động nhẹ, phản hồi rõ ràng và không gian dành cho kiến
            thức.
          </p>
          <InteractiveButton
            onClick={() =>
              document.getElementById("kit-curriculum")?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            Khám phá giáo trình
            <ArrowRight aria-hidden className="size-4" />
          </InteractiveButton>
          <p className="mt-5 text-sm text-slate-500">
            Trang minh họa component. Khóa học, giảng viên và đánh giá bên dưới là dữ liệu mẫu.
          </p>
        </div>
        <div className="relative aspect-[16/10] self-center overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/ui-kit/course.svg"
            alt="Minh họa xe trên dốc để khám phá năng lượng"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            preload
            className="object-cover"
          />
        </div>
      </section>
      <section
        id="kit-overview"
        tabIndex={-1}
        className="kit-section border-t border-slate-200/60 dark:border-slate-700"
      >
        <h2>Thẻ bài học & trạng thái tải</h2>
        <p className="mb-8 mt-3 text-base text-slate-500">
          Thẻ và skeleton dùng cùng tỉ lệ ảnh, khoảng cách và chiều cao nội dung.
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CourseCard
            title="Khám phá ma sát và quãng đường phanh"
            category="Vật lí · Lớp 9"
            instructor="Nhóm giáo dục STEM · mẫu"
            thumbnail="/ui-kit/course.svg"
            avatar="/ui-kit/avatar.svg"
            rating={4.8}
            enrollment={1240}
            href="/kham-pha/chiec-xe-truot-xa"
          />
          <CourseCard
            title="Năng lượng chuyển hóa trên dốc"
            category="Năng lượng · Lớp 9"
            instructor="Nhóm giáo dục STEM · mẫu"
            thumbnail="/ui-kit/course.svg"
            avatar="/ui-kit/avatar.svg"
            rating={4.9}
            enrollment={860}
            href="/kham-pha/nang-luong-tren-doc"
          />
          <SkeletonCard />
        </div>
      </section>
      <section id="kit-curriculum" tabIndex={-1} className="kit-section">
        <h2>Giáo trình tương tác</h2>
        <p className="mb-8 mt-3 text-base text-slate-500">
          Mở từng chương và chọn bài. Nội dung video là ví dụ giao diện, chưa có trình phát.
        </p>
        <SyllabusAccordion
          chapters={chapters}
          onSelectLesson={(lesson) =>
            toast.info(lesson.title, {
              description: "Bài học mẫu: chưa có video hoặc nội dung chi tiết.",
            })
          }
        />
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="font-semibold">Góc học tập · thao tác minh họa</h3>
          <label htmlFor="kit-notes" className="mb-3 mt-5 block text-sm">
            Ghi chú của em
          </label>
          <textarea
            id="kit-notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Điều em quan sát được từ thí nghiệm…"
            className={`w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-base dark:border-slate-700 dark:bg-slate-800 ${focusRing}`}
          />
          <div className="mt-5 flex flex-wrap gap-3">
            <InteractiveButton onClick={saveNotes}>
              <Save aria-hidden className="size-4" />
              Lưu ghi chú
            </InteractiveButton>
            <InteractiveButton
              disabled={completed}
              onClick={() => {
                setCompleted(true);
                toast.success("Đã đánh dấu hoàn thành trong phiên demo");
              }}
            >
              <Check aria-hidden className="size-4" />
              {completed ? "Đã hoàn thành" : "Hoàn thành bài học"}
            </InteractiveButton>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${focusRing}`}
              onClick={() => toast.info("Tiến trình demo chỉ được giữ trong phiên hiện tại")}
            >
              <Info aria-hidden className="size-4" />
              Thông tin lưu trữ
            </button>
          </div>
        </div>
      </section>
      <section id="kit-reviews" tabIndex={-1} className="kit-section">
        <h2>Đánh giá & nội dung trống</h2>
        <p className="mb-8 mt-3 text-base text-slate-500">
          Chưa có đánh giá thực tế. Đây là trạng thái trước khi học viên gửi phản hồi.
        </p>
        <EmptyState
          title="Chưa có đánh giá"
          description="Trải nghiệm bài học và tự kiểm chứng các quan sát trước khi chia sẻ cảm nhận."
          actionLabel="Xem các bài khám phá"
          onAction={() =>
            document.getElementById("kit-overview")?.scrollIntoView({ behavior: "auto" })
          }
        />
      </section>
      <section id="kit-instructor" tabIndex={-1} className="kit-section">
        <h2>Thông tin giảng viên</h2>
        <div className="mt-8 flex flex-col items-start gap-6 rounded-2xl bg-white p-8 shadow-sm sm:flex-row dark:bg-slate-900">
          <Image
            src="/ui-kit/avatar.svg"
            alt="Ảnh đại diện minh họa"
            width={80}
            height={80}
            className="rounded-2xl"
          />
          <div>
            <h3 className="text-xl font-semibold">Nhóm giáo dục STEM</h3>
            <p className="mt-3 max-w-2xl text-base leading-7">
              Hồ sơ mẫu để minh họa bố cục. Có thể thay bằng ảnh, tên và thông tin chuyên môn của
              giáo viên khi đưa vào sử dụng.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
