"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, PlayCircle, FileText } from "lucide-react";
import { fluidTransition, focusRing } from "./motion";

export interface Lesson {
  id: string;
  title: string;
  kind: "video" | "text";
  duration: string;
}
export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}
export function SyllabusAccordion({
  chapters,
  onSelectLesson,
}: {
  chapters: Chapter[];
  onSelectLesson: (lesson: Lesson) => void;
}) {
  const [open, setOpen] = useState<string | null>(chapters[0]?.id ?? null);
  const prefix = useId();
  const reduced = useReducedMotion();
  return (
    <div className="space-y-3">
      {chapters.map((chapter) => {
        const expanded = open === chapter.id;
        const panel = `${prefix}-${chapter.id}`;
        return (
          <div
            key={chapter.id}
            className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            <h3>
              <button
                id={`${panel}-trigger`}
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => setOpen(expanded ? null : chapter.id)}
                className={`flex w-full items-center gap-4 rounded-xl p-6 text-left ${focusRing}`}
              >
                <span className="flex-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                  {chapter.title}
                  <span className="mt-1 block text-sm font-normal text-slate-500">
                    {chapter.lessons.length} bài học
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ ...fluidTransition, duration: reduced ? 0 : 0.25 }}
                >
                  <ChevronDown aria-hidden className="size-5" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={`${panel}-trigger`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ ...fluidTransition, duration: reduced ? 0 : 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="px-6 pb-4">
                    {chapter.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => onSelectLesson(lesson)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-4 text-left text-sm hover:bg-blue-50 dark:hover:bg-slate-800 ${focusRing}`}
                        >
                          {lesson.kind === "video" ? (
                            <PlayCircle aria-hidden className="size-5 shrink-0 text-blue-500" />
                          ) : (
                            <FileText aria-hidden className="size-5 shrink-0 text-blue-500" />
                          )}
                          <span className="flex-1">{lesson.title}</span>
                          <span className="text-slate-500">{lesson.duration}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
