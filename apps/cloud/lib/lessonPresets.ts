export const PRESET_IMAGES = [
  "/placeholders/preset-0.svg",
  "/placeholders/preset-1.svg",
  "/placeholders/preset-2.svg",
  "/placeholders/preset-3.svg",
  "/placeholders/preset-4.svg",
  "/placeholders/preset-5.svg",
  "/placeholders/preset-6.svg",
  "/placeholders/preset-7.svg",
];

export function randomPresetImage(): string {
  return PRESET_IMAGES[Math.floor(Math.random() * PRESET_IMAGES.length)];
}
