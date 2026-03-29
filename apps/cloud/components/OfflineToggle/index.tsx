"use client";

// import styles from "./styles";
import { useState } from "react";
import supabase from "@/api/supabase/client";

function OfflineToggle({
  lessonId,
  isOffline,
}: {
  lessonId: number;
  isOffline: boolean;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);

    if (isOffline) {
      const { error } = await supabase
        .from("OfflineLibrary")
        .delete()
        .eq("lesson_id", lessonId);
      if (error) {
        console.error(
          `An error occurred trying to remove lesson ${lessonId}: ${error.message}`,
        );
      }
    } else {
      const { data, error } = await supabase
        .from("OfflineLibrary")
        .insert({ lesson_id: lessonId })
        .select();
      if (error) {
        console.error(
          `An error occurred trying to add lesson ${lessonId}: ${error.message}`,
        );
      }
      console.log("inserted lesson " + data);
    }

    setIsUpdating(false);
  };

  return (
    <button onClick={handleToggle}>
      {isOffline ? "Remove from Sync" : "Send to Sync"}
    </button>
  );
}

export default OfflineToggle;
