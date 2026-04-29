export const PRESET_IMAGES = [
  "/placeholders/preset-0.jpg",
  "/placeholders/preset-1.jpg",
  "/placeholders/preset-2.jpg",
  "/placeholders/preset-3.jpg",
  "/placeholders/preset-4.jpg",
  "/placeholders/preset-5.jpg",
  "/placeholders/preset-6.jpg",
  "/placeholders/preset-7.jpg",
  "/placeholders/preset-8.jpg",
];

export function randomPresetImage(): string {
  return PRESET_IMAGES[Math.floor(Math.random() * PRESET_IMAGES.length)];
}
