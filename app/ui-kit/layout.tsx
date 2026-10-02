import type { ReactNode } from "react";
import { KitProviders } from "@/components/ui-kit/providers";
import "@/styles/ui-kit.css";
export default function KitLayout({ children }: { children: ReactNode }) {
  return <KitProviders>{children}</KitProviders>;
}
