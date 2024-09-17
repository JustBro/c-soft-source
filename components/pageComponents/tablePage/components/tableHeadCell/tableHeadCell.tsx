import React, { ChangeEvent, MouseEvent, useState } from "react";

import { TableColumn } from "@/types/table-types";
import { IconTrash } from "@/components/uiComponents/icons/iconTrash";

interface ThCellProps {
  column: TableColumn;
  onColumnDelete: (columnId: number) => void;
  onColumnNameEdit: (columnId: number, name: string) => void;
}

export default function TableHeadCell({
  column,
  onColumnDelete,
  onColumnNameEdit,
}: ThCellProps) {
  const [name, setName] = useState(column.columnName);

  const handleColumnDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const columnId = Number(event.currentTarget.dataset.columnId);

    onColumnDelete(columnId);
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleInputBlure = () => {
    onColumnNameEdit(column.columnId, name);
  };

  return (
    <th>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        onBlur={handleInputBlure}
        placeholder="Название стобца"
      />
      <button data-column-id={column.columnId} onClick={handleColumnDelete}>
        <IconTrash />
      </button>
    </th>
  );
}
