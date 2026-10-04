"use client";

import { Sparkles, Presentation, Minimize2 } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SiteHeaderProps {
  presentation: boolean;
  onTogglePresentation: () => void;
}

export function SiteHeader({ presentation, onTogglePresentation }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Bí ẩn STEM — Trang chủ">
        <span className="logo" aria-hidden="true">
          S<Sparkles className="inline-icon" aria-hidden="true" />
        </span>
        <b>Bí ẩn STEM</b>
      </Link>
      <nav className="site-nav" aria-label="Điều hướng chính">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Trang chủ
        </Link>
        <Link href="/#stem">STEM là gì?</Link>
        <Link href="/#bi-an">Khám phá bí ẩn</Link>
      </nav>
      <button
        className="secondary compact"
        aria-pressed={presentation}
        onClick={onTogglePresentation}
      >
        {presentation ? (
          <>
            <Minimize2 className="inline-icon" aria-hidden="true" /> Thoát trình chiếu
          </>
        ) : (
          <>
            <Presentation className="inline-icon" aria-hidden="true" /> Chế độ trình chiếu
          </>
        )}
      </button>
    </header>
  );
}
