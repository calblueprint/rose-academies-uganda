import type { FileRow } from "./index";
import { ColumnDef } from "@tanstack/react-table";
import { formatBytes, formatDate } from "./helpers";
import * as style from "./styles";

type GetFileTableColumnsArgs = {
  isDeleting: boolean;
  isReordering: boolean;
};

export function getFileTableColumns({
  isDeleting,
  isReordering,
}: GetFileTableColumnsArgs): ColumnDef<FileRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <style.Checkbox
          type="checkbox"
          aria-label="Select all files"
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
      header: "Name",
      cell: ({ row }) => row.original.name,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      id: "createdAt",
      header: "Date Added",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      id: "updatedAt",
      header: "Date Modified",
      cell: ({ row }) => formatDate(row.original.updatedAt),
    },
    {
      accessorKey: "sizeBytes",
      id: "sizeBytes",
      header: "File Size",
      cell: ({ row }) => formatBytes(row.original.sizeBytes),
    },
  ];
}
