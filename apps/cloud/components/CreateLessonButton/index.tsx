"use client";

import React from "react";
import { IconSvgs } from "@/lib/icons";
import { Button, Label } from "./styles";

export default function CreateButton() {
  return (
    <Button>
      {IconSvgs.plus}
      <Label>Create</Label>
    </Button>
  );
}
