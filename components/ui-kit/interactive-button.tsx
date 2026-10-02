"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { fluidTransition, focusRing } from "./motion";
import type { ReactNode } from "react";

export type InteractiveButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  loading?: boolean;
};

export function InteractiveButton({
  children,
  className = "",
  loading = false,
  disabled,
  ...props
}: InteractiveButtonProps) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      {...props}
      type={props.type ?? "button"}
      tabIndex={props.tabIndex ?? 0}
      disabled={disabled || loading}
      aria-busy={loading}
      whileHover={reduced || disabled || loading ? undefined : { y: -2 }}
      whileTap={reduced || disabled || loading ? undefined : { scale: 0.98 }}
      transition={fluidTransition}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 ${focusRing} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative inline-flex items-center gap-3">
        {loading && (
          <LoaderCircle aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
        )}
        {children}
      </span>
    </motion.button>
  );
}
