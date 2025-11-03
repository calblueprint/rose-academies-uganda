"use client";

import { useEffect, useState } from "react";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import { FilePreview } from "@/components/FilePreview";
import { LocalFile } from "@/types/schema";

export default function Page() {
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [selected, setSelected] = useState<LocalFile | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchLocalDatabase();
      setFiles(data.files);
      setSelected(data.files[0] ?? null);
    })();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <select
        className="border p-2"
        onChange={e => {
          const id = Number(e.target.value);
          const file = files.find(f => f.id === id) || null;
          setSelected(file);
        }}
      >
        {files.map(f => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>

      {selected ? <FilePreview file={selected} /> : <p>No file selected.</p>}
    </div>
  );
}
