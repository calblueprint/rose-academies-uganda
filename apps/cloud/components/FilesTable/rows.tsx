import type { FileRow } from "./index";
import { MouseEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Row } from "@tanstack/react-table";
import FileTypeBadge from "@/components/FileTypeBadge";
import { IconSvgs } from "@/lib/icons";
import * as style from "./styles";

type SortableRowProps = {
  row: Row<FileRow>;
  canDrag: boolean;
  onRowClick?: (file: FileRow) => void;
};

type StaticRowProps = {
  row: Row<FileRow>;
  onRowClick?: (file: FileRow) => void;
};

// Rows are clickable for previews, but table controls should keep their own behavior.
function shouldIgnoreRowClick(event: MouseEvent<HTMLTableRowElement>) {
  const target = event.target as HTMLElement;

  return Boolean(
    target.closest(
      'button, input, a, [role="button"], [data-prevent-row-click="true"]',
    ),
  );
}

export function SortableRow({ row, canDrag, onRowClick }: SortableRowProps) {
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

  function handleRowClick(event: MouseEvent<HTMLTableRowElement>) {
    if (shouldIgnoreRowClick(event) || isDragging || !onRowClick) {
      return;
    }

    onRowClick(row.original);
  }

  return (
    <tr ref={setNodeRef} style={rowStyle} onClick={handleRowClick}>
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
                {IconSvgs.dragDots}
              </style.DragHandle>
            </style.BodyCell>
          );
        }

        if (cell.column.id === "name") {
          return (
            <style.BodyCell key={cell.id}>
              <style.FileNameContainer>
                <FileTypeBadge fileName={row.original.name} />
                <style.FileNameText>{row.original.name}</style.FileNameText>
              </style.FileNameContainer>
            </style.BodyCell>
          );
        }

        return (
          <style.BodyCell key={cell.id}>
            <style.BodyText>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </style.BodyText>
          </style.BodyCell>
        );
      })}
    </tr>
  );
}

export function StaticRow({ row, onRowClick }: StaticRowProps) {
  function handleRowClick(event: MouseEvent<HTMLTableRowElement>) {
    if (shouldIgnoreRowClick(event) || !onRowClick) {
      return;
    }

    onRowClick(row.original);
  }

  return (
    <tr onClick={handleRowClick}>
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
                {IconSvgs.dragDots}
              </style.DragHandle>
            </style.BodyCell>
          );
        }

        if (cell.column.id === "name") {
          return (
            <style.BodyCell key={cell.id}>
              <style.FileNameContainer>
                <FileTypeBadge fileName={row.original.name} />
                <style.FileNameText>{row.original.name}</style.FileNameText>
              </style.FileNameContainer>
            </style.BodyCell>
          );
        }

        return (
          <style.BodyCell key={cell.id}>
            <style.BodyText>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </style.BodyText>
          </style.BodyCell>
        );
      })}
    </tr>
  );
}
