"use client";

import React, { useMemo, useState } from "react";
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
                  <FileIconFrame>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M10.4168 4.1665H4.16683C3.021 4.1665 2.09391 5.104 2.09391 6.24984L2.0835 18.7498C2.0835 19.8957 3.021 20.8332 4.16683 20.8332H20.8335C21.9793 20.8332 22.9168 19.8957 22.9168 18.7498V8.33317C22.9168 7.18734 21.9793 6.24984 20.8335 6.24984H12.5002L10.4168 4.1665Z"
                        fill="white"
                      />
                    </svg>
                  </FileIconFrame>

                  <FileName title={file.name}>{file.name}</FileName>
                </FileNameContainer>
              </BodyCell>

              <BodyCell>{file.dateAdded}</BodyCell>
              <BodyCell>{file.dateModified}</BodyCell>
              <BodyCell>{formatSize(file.sizeBytes)}</BodyCell>

              <BodyCell>
                <DownloadIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                  >
                    <path
                      d="M0.787598 14.2876V16.9876C0.787598 17.465 0.97724 17.9228 1.31481 18.2604C1.65237 18.598 2.11021 18.7876 2.5876 18.7876H15.1876C15.665 18.7876 16.1228 18.598 16.4604 18.2604C16.798 17.9228 16.9876 17.465 16.9876 16.9876V14.2876M5.2876 9.7876L8.8876 13.3876M8.8876 13.3876L12.4876 9.7876M8.8876 13.3876V0.787598"
                      stroke="#4B4A49"
                      strokeWidth="1.575"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </DownloadIcon>
              </BodyCell>
            </BodyRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
