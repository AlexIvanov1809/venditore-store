import React from "react";
import TableHeader from "../TableHeader/TableHeader";
import TableBody from "../TableBody/TableBody";
import { TableProps } from "./Table.props";

const Table = ({
  columns,
  data,
  type,
  onSort,
  selectedSort,
  ...props
}: TableProps) => {
  return (
    <table className="table" {...props}>
      <TableHeader {...{ columns, onSort, selectedSort }} />
      {data && data.length > 0 ? (
        <TableBody {...{ columns, data, type }} />
      ) : (
        <tbody>
          <tr>
            <td className="fw-bold ">Нет данных</td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default Table;
