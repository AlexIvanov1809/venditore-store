import React from "react";
import PropTypes from "prop-types";
import Table from "./table";

const TeaTable = ({ teaItems, onSort, selectedSort }) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд"
    },
    teaTypes: {
      path: "type",
      name: "Вид"
    },
    name: {
      path: "name",
      name: "Название"
    },
    weight: {
      path: "weight",
      name: "Вес"
    },
    price: {
      path: "price",
      name: "Стоимость"
    },
    active: {
      path: "active",
      name: "",
      component: (item) => (item.active ? <p>Активный</p> : <p>Неактивен</p>)
    }
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

TeaTable.propTypes = {
  teaItems: PropTypes.array,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object
};

export default TeaTable;
