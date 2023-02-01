import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns, type }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };
  return (
    <tbody>
      {data ? (
        data.map((item) => (
          <tr key={item._id}>
            {Object.keys(columns).map((column) => (
              <td key={column}>{renderContent(item, column)}</td>
            ))}
            <td>
              <Link
                className="btn btn-primary"
                to={`/adminPanel/${type}/${item._id}`}
              >
                Открыть
              </Link>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>нет данных</td>
        </tr>
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  columns: PropTypes.object.isRequired
};

export default TableBody;
