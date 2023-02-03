import React from "react";
import { TableItem } from "../TeaTable/TeaTable.props";
import { TableHeaderProps } from "./TableHeader.props";

const TableHeader = ({ columns, onSort, selectedSort }: TableHeaderProps) => {
  const renderSortArrow = (selectedSort: TableItem, column: string) => {
    if (selectedSort.path === column) {
      if (selectedSort.order === "asc") {
        return <p>down </p>;
      } else {
        return <p>up </p>;
      }
    }
    return null;
  };
  const handleSort = (item: string) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {renderSortArrow(selectedSort, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
