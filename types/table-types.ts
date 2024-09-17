export interface TableColumn {
  columnName: string;
  columnId: number;
  cellsType: CellType;
  cells: TableCell[];
}

export interface TableCell {
  cellId: number;
  columnId: number;
  rowId: number;
  cellType: CellType;
  value: string;
}

export enum CellType {
  TEXT = "Text",
  PERCENT = "Percents",
}
