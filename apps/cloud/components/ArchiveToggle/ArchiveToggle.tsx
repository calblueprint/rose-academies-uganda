"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";

type ArchiveToggleProps = {
  lesson_Id: number;
  isArchived: boolean;
};

export default function ArchiveToggle({
  lesson_Id,
  isArchived,
}: ArchiveToggleProps) {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  async function handleToggle() {
    const { error } = await supabase
      .from("Lessons_copy")
      .update({ is_archived: !isArchived })
      .eq("id", lesson_Id);

    if (error) {
      throw new Error(error.message);
    }

    router.refresh();
  }

  return (
    <button onClick={handleToggle}>
      {" "}
      {isArchived ? "Restore" : "Archive"}{" "}
    </button>
  );
}
