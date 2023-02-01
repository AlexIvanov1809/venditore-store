import React from "react";
import PropTypes from "prop-types";
import Price from "../price";
import Table from "./table";

const CoffeeTable = ({ coffeeItems, onSort, selectedSort }) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд"
    },
    countries: {
      path: "country",
      name: "Страна"
    },
    sortName: {
      path: "sortName",
      name: "Сорт, название смеси"
    },
    method: {
      path: "method",
      name: "Метод обработки"
    },
    kind: {
      path: "kind",
      name: "Метод обработки"
    },
    preparationMethod: {
      path: "preparationMethod",
      name: "Метод приготовления"
    },
    price: {
      name: "Стоимость",
      component: (item) => <Price price={item.price} />
    },
    active: {
      path: "active",
      name: "Активность",
      component: (item) => (item.active ? <p>Активный</p> : <p>Неактивен</p>)
    }
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

CoffeeTable.propTypes = {
  coffeeItems: PropTypes.array,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object
};

export default CoffeeTable;
