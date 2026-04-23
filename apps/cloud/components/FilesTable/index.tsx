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
import FileTypeBadge from "@/components/FileTypeBadge";
import * as style from "./styles";

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
  selectedFileIds: string[];
  onSelectionChange: (fileIds: string[]) => void;
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

function DragDotsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.7187 16.8437C12.7187 16.5718 12.7994 16.306 12.9505 16.0798C13.1016 15.8537 13.3163 15.6775 13.5676 15.5734C13.8188 15.4693 14.0953 15.4421 14.362 15.4952C14.6287 15.5482 14.8737 15.6792 15.066 15.8715C15.2583 16.0638 15.3893 16.3088 15.4423 16.5755C15.4954 16.8422 15.4682 17.1187 15.3641 17.3699C15.26 17.6212 15.0838 17.8359 14.8577 17.987C14.6315 18.1381 14.3657 18.2187 14.0937 18.2187C13.7291 18.2187 13.3793 18.0739 13.1215 17.816C12.8636 17.5582 12.7187 17.2084 12.7187 16.8437ZM7.90625 15.4687C7.6343 15.4687 7.36846 15.5494 7.14234 15.7005C6.91622 15.8516 6.73998 16.0663 6.63591 16.3176C6.53184 16.5688 6.50461 16.8453 6.55767 17.112C6.61072 17.3787 6.74168 17.6237 6.93398 17.816C7.12627 18.0083 7.37128 18.1393 7.638 18.1923C7.90472 18.2454 8.18119 18.2182 8.43244 18.1141C8.68369 18.01 8.89843 17.8338 9.04952 17.6077C9.20061 17.3815 9.28125 17.1157 9.28125 16.8437C9.28125 16.4791 9.13638 16.1293 8.87852 15.8715C8.62066 15.6136 8.27092 15.4687 7.90625 15.4687ZM14.0937 12.375C14.3657 12.375 14.6315 12.2944 14.8577 12.1433C15.0838 11.9922 15.26 11.7774 15.3641 11.5262C15.4682 11.2749 15.4954 10.9985 15.4423 10.7318C15.3893 10.465 15.2583 10.22 15.066 10.0277C14.8737 9.83543 14.6287 9.70447 14.362 9.65142C14.0953 9.59836 13.8188 9.62559 13.5676 9.72966C13.3163 9.83374 13.1016 10.01 12.9505 10.2361C12.7994 10.4622 12.7187 10.7281 12.7187 11C12.7187 11.3647 12.8636 11.7144 13.1215 11.9723C13.3793 12.2301 13.7291 12.375 14.0937 12.375ZM7.90625 12.375C8.1782 12.375 8.44404 12.2944 8.67016 12.1433C8.89628 11.9922 9.07251 11.7774 9.17658 11.5262C9.28065 11.2749 9.30788 10.9985 9.25483 10.7318C9.20177 10.465 9.07082 10.22 8.87852 10.0277C8.68622 9.83543 8.44122 9.70447 8.1745 9.65142C7.90777 9.59836 7.63131 9.62559 7.38006 9.72966C7.12881 9.83374 6.91407 10.01 6.76298 10.2361C6.61189 10.4622 6.53125 10.7281 6.53125 11C6.53125 11.3647 6.67611 11.7144 6.93398 11.9723C7.19184 12.2301 7.54158 12.375 7.90625 12.375ZM14.0937 6.53125C14.3657 6.53125 14.6315 6.45061 14.8577 6.29952C15.0838 6.14843 15.26 5.93369 15.3641 5.68244C15.4682 5.43119 15.4954 5.15472 15.4423 4.888C15.3893 4.62128 15.2583 4.37627 15.066 4.18398C14.8737 3.99168 14.6287 3.86072 14.362 3.80767C14.0953 3.75461 13.8188 3.78184 13.5676 3.88591C13.3163 3.98998 13.1016 4.16622 12.9505 4.39234C12.7994 4.61846 12.7187 4.8843 12.7187 5.15625C12.7187 5.52092 12.8636 5.87066 13.1215 6.12852C13.3793 6.38638 13.7291 6.53125 14.0937 6.53125ZM7.90625 6.53125C8.1782 6.53125 8.44404 6.45061 8.67016 6.29952C8.89628 6.14843 9.07251 5.93369 9.17658 5.68244C9.28065 5.43119 9.30788 5.15472 9.25483 4.888C9.20177 4.62128 9.07082 4.37627 8.87852 4.18398C8.68622 3.99168 8.44122 3.86072 8.1745 3.80767C7.90777 3.75461 7.63131 3.78184 7.38006 3.88591C7.12881 3.98998 6.91407 4.16622 6.76298 4.39234C6.61189 4.61846 6.53125 4.8843 6.53125 5.15625C6.53125 5.52092 6.67611 5.87066 6.93398 6.12852C7.19184 6.38638 7.54158 6.53125 7.90625 6.53125Z"
        fill="#808582"
      />
    </svg>
  );
}

function haveSameIds(a: string[], b: string[]) {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  return sortedA.every((value, index) => value === sortedB[index]);
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
        if (cell.column.id === "select") {
          return (
            <style.BodyCell key={cell.id} $align="center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </style.BodyCell>
          );
        }

        if (cell.column.id === "drag") {
          return (
            <style.BodyCell key={cell.id} $align="center">
              <style.DragHandle
                ref={setActivatorNodeRef}
                type="button"
                {...attributes}
                {...listeners}
                disabled={!canDrag}
                aria-label="Drag to reorder file"
              >
                <DragDotsIcon />
              </style.DragHandle>
            </style.BodyCell>
          );
        }

        if (cell.column.id === "name") {
          return (
            <style.BodyCell key={cell.id}>
              <style.FileNameContainer>
                <FileTypeBadge fileName={row.original.name} />
                <style.FileNameText>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </style.FileNameText>
              </style.FileNameContainer>
            </style.BodyCell>
          );
        }

        return (
          <style.BodyCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </style.BodyCell>
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
        if (cell.column.id === "select") {
          return (
            <style.BodyCell key={cell.id} $align="center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </style.BodyCell>
          );
        }

        if (cell.column.id === "drag") {
          return (
            <style.BodyCell key={cell.id} $align="center">
              <style.DragHandle
                type="button"
                disabled
                aria-label="Drag to reorder file"
              >
                <DragDotsIcon />
              </style.DragHandle>
            </style.BodyCell>
          );
        }

        if (cell.column.id === "name") {
          return (
            <style.BodyCell key={cell.id}>
              <style.FileNameContainer>
                <FileTypeBadge fileName={row.original.name} />
                <style.FileNameText>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </style.FileNameText>
              </style.FileNameContainer>
            </style.BodyCell>
          );
        }

        return (
          <style.BodyCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </style.BodyCell>
        );
      })}
    </tr>
  );
}

type TableMarkupProps = {
  table: ReturnType<typeof useReactTable<FileRow>>;
  renderedRows: Row<FileRow>[];
  isInteractiveDisabled: boolean;
  isMounted: boolean;
  canDrag: boolean;
};

function TableMarkup({
  table,
  renderedRows,
  isInteractiveDisabled,
  isMounted,
  canDrag,
}: TableMarkupProps) {
  return (
    <style.StyledTable>
      <style.TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              const canSort = header.column.getCanSort();
              const sortDirection = header.column.getIsSorted();

              if (header.id === "select") {
                return (
                  <style.HeaderCell key={header.id} $align="center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </style.HeaderCell>
                );
              }

              if (header.id === "drag") {
                return (
                  <style.HeaderCell key={header.id} $align="center">
                    {null}
                  </style.HeaderCell>
                );
              }

              return (
                <style.HeaderCell key={header.id}>
                  {header.isPlaceholder ? null : canSort ? (
                    <style.SortButton
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      disabled={isInteractiveDisabled}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sortDirection === "asc"
                        ? "↑"
                        : sortDirection === "desc"
                          ? "↓"
                          : ""}
                    </style.SortButton>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                </style.HeaderCell>
              );
            })}
          </tr>
        ))}
      </style.TableHead>

      <style.TableBody>
        {isMounted
          ? renderedRows.map(row => (
              <SortableRow key={row.id} row={row} canDrag={canDrag} />
            ))
          : renderedRows.map(row => <StaticRow key={row.id} row={row} />)}
      </style.TableBody>
    </style.StyledTable>
  );
}

export default function FilesTable({
  files,
  searchTerm,
  isDeleting,
  onReorderFiles,
  isReordering,
  selectedFileIds,
  onSelectionChange,
}: FilesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const nextSelection = Object.fromEntries(
      selectedFileIds.map(fileId => [fileId, true]),
    ) as RowSelectionState;

    setRowSelection(prevSelection => {
      const currentSelectedIds = Object.keys(prevSelection).filter(
        id => prevSelection[id],
      );

      if (haveSameIds(currentSelectedIds, selectedFileIds)) {
        return prevSelection;
      }

      return nextSelection;
    });
  }, [selectedFileIds]);

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
  const hasNoFiles = files.length === 0;
  const hasNoSearchResults = files.length > 0 && filteredFiles.length === 0;
  const isInteractiveDisabled = isDeleting || isReordering;

  useEffect(() => {
    if (!haveSameIds(selectedIds, selectedFileIds)) {
      onSelectionChange(selectedIds);
    }
  }, [onSelectionChange, selectedFileIds, selectedIds]);

  function reindexFiles(nextFiles: FileRow[]) {
    return nextFiles.map((file, index) => ({
      ...file,
      order: index,
    }));
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

  return (
    <style.TableSection>
      {sorting.length > 0 && (
        <style.StatusText>
          Sorting is active. Clear sorting to drag and manually reorder files.
        </style.StatusText>
      )}

      {isSearchActive && (
        <style.StatusText>
          Search is active. Clear search to drag and manually reorder files.
        </style.StatusText>
      )}

      <style.TableCard>
        {hasNoFiles ? (
          <style.EmptyState>
            <style.EmptyText>
              No files have been added to this lesson yet.
            </style.EmptyText>
          </style.EmptyState>
        ) : hasNoSearchResults ? (
          <style.EmptyState>
            <style.EmptyText>No files match your search.</style.EmptyText>
          </style.EmptyState>
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
                isInteractiveDisabled={isInteractiveDisabled}
                isMounted={true}
                canDrag={isManualOrderMode}
              />
            </SortableContext>
          </DndContext>
        ) : (
          <TableMarkup
            table={table}
            renderedRows={renderedRows}
            isInteractiveDisabled={isInteractiveDisabled}
            isMounted={false}
            canDrag={false}
          />
        )}

        {!hasNoFiles && !hasNoSearchResults && (
          <style.FooterRow>
            <style.FooterText>
              {selectedCount} of {files.length} selected
            </style.FooterText>

            <style.FooterText $column="size">
              Total size: {formatBytes(totalSizeBytes)}
            </style.FooterText>
          </style.FooterRow>
        )}
      </style.TableCard>
    </style.TableSection>
  );
}
