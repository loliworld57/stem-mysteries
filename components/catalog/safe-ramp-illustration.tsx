import { Car, FlaskConical, Target } from "lucide-react";
import { challengeConfig } from "@/lib/challenge-config";
export function SafeRampIllustration() {
  return (
    <div className="home-challenge-visual" aria-hidden="true">
      <div className="home-challenge-visual-label">
        <FlaskConical size={18} /> Phòng thử nghiệm thiết kế
      </div>
      <div className="home-challenge-apparatus">
        <div className="home-challenge-ramp" />
        <Car className="home-challenge-car" size={58} strokeWidth={1.8} />
        <div className="home-challenge-ground" />
        <div className="home-challenge-safe-zone">
          <Target size={20} />
        </div>
        <div className="home-challenge-zone-caption">
          Vùng dừng an toàn
          <strong>
            {challengeConfig.safeZoneMinCm}–{challengeConfig.safeZoneMaxCm} cm
          </strong>
        </div>
      </div>
      <p>Thiết kế · Thử nghiệm · Cải tiến</p>
    </div>
  );
}
