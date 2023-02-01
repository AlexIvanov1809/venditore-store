import React from "react";
import Table from "../Table/Table";
import { TeaTableProps } from "./TeaTable.props";
import { ITeaItem } from "../../../store/models/ITeaItem";
import { ICoffeeItem } from "../../../store/models/ICoffeeItem";

const TeaTable = ({ teaItems, onSort, selectedSort }: TeaTableProps) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд",
    },
    teaTypes: {
      path: "type",
      name: "Вид",
    },
    name: {
      path: "name",
      name: "Название",
    },
    weight: {
      path: "weight",
      name: "Вес",
    },
    price: {
      path: "price",
      name: "Стоимость",
    },
    active: {
      path: "active",
      name: "Активность",
      component: (item: ITeaItem | ICoffeeItem) =>
        item.active ? <p>Активный</p> : <p>Неактивен</p>,
    },
  };

  return (
    <Table
      columns={columns}
      data={teaItems}
      onSort={onSort}
      selectedSort={selectedSort}
      type="tea"
    />
  );
};

export default TeaTable;
