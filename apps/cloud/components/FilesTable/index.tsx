"use client";

// This table combines TanStack Table for sorting/selection
// and DnD Kit for drag-and-drop reordering.

// TanStack Table triggers this eslint warning because some table APIs return
// objects/functions that the React Hooks lint rule cannot verify as stable.
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { getFileTableColumns } from "./columns";
import { formatBytes, haveSameIds, reindexFiles } from "./helpers";
import { SortableRow, StaticRow } from "./rows";
import * as style from "./styles";

export type FileRow = {
  id: string;
  name: string;
  sizeBytes: number;
  createdAt: string;
  updatedAt: string;
  order: number;
  storagePath?: string | null;
  mimeType?: string | null;
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
  onRowClick?: (file: FileRow) => void;
};

type TableMarkupProps = {
  table: ReturnType<typeof useReactTable<FileRow>>;
  renderedRows: Row<FileRow>[];
  isInteractiveDisabled: boolean;
  isMounted: boolean;
  canDrag: boolean;
  onRowClick?: (file: FileRow) => void;
};

// Keep table markup in one place so the mounted and non-mounted render paths
// stay visually identical. Only the row component changes for drag support.
function TableMarkup({
  table,
  renderedRows,
  isInteractiveDisabled,
  isMounted,
  canDrag,
  onRowClick,
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
                      <style.HeaderText>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </style.HeaderText>
                      <style.HeaderText as="span">
                        {sortDirection === "asc"
                          ? "↑"
                          : sortDirection === "desc"
                            ? "↓"
                            : ""}
                      </style.HeaderText>
                    </style.SortButton>
                  ) : (
                    <style.HeaderText>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </style.HeaderText>
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
              <SortableRow
                key={row.id}
                row={row}
                canDrag={canDrag}
                onRowClick={onRowClick}
              />
            ))
          : renderedRows.map(row => (
              <StaticRow key={row.id} row={row} onRowClick={onRowClick} />
            ))}
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
  onRowClick,
}: FilesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isMounted, setIsMounted] = useState(false);

  // Selection is controlled by the parent, so we mirror selectedFileIds into TanStack state.
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

  // Enable DnD only after mount to avoid hydration issues.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sensors control how drag-and-drop starts.
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

  // Keep manual order as the base order so searching does not change the user's saved order.
  const filteredFiles = useMemo(() => {
    const manualOrderFiles = [...files].sort((a, b) => a.order - b.order);

    if (!normalizedSearchTerm) {
      return manualOrderFiles;
    }

    return manualOrderFiles.filter(file =>
      file.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [files, normalizedSearchTerm]);

  // Total size should include all files, not just search results.
  const totalSizeBytes = useMemo(() => {
    return files.reduce((sum, file) => sum + file.sizeBytes, 0);
  }, [files]);

  const columns = useMemo(
    () =>
      getFileTableColumns({
        isDeleting,
        isReordering,
      }),
    [isDeleting, isReordering],
  );

  // TanStack Table owns sorting, row selection, and row rendering helpers.
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

  // Disable dragging while sorting/searching because the visible order no longer matches manual order.
  const isManualOrderMode =
    sorting.length === 0 && !isSearchActive && !isDeleting && !isReordering;

  const selectedIds = useMemo(() => {
    return Object.keys(rowSelection).filter(id => rowSelection[id]);
  }, [rowSelection]);

  const selectedCount = selectedIds.length;
  const hasNoFiles = files.length === 0;
  const hasNoSearchResults = files.length > 0 && filteredFiles.length === 0;
  const isInteractiveDisabled = isDeleting || isReordering;

  // Notify the parent only when selected IDs actually change to avoid update loops.
  useEffect(() => {
    if (!haveSameIds(selectedIds, selectedFileIds)) {
      onSelectionChange(selectedIds);
    }
  }, [onSelectionChange, selectedFileIds, selectedIds]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Ignore invalid drops.
    if (!over || active.id === over.id || !isManualOrderMode) {
      return;
    }

    // Reorder from the full file list, not renderedRows, because renderedRows may be sorted/filtered.
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
                onRowClick={onRowClick}
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
            onRowClick={onRowClick}
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
