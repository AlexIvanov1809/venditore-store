import React from "react";
import { Link } from "react-router-dom";
import { TableBodyProps } from "./TableBody.props";
import { ITeaItem } from "../../../store/models/ITeaItem";
import { ICoffeeItem } from "../../../store/models/ICoffeeItem";

const TableBody = ({ data, columns, type }: TableBodyProps) => {
  const renderContent = (item: ITeaItem | ICoffeeItem, column: string) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    const key = columns[column].path as keyof (ICoffeeItem | ITeaItem);
    return item[key];
  };
  return (
    <tbody>
      {data ? (
        data.map((item) => (
          <tr key={item._id}>
            {Object.keys(columns).map((column) => (
              <td key={column}>
                <>{renderContent(item, column)}</>
              </td>
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

export default TableBody;
