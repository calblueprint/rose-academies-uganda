"use client";

/* eslint-disable react-hooks/incompatible-library */
import { Dispatch, SetStateAction, useMemo, useState } from "react";
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
  setFiles: Dispatch<SetStateAction<FileRow[]>>;
  searchTerm: string;
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

export default function FilesTable({
  files,
  setFiles,
  searchTerm,
}: FilesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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
            disabled={!row.getCanSelect()}
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
    [],
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
  const isManualOrderMode = sorting.length === 0 && !isSearchActive;

  const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
  const selectedCount = selectedIds.length;

  function reindexFiles(nextFiles: FileRow[]) {
    return nextFiles.map((file, index) => ({
      ...file,
      order: index,
    }));
  }

  function handleDeleteSelected() {
    if (selectedCount === 0) return;

    setFiles(currentFiles =>
      reindexFiles(currentFiles.filter(file => !rowSelection[file.id])),
    );

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

    setFiles(currentFiles => {
      const orderedFiles = [...currentFiles].sort((a, b) => a.order - b.order);

      const oldIndex = orderedFiles.findIndex(file => file.id === active.id);
      const newIndex = orderedFiles.findIndex(file => file.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return currentFiles;
      }

      return reindexFiles(arrayMove(orderedFiles, oldIndex, newIndex));
    });
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
          disabled={selectedCount === 0}
        >
          Delete selected
        </button>

        <button
          type="button"
          onClick={handleClearSorting}
          disabled={sorting.length === 0}
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
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
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
              <SortableContext
                items={renderedRows.map(row => row.original.id)}
                strategy={verticalListSortingStrategy}
              >
                {renderedRows.map(row => (
                  <SortableRow
                    key={row.id}
                    row={row}
                    canDrag={isManualOrderMode}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      )}
    </section>
  );
}
