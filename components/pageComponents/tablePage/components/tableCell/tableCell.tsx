import React, { ChangeEvent, useState } from "react";

import { CellType, TableCell as TTableCell } from "@/types/table-types";

interface TableCellProps {
  cell: TTableCell;
  onCellValueEdit: (value: string, cellId: number, columnId: number) => void;
}

export default function TableCell({
  cell: { value, cellId, columnId, cellType },
  onCellValueEdit,
}: TableCellProps) {
  const [cellValue, setCellValue] = useState(value);

  const handleInputBlure = () => {    
    if (cellValue !== value) {
      onCellValueEdit(cellValue, cellId, columnId);
    }
  };

  const onCellValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (cellType === CellType.TEXT) {
      setCellValue(value);
    } else if (cellType === CellType.PERCENT && /^\d*$/.test(value)) {
      setCellValue(value);
    }
  };

  return (
    <td>
      <input
        type="text"
        value={cellValue}
        onBlur={handleInputBlure}
        onChange={onCellValueChange}
        placeholder={cellType === CellType.PERCENT ? "Проценты" : "Текст"}
      />
    </td>
  );
}
