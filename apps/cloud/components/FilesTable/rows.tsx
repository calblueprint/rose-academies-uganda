import type { FileRow } from "./index";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Row } from "@tanstack/react-table";
import FileTypeBadge from "@/components/FileTypeBadge";
import { IconSvgs } from "@/lib/icons";
import * as style from "./styles";

type SortableRowProps = {
  row: Row<FileRow>;
  canDrag: boolean;
};

export function SortableRow({ row, canDrag }: SortableRowProps) {
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

type StaticRowProps = {
  row: Row<FileRow>;
};

export function StaticRow({ row }: StaticRowProps) {
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
