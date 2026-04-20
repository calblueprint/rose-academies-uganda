"use client";

/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DragHandle } from "./styles";

export type FileRow = {
  id: string;
  name: string;
  sizeBytes: number;
  createdAt: string;
  updatedAt: string;
  order: number;
};

type FilesTableProps = {
  files: FileRow[];
  searchTerm: string;
  onDeleteFiles: (fileIds: string[]) => Promise<void>;
  isDeleting: boolean;
  onReorderFiles: (nextFiles: FileRow[]) => Promise<void>;
  isReordering: boolean;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}

type SortableRowProps = {
  row: Row<FileRow>;
  canDrag: boolean;
};

function SortableRow({ row, canDrag }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.original.id,
    disabled: !canDrag,
  });

  const rowStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <tr ref={setNodeRef} style={rowStyle}>
      {row.getVisibleCells().map(cell => {
        if (cell.column.id === "drag") {
          return (
            <td key={cell.id}>
              <DragHandle
                ref={setActivatorNodeRef}
                type="button"
                {...attributes}
                {...listeners}
                disabled={!canDrag}
                aria-label="Drag to reorder file"
              >
                ↕
              </DragHandle>
            </td>
          );
        }

        return (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}

type StaticRowProps = {
  row: Row<FileRow>;
};

function StaticRow({ row }: StaticRowProps) {
  return (
    <tr>
      {row.getVisibleCells().map(cell => {
        if (cell.column.id === "drag") {
          return (
            <td key={cell.id}>
              <DragHandle
                type="button"
                disabled
                aria-label="Drag to reorder file"
              >
                ↕
              </DragHandle>
            </td>
          );
        }

        return (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}

type TableMarkupProps = {
  table: ReturnType<typeof useReactTable<FileRow>>;
  renderedRows: Row<FileRow>[];
  isDeleting: boolean;
  isMounted: boolean;
  canDrag: boolean;
};

function TableMarkup({
  table,
  renderedRows,
  isDeleting,
  isMounted,
  canDrag,
}: TableMarkupProps) {
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              const canSort = header.column.getCanSort();
              const sortDirection = header.column.getIsSorted();

              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : canSort ? (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      disabled={isDeleting}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}{" "}
                      {sortDirection === "asc"
                        ? "↑"
                        : sortDirection === "desc"
                          ? "↓"
                          : ""}
                    </button>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {isMounted
          ? renderedRows.map(row => (
              <SortableRow key={row.id} row={row} canDrag={canDrag} />
            ))
          : renderedRows.map(row => <StaticRow key={row.id} row={row} />)}
      </tbody>
    </table>
  );
}

export default function FilesTable({
  files,
  searchTerm,
  onDeleteFiles,
  isDeleting,
  onReorderFiles,
  isReordering,
}: FilesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredFiles = useMemo(() => {
    const manualOrderFiles = [...files].sort((a, b) => a.order - b.order);

    if (!normalizedSearchTerm) {
      return manualOrderFiles;
    }

    return manualOrderFiles.filter(file =>
      file.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [files, normalizedSearchTerm]);

  const totalSizeBytes = useMemo(() => {
    return files.reduce((sum, file) => sum + file.sizeBytes, 0);
  }, [files]);

  const columns = useMemo<ColumnDef<FileRow>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
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
          <input
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
        id: "drag",
        header: () => "Move",
        cell: () => null,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "File Name",
        cell: ({ row }) => row.original.name,
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: "Date Added",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "updatedAt",
        header: "Modified",
        cell: ({ row }) => formatDate(row.original.updatedAt),
      },
      {
        accessorKey: "sizeBytes",
        header: "File Size",
        cell: ({ row }) => formatBytes(row.original.sizeBytes),
      },
    ],
    [isDeleting, isReordering],
  );

  const table = useReactTable({
    data: filteredFiles,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    getRowId: row => row.id,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  const renderedRows = table.getRowModel().rows;
  const isSearchActive = normalizedSearchTerm.length > 0;
  const isManualOrderMode =
    sorting.length === 0 && !isSearchActive && !isDeleting && !isReordering;

  const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
  const selectedCount = selectedIds.length;

  function reindexFiles(nextFiles: FileRow[]) {
    return nextFiles.map((file, index) => ({
      ...file,
      order: index,
    }));
  }

  async function handleDeleteSelected() {
    if (selectedCount === 0 || isDeleting || isReordering) return;

    await onDeleteFiles(selectedIds);
    setRowSelection({});
  }

  function handleClearSorting() {
    setSorting([]);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id || !isManualOrderMode) {
      return;
    }

    const orderedFiles = [...files].sort((a, b) => a.order - b.order);

    const oldIndex = orderedFiles.findIndex(file => file.id === active.id);
    const newIndex = orderedFiles.findIndex(file => file.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const nextFiles = reindexFiles(arrayMove(orderedFiles, oldIndex, newIndex));

    void onReorderFiles(nextFiles);
  }

  const hasNoFiles = files.length === 0;
  const hasNoSearchResults = files.length > 0 && filteredFiles.length === 0;

  return (
    <section>
      <h2>Lesson Files</h2>

      <div>
        <p>Files: {files.length}</p>
        <p>Total size: {formatBytes(totalSizeBytes)}</p>
        <p>Selected: {selectedCount}</p>
      </div>

      <div>
        <button
          type="button"
          onClick={handleDeleteSelected}
          disabled={selectedCount === 0 || isDeleting || isReordering}
        >
          {isDeleting ? "Deleting..." : "Delete selected"}
        </button>

        <button
          type="button"
          onClick={handleClearSorting}
          disabled={sorting.length === 0 || isDeleting || isReordering}
        >
          Clear sorting
        </button>
      </div>

      {sorting.length > 0 && (
        <p>
          Sorting is active. Clear sorting to drag and manually reorder files.
        </p>
      )}

      {isSearchActive && (
        <p>
          Search is active. Clear search to drag and manually reorder files.
        </p>
      )}

      {hasNoFiles ? (
        <p>No files have been added to this lesson yet.</p>
      ) : hasNoSearchResults ? (
        <p>No files match your search.</p>
      ) : isMounted ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={renderedRows.map(row => row.original.id)}
            strategy={verticalListSortingStrategy}
          >
            <TableMarkup
              table={table}
              renderedRows={renderedRows}
              isDeleting={isDeleting || isReordering}
              isMounted={true}
              canDrag={isManualOrderMode}
            />
          </SortableContext>
        </DndContext>
      ) : (
        <TableMarkup
          table={table}
          renderedRows={renderedRows}
          isDeleting={isDeleting || isReordering}
          isMounted={false}
          canDrag={false}
        />
      )}
    </section>
  );
}
