import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ExplorationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="exploration-layout">
      <Link className="back-to-home" href="/#bi-an">
        <ArrowLeft className="inline-icon" aria-hidden="true" /> Về danh sách bí ẩn
      </Link>
      {children}
    </div>
  );
}
