"use client";

import { useState } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [presentation, setPresentation] = useState(false);

  return (
    <div className={presentation ? "app presentation" : "app"}>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <SiteHeader
        presentation={presentation}
        onTogglePresentation={() => setPresentation(!presentation)}
      />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <div className="site-footer-container">
        <SiteFooter />
      </div>
    </div>
  );
}
