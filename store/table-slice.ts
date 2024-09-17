import { generateId } from "@/shared/lib";
import { CellType, TableCell, TableColumn } from "@/types/table-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  tableData: TableColumn[];
}

const initialState: TableState = {
  tableData: [],
};

const generateCells = (
  tableData: TableColumn[],
  columnId: number,
  cellsType: CellType
) => {
  const cells: TableCell[] = [];
  const rowIds = tableData[0].cells.map((cell) => cell.rowId);

  rowIds.forEach((id) => {
    cells.push({
      cellId: generateId(),
      columnId: columnId,
      cellType: cellsType,
      rowId: id,
      value: "",
    });
  });

  return cells;
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<CellType>) => {
      const tableData = state.tableData;
      const cellsType = action.payload;
      const columnId = generateId();

      tableData.push({
        columnName: "",
        columnId: columnId,
        cellsType: cellsType,
        cells:
          tableData.length === 0 || tableData[0].cells.length === 0
            ? []
            : generateCells(tableData, columnId, cellsType),
      });
    },
    deleteColumn: (state, action: PayloadAction<number>) => {
      const tableData = state.tableData;
      const columnId = action.payload;

      const columnIndex = tableData.findIndex(
        (column) => column.columnId === columnId
      );

      tableData.splice(columnIndex, 1);
    },
    renameColumn: (
      state,
      action: PayloadAction<{ columnId: number; name: string }>
    ) => {
      const tableData = state.tableData;
      const columnId = action.payload.columnId;
      const name = action.payload.name;

      const columnIndex = tableData.findIndex(
        (column) => column.columnId === columnId
      );

      tableData[columnIndex].columnName = name;
    },
    addRow: (state, ) => {
      const rowId = generateId();

      state.tableData.forEach((column) => {
        column.cells.push({
          cellId: generateId(),
          cellType: column.cellsType,
          columnId: column.columnId,
          rowId: rowId,
          value: "",
        });
      });
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      const rowId = action.payload;

      state.tableData.forEach((column) => {
        const cellIndex = column.cells.findIndex(
          (cell) => cell.rowId === rowId
        );

        column.cells.splice(cellIndex, 1);
      });
    },
    editCell: (
      state,
      action: PayloadAction<{ value: string; cellId: number; columnId: number }>
    ) => {
      const tableData = state.tableData;
      const value = action.payload.value;
      const cellId = action.payload.cellId;
      const columnId = action.payload.columnId;

      const columnIndex = tableData.findIndex(
        (column) => column.columnId === columnId
      );
      const cells = tableData[columnIndex].cells;
      const cellIndex = cells.findIndex((cell) => {
        return cell.cellId === cellId;
      });

      cells[cellIndex].value = value;
    },
  },
});

export const {
  addColumn,
  deleteColumn,
  renameColumn,
  addRow,
  deleteRow,
  editCell,
} = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
