"use client";

import React from "react";
import saveAs from "file-saver";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Table from "./components/table/table";
import { CellType, TableCell, TableColumn } from "@/types/table-types";
import { IconDownload } from "@/components/uiComponents/icons/iconDownload";
import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  editCell,
  renameColumn,
} from "@/store/table-slice";

import styles from "./mainPage.module.scss";


const getTableRows = (tableData: TableColumn[]) => {
  const rows: Array<TableCell[]> = [];

  tableData[0].cells.forEach((_, index) => {
    tableData.forEach((column) => {
      if (!rows[index]) {
        rows.push([]);
      }
      rows[index].push(column.cells[index]);
    });
  });

  return rows;
};

export default function MainPage() {
  const dispatch = useAppDispatch();

  const tableData = useAppSelector((state) => state.tableReducer.tableData);

  const tableRows =
    tableData.length > 0 && tableData[0].cells.length > 0
      ? getTableRows(tableData)
      : [];

  const handleColumnAdd = (cellType: CellType) => {
    dispatch(addColumn(cellType));
  };

  const handleColumnDelete = (columnId: number) => {
    dispatch(deleteColumn(columnId));
  };

  const handleRowAdd = () => {
    dispatch(addRow());
  };

  const handleRowDelete = (rowId: number) => {
    dispatch(deleteRow(rowId));
  };

  const handleCellValueEdit = (
    value: string,
    cellId: number,
    columnId: number
  ) => {
    dispatch(editCell({ value: value, cellId: cellId, columnId: columnId }));
  };

  const handleColumnNameEdit = (columnId: number, name: string) => {
    dispatch(renameColumn({ columnId: columnId, name: name }));
  };

  const handleExportBtnClick = () => {
    const json = JSON.stringify(tableData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "data.json");
  };

  return (
    <main>
      <section className="wrapper">
        <button className={styles.btnToJson} onClick={handleExportBtnClick}>
          <IconDownload />
          Экспортировать в JSON
        </button>
        <Table
          tableData={tableData}
          tableRows={tableRows}
          onColumnAdd={handleColumnAdd}
          onColumnDelete={handleColumnDelete}
          onRowAdd={handleRowAdd}
          onRowDelete={handleRowDelete}
          onColumnNameEdit={handleColumnNameEdit}
          onCellValueEdit={handleCellValueEdit}
        />
      </section>
    </main>
  );
}
