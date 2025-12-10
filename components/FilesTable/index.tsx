"use client";

import React, { useMemo, useState } from "react";
import { IconSvgs } from "@/lib/icons";
import {
  BodyCell,
  BodyRow,
  DownloadIcon,
  FileIconFrame,
  FileName,
  FileNameContainer,
  HeadCell,
  HeadRow,
  StyledTable,
  TableContainer,
} from "./style";

// temporary type definition. this has the dates added and date modified,
// which currently doesn't exist in the LocalFile type.
export type FileRow = {
  id: number | string;
  name: string;
  dateAdded: string;
  dateModified: string;
  sizeBytes: number;
};

// Columns that we can sort by.
type SortKey = "name" | "dateAdded" | "dateModified" | "sizeBytes";

// Sorting direction.
type SortDir = "asc" | "desc";

// Props for the FilesTable component: files and a callback function
type FilesTableProps = {
  files: FileRow[];
  onRowClick?: (file: FileRow) => void;
};

/**
 * FilesTable
 *
 * Renders a simple sortable table of files.
 * - Sorting is done in-memory on the provided `files` array.
 * - Clicking a header toggles the sort on that column.
 * - Clicking a row calls `onRowClick` with the FileRow (if provided).
 */
export function FilesTable({ files, onRowClick }: FilesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  /**
   * Called when a header cell is clicked.
   * Case 1: If you click the same column again, flip the direction (asc to desc or vice versa).
   * Case 2: If you click a new column, switch to that column and reset to default (ascending).
   */
  function handleHeaderClick(key: SortKey) {
    if (sortKey === key) {
      // Same column: just toggle the direction.
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      // New column: switch key and reset to ascending.
      setSortKey(key);
      setSortDir("asc");
    }
  }

  /**
   * sortedFiles is derived from:
   * - the original `files` prop
   * - the current sortKey
   * - the current sortDir
   *
   * useMemo avoids re-sorting on every render unless one of these inputs changes.
   */
  const sortedFiles = useMemo(() => {
    const filesCopy = [...files];

    // In-place sort of the copy based on current sortKey/sortDir.
    filesCopy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Numeric sort for sizeBytes.
      if (sortKey === "sizeBytes") {
        const aNum = aVal as number;
        const bNum = bVal as number;
        return sortDir === "asc" ? aNum - bNum : bNum - aNum;
      }

      // Use localeCompare to compare strings.
      const aStr = String(aVal);
      const bStr = String(bVal);
      const cmp = aStr.localeCompare(bStr);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return filesCopy;
  }, [files, sortKey, sortDir]);

  // Handler for when a row is clicked. We wrap onRowClick so we can keep the table reusable.
  function handleRowClick(file: FileRow) {
    if (onRowClick) onRowClick(file);
  }

  // File size formatter that converts raw bytes into a string with MB units.
  function formatSize(sizeBytes: number): string {
    const mb = sizeBytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }

  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: "38%" }} />
          <col style={{ width: "19%" }} />
          <col style={{ width: "19%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "6%" }} />
        </colgroup>

        <thead>
          <HeadRow>
            <HeadCell $isSortable onClick={() => handleHeaderClick("name")}>
              Name
            </HeadCell>
            <HeadCell
              $isSortable
              onClick={() => handleHeaderClick("dateAdded")}
            >
              Date Added
            </HeadCell>
            <HeadCell
              $isSortable
              onClick={() => handleHeaderClick("dateModified")}
            >
              Date Modified
            </HeadCell>
            <HeadCell
              $isSortable
              onClick={() => handleHeaderClick("sizeBytes")}
            >
              File Size
            </HeadCell>
            {/* empty header for download column (no label in the design) */}
            <HeadCell />
          </HeadRow>
        </thead>
        <tbody>
          {sortedFiles.map(file => (
            <BodyRow key={file.id} onClick={() => handleRowClick(file)}>
              <BodyCell>
                <FileNameContainer>
                  <FileIconFrame>{IconSvgs.fileTile}</FileIconFrame>
                  <FileName title={file.name}>{file.name}</FileName>
                </FileNameContainer>
              </BodyCell>

              <BodyCell>{file.dateAdded}</BodyCell>
              <BodyCell>{file.dateModified}</BodyCell>
              <BodyCell>{formatSize(file.sizeBytes)}</BodyCell>

              <BodyCell>
                <DownloadIcon>{IconSvgs.download}</DownloadIcon>
              </BodyCell>
            </BodyRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
