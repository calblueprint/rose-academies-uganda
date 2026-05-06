"use client";

import { TagGroup, VillageTag } from "./styles";

type VillageTagsVariant = "card" | "lessonPage";

export default function VillageTags({
  villages,
  variant = "card",
}: {
  villages: string[];
  variant?: VillageTagsVariant;
}) {
  return (
    <TagGroup>
      {villages.map(village => (
        <VillageTag key={village} $variant={variant}>
          {village}
        </VillageTag>
      ))}
    </TagGroup>
  );
}
