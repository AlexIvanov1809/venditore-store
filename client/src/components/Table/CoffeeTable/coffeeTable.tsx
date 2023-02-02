import React from "react";
import Table from "../Table/Table";
import { CoffeeTableProps } from "./CoffeeTable.props";
import { ICoffeeItem } from "../../../models/ICoffeeItem";
import PriceForTable from "../../PriceForTable/PriceForTable";
import { ITeaItem } from "../../../models/ITeaItem";

const CoffeeTable = ({
  coffeeItems,
  onSort,
  selectedSort,
}: CoffeeTableProps) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд",
    },
    countries: {
      path: "country",
      name: "Страна",
    },
    sortName: {
      path: "sortName",
      name: "Сорт, название смеси",
    },
    method: {
      path: "method",
      name: "Метод обработки",
    },
    kind: {
      path: "kind",
      name: "Метод обработки",
    },
    preparationMethod: {
      path: "preparationMethod",
      name: "Метод приготовления",
    },
    price: {
      path: "price",
      name: "Стоимость",
      component: (item: ITeaItem | ICoffeeItem) => {
        if (typeof item.price === "object") {
          return <PriceForTable price={item.price} />;
        } else {
          return <></>;
        }
      },
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
      data={coffeeItems}
      onSort={onSort}
      selectedSort={selectedSort}
      type="coffee"
    />
  );
};

export default CoffeeTable;
