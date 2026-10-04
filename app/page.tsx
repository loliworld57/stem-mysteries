import { HomeHero } from "@/components/home/home-hero";
import { StemIntroduction } from "@/components/home/stem-introduction";
import { LearningProcess } from "@/components/home/learning-process";
import { MysteryCatalog } from "@/components/home/mystery-catalog";
import { ChallengeCatalog } from "@/components/home/challenge-catalog";

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <StemIntroduction />
      <LearningProcess />
      <MysteryCatalog />
      <ChallengeCatalog />
    </div>
  );
}
