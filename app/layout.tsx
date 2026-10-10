import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";
import "@/styles/home.css";
import "@/styles/mystery.css";
import "@/styles/energy.css";
import "@/styles/quiz.css";
import "@/styles/catalog.css";

const beVietnamPro = localFont({
  src: [
    { path: "../public/fonts/BeVietnamPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/BeVietnamPro-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/BeVietnamPro-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/BeVietnamPro-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "STEM Mysteries | Học qua khám phá", template: "%s | STEM Mysteries" },
  description:
    "Tìm hiểu STEM, khám phá các bí ẩn và tự làm thí nghiệm tương tác về khoa học dành cho học sinh lớp 9.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={beVietnamPro.variable}
      style={{ colorScheme: "only light" }}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
