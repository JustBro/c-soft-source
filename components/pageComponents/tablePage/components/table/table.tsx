import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { CellType, TableCell, TableColumn } from "@/types/table-types";
import { IconPlus } from "@/components/uiComponents/icons/iconPlus";
import TableHeadCell from "../tableHeadCell/tableHeadCell";
import TableRow from "../tableRow/tableRow";

import styles from "./table.module.scss";

interface TableProps {
  tableData: TableColumn[];
  tableRows: Array<TableCell[]>;
  onColumnAdd: (cellType: CellType) => void;
  onColumnDelete: (columnId: number) => void;
  onRowAdd: () => void;
  onRowDelete: (rowId: number) => void;
  onColumnNameEdit: (columnId: number, name: string) => void;
  onCellValueEdit: (value: string, cellId: number, columnId: number) => void;
}

export default function Table({
  tableData,
  tableRows,
  onColumnAdd,
  onColumnDelete,
  onRowAdd,
  onRowDelete,
  onColumnNameEdit,
  onCellValueEdit,
}: TableProps) {
  const [showAddColumn, setShowAddColumn] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => {
      setShowAddColumn(false);
    });

    return () => {
      window.removeEventListener("click", () => {
        setShowAddColumn(false);
      });
    };
  }, []);

  const handleColumnTypePick = (event: ChangeEvent<HTMLInputElement>) => {
    onColumnAdd(event.target.value as CellType);
    setShowAddColumn(false);
  };

  const onBtnAddColumnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowAddColumn(!showAddColumn);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableData.map((column) => (
              <TableHeadCell
                onColumnDelete={onColumnDelete}
                onColumnNameEdit={onColumnNameEdit}
                key={column.columnId}
                column={column}
              />
            ))}
            <th>
              <button
                className={styles.btnAddColumn}
                onClick={onBtnAddColumnClick}
              >
                <IconPlus />
                {showAddColumn && (
                  <div
                    className={styles.columnTypes}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value={CellType.TEXT}
                        onChange={handleColumnTypePick}
                      />
                      Текст
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value={CellType.PERCENT}
                        onChange={handleColumnTypePick}
                      />
                      Проценты
                    </label>
                  </div>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.length > 0 &&
            tableRows.map((row) => (
              <TableRow
                onRowDelete={onRowDelete}
                onCellValueEdit={onCellValueEdit}
                row={row}
                key={row[0].rowId}
              />
            ))}
        </tbody>
        {tableData.length > 0 && (
          <tfoot>
            <tr>
              <td>
                <button onClick={onRowAdd}>
                  <IconPlus />
                </button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
