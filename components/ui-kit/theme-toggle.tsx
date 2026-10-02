"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { focusRing } from "./motion";

const subscribe = () => () => {};
export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const dark = mounted && theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Chế độ tối của trang demo"
      disabled={!mounted}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`inline-flex size-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 ${focusRing}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -60, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.8 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
        >
          {dark ? (
            <Moon aria-hidden className="size-5" />
          ) : (
            <Sun aria-hidden className="size-5 text-amber-600" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
