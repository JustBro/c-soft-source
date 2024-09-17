"use client";

import React, { MouseEvent } from "react";
import { TableCell as TTableCell } from "@/types/table-types";
import TableCell from "../tableCell/tableCell";
import { generateId } from "@/shared/lib";
import { IconTrash } from "@/components/uiComponents/icons/iconTrash";

interface TRowProps {
  row: TTableCell[];
  onRowDelete: (rowId: number) => void;
  onCellValueEdit: (value: string, cellId: number, columnId: number) => void;
}

export default function TableRow({
  row,
  onRowDelete,
  onCellValueEdit,
}: TRowProps) {
  const handleDeleteRow = (event: MouseEvent<HTMLButtonElement>) => {
    onRowDelete(Number(event.currentTarget.dataset.rowId));
  };
  return (
    <tr>
      {row.map((cell) => (
        <TableCell
          onCellValueEdit={onCellValueEdit}
          cell={cell}
          key={generateId()}
        />
      ))}
      <td>
        <button data-row-id={row[0].rowId} onClick={handleDeleteRow}>
          <IconTrash />
        </button>
      </td>
    </tr>
  );
}
