import type { Metadata } from "next";
import { KitShowcase } from "@/components/ui-kit/kit-showcase";
export const metadata: Metadata = {
  title: "Bộ giao diện học tập",
  description: "Bản demo component E-learning: thẻ khóa học, giáo trình, thông báo và điều hướng.",
};
export default function UIKitPage() {
  return <KitShowcase />;
}
