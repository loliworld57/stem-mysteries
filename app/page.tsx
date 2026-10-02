import { HomeHero } from "@/components/home/home-hero";
import { StemIntroduction } from "@/components/home/stem-introduction";
import { LearningProcess } from "@/components/home/learning-process";
import { MysteryCatalog } from "@/components/home/mystery-catalog";

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <StemIntroduction />
      <LearningProcess />
      <MysteryCatalog />
    </div>
  );
}
