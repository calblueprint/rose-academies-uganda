import type { FileRow } from "./index";
import { ColumnDef } from "@tanstack/react-table";
import { formatBytes, formatDate } from "./helpers";
import * as style from "./styles";

type GetFileTableColumnsArgs = {
  isDeleting: boolean;
  isReordering: boolean;
  t: (key: string) => string;
};

export function getFileTableColumns({
  isDeleting,
  isReordering,
  t,
}: GetFileTableColumnsArgs): ColumnDef<FileRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <style.Checkbox
          type="checkbox"
          aria-label={t("files.selectAll")}
          checked={table.getIsAllRowsSelected()}
          ref={input => {
            if (input) {
              input.indeterminate = table.getIsSomeRowsSelected();
            }
          }}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <style.Checkbox
          type="checkbox"
          aria-label={`Select ${row.original.name}`}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect() || isDeleting || isReordering}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
    },
    {
      // This column exists so each row has a drag handle cell.
      id: "drag",
      header: "",
      cell: () => null,
      enableSorting: false,
    },
    {
      accessorKey: "name",
      id: "name",
      header: t("files.name"),
      cell: ({ row }) => row.original.name,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      id: "createdAt",
      header: t("files.dateAdded"),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      id: "updatedAt",
      header: t("files.dateModified"),
      cell: ({ row }) => formatDate(row.original.updatedAt),
    },
    {
      accessorKey: "sizeBytes",
      id: "sizeBytes",
      header: t("files.fileSize"),
      cell: ({ row }) => formatBytes(row.original.sizeBytes),
    },
  ];
}
