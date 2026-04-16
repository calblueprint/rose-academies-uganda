"use client";

import { TagGroup, VillageTag } from "./styles";

export default function VillageTags({ villages }: { villages: string[] }) {
  return (
    <TagGroup>
      {villages.map(village => (
        <VillageTag key={village}>{village}</VillageTag>
      ))}
    </TagGroup>
  );
}
