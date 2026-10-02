export const GRAVITY = 10;
export const ROVER_MASS = 2;
export const DEFAULT_SPEED_KMH = 14.4;
export const TRACK_LENGTH = 25;
export const kmhToMs = (speedKmh: number) => speedKmh / 3.6;
export const msToKmh = (speedMs: number) => speedMs * 3.6;
export const kineticEnergy = (mass: number, speedMs: number) => 0.5 * mass * speedMs ** 2;
export const potentialEnergy = (mass: number, height: number) => mass * GRAVITY * height;
export function brakingResult(speedKmh: number, friction: number) {
  const initialSpeed = kmhToMs(speedKmh);
  const deceleration = friction * GRAVITY;
  return {
    initialSpeed,
    deceleration,
    duration: initialSpeed / deceleration,
    distance: initialSpeed ** 2 / (2 * deceleration),
  };
}
