"use client";
import { useEffect, useId, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { focusRing } from "./motion";

export interface CourseSection {
  id: string;
  label: string;
}
export function CourseNavigation({
  heroId,
  sections,
}: {
  heroId: string;
  sections: CourseSection[];
}) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const groupId = useId();
  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const heroObserver = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0),
    );
    heroObserver.observe(hero);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const elements = sections
          .map((s) => document.getElementById(s.id))
          .filter((el): el is HTMLElement => el !== null);
        const current =
          [...elements].reverse().find((el) => el.getBoundingClientRect().top <= 150) ??
          elements[0];
        if (current) setActive(current.id);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      heroObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [heroId, sections]);
  function navigate(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    element?.focus({ preventScroll: true });
  }
  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-blue-500"
        style={{ scaleX: reduced ? scrollYProgress : smooth }}
      />
      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Điều hướng nội dung khóa học"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-x-3 top-4 z-40 mx-auto flex max-w-2xl gap-1 overflow-x-auto rounded-2xl border border-slate-200/60 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
          >
            <LayoutGroup id={groupId}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  aria-current={active === section.id ? "location" : undefined}
                  onClick={() => navigate(section.id)}
                  className={`relative flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold ${focusRing}`}
                >
                  {active === section.id && (
                    <motion.span
                      layoutId="active-section"
                      className="absolute inset-0 rounded-xl bg-blue-50 dark:bg-slate-800"
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    />
                  )}
                  <span className="relative">{section.label}</span>
                </button>
              ))}
            </LayoutGroup>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
