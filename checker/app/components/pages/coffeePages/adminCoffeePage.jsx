import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus
} from "../../../store/coffeeItems/coffeeItems";
import {
  countriesRemove,
  createNewCountriesItem,
  getCountriesList,
  getCountriesLoadingStatus
} from "../../../store/coffeeItems/countries";
import {
  brandsRemove,
  createNewBrandsItem,
  getBrandsList,
  getBrandsLoadingStatus
} from "../../../store/coffeeItems/brands";
import {
  createNewMethodsItem,
  getMethodsList,
  getMethodsLoadingStatus,
  methodsRemove
} from "../../../store/coffeeItems/methods";
import {
  createNewKindsItem,
  getKindsList,
  getKindsLoadingStatus,
  kindsRemove
} from "../../../store/coffeeItems/kinds";
import CoffeeTable from "../../common/table/coffeeTable";
import Entity from "../../ui/entity";
import _ from "lodash";

const AdminCoffeePage = () => {
  const dispatch = useDispatch();
  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());
  const brands = useSelector(getBrandsList());
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countries = useSelector(getCountriesList());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methods = useSelector(getMethodsList());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kinds = useSelector(getKindsList());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());
  const coffeeItems = useSelector(getCoffeeItemsList());
  const [sortBy, setSortBy] = useState({ path: "brand", order: "asc" });
  const [show, setShow] = useState(false);

  const handleDelete = (id, name) => {
    const items = {
      brands: brandsRemove(id),
      countries: countriesRemove(id),
      kinds: kindsRemove(id),
      methods: methodsRemove(id)
    };
    dispatch(items[name]);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleShow = () => {
    setShow(!show);
  };

  const sortedItems = _.orderBy(coffeeItems, [sortBy.path], [sortBy.order]);

  const handleSubmit = (value) => {
    const ItemName = Object.keys(value);
    const addItem = {
      value: value[ItemName[0]]
    };
    const items = {
      brands: createNewBrandsItem(addItem),
      countries: createNewCountriesItem(addItem),
      kinds: createNewKindsItem(addItem),
      methods: createNewMethodsItem(addItem)
    };

    dispatch(items[ItemName]);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-end">
        <div className="card align-items-center p-1">
          <div className={show ? "entity-show" : "entity-hid"}>
            <div className="d-flex">
              <Entity
                loading={brandsLoadingStatus}
                items={brands}
                label="Добавить Бренд"
                name="brands"
                onDelete={handleDelete}
                onSubmit={handleSubmit}
              />
              <Entity
                loading={countriesLoadingStatus}
                items={countries}
                label="Добавить Страну"
                name="countries"
                onDelete={handleDelete}
                onSubmit={handleSubmit}
              />
              <Entity
                loading={kindsLoadingStatus}
                items={kinds}
                label="Добавить Сорт"
                name="kinds"
                onDelete={handleDelete}
                onSubmit={handleSubmit}
              />
              <Entity
                loading={methodsLoadingStatus}
                items={methods}
                label="Добавить Метод Обработки"
                name="methods"
                onDelete={handleDelete}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
          <button
            className="badge bg-primary rounded-pill w-25"
            style={{ border: "none" }}
            onClick={handleShow}
          >
            <i className={show ? "bi bi-caret-up" : "bi bi-caret-down"}></i>
          </button>
        </div>
        <button className="btn btn-white me-5 h-25">
          <Link className="text-primary fs-3" to={"/adminPanel/coffee/create"}>
            <i className="bi bi-file-earmark-plus-fill"></i>
          </Link>
        </button>
      </div>
      {!coffeeItemsLoading ? (
        <CoffeeTable
          coffeeItems={sortedItems}
          onSort={handleSort}
          selectedSort={sortBy}
        />
      ) : (
        <div className="d-flex justify-content-center w-100 mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCoffeePage;
