export function SkeletonCard() {
  return (
    <div
      role="status"
      aria-label="Đang tải khóa học"
      className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-900"
    >
      <span className="sr-only">Đang tải khóa học…</span>
      <div aria-hidden>
        <div className="kit-shimmer aspect-[16/10]" />
        <div className="space-y-5 p-6">
          <div className="flex min-h-14 flex-col gap-2">
            <div className="kit-shimmer h-6 w-4/5 rounded" />
            <div className="kit-shimmer h-6 w-3/5 rounded" />
          </div>
          <div className="flex h-8 items-center gap-3">
            <div className="kit-shimmer size-8 rounded-full" />
            <div className="kit-shimmer h-4 w-32 rounded" />
          </div>
          <div className="flex min-h-6 gap-3">
            <div className="kit-shimmer h-5 w-12 rounded" />
            <div className="kit-shimmer h-5 w-32 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
