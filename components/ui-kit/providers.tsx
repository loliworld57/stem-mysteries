"use client";
import type { ReactNode } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { CircleCheck, CircleAlert, Info } from "lucide-react";

function Notifications() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme === "dark" ? "dark" : "light"}
      position="bottom-right"
      containerAriaLabel="Thông báo"
      closeButton
      duration={4500}
      icons={{
        success: <CircleCheck className="size-5 text-emerald-600" />,
        error: <CircleAlert className="size-5 text-rose-500" />,
        info: <Info className="size-5 text-blue-500" />,
      }}
      toastOptions={{
        closeButtonAriaLabel: "Đóng thông báo",
        className: "kit-toast",
        style: { borderRadius: 16, padding: 20, boxShadow: "0 8px 30px rgb(0 0 0 / 0.08)" },
      }}
    />
  );
}
export function KitProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-kit-theme"
      storageKey="stem-ui-kit-theme"
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <div className="ui-kit">{children}</div>
        <Notifications />
      </MotionConfig>
    </ThemeProvider>
  );
}
