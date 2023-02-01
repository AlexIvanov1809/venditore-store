import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, type, onSort, selectedSort }) => {
  return (
    <table className="table">
      <TableHeader {...{ columns, onSort, selectedSort }} />
      {data.length > 0 ? (
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

Table.propTypes = {
  columns: PropTypes.object,
  selectedSort: PropTypes.object,
  data: PropTypes.array,
  type: PropTypes.string,
  onSort: PropTypes.func
};

export default Table;
