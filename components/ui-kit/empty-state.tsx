"use client";
import { Bookmark, ArrowRight } from "lucide-react";
import { InteractiveButton } from "./interactive-button";

export function EmptyState({
  title = "Chưa có bài học đã lưu",
  description = "Lưu những bài em quan tâm để dễ dàng quay lại khám phá.",
  actionLabel = "Khám phá bài học",
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-slate-50 px-6 py-12 text-center dark:bg-slate-900">
      <div className="mb-6 grid size-20 place-items-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
        <Bookmark aria-hidden className="size-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mb-6 mt-3 max-w-md text-base text-slate-500 dark:text-slate-400">
        {description}
      </p>
      <InteractiveButton onClick={onAction}>
        {actionLabel}
        <ArrowRight aria-hidden className="size-4" />
      </InteractiveButton>
    </div>
  );
}
