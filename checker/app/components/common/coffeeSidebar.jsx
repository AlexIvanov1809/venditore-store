import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import { useSelector } from "react-redux";
import {
  getBrandsList,
  getBrandsLoadingStatus
} from "../../store/coffeeItems/brands";
import {
  getCountriesList,
  getCountriesLoadingStatus
} from "../../store/coffeeItems/countries";
import {
  getMethodsList,
  getMethodsLoadingStatus
} from "../../store/coffeeItems/methods";
import {
  getKindsList,
  getKindsLoadingStatus
} from "../../store/coffeeItems/kinds";

const CoffeeSideBar = ({ onSelect }) => {
  const [reset, setReset] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    country: [],
    method: [],
    kind: []
  });
  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());
  const countries = useSelector(getCountriesList());
  const brands = useSelector(getBrandsList());
  const methods = useSelector(getMethodsList());
  const kinds = useSelector(getKindsList());

  const handleFiltered = (items) => {
    setSelectedItems((prevState) => ({ ...prevState, ...items }));
  };

  const handleReset = () => {
    setSelectedItems({
      brand: [],
      country: [],
      method: [],
      kind: []
    });
    setReset(!reset);
  };
  return (
    <aside className="card  m-auto p-3 text-center" style={{ width: "300px" }}>
      {!brandsLoadingStatus &&
      !countriesLoadingStatus &&
      !methodsLoadingStatus &&
      !kindsLoadingStatus ? (
        <>
          <h5 className="pb-2">Фильтры</h5>
          <GroupList
            reset={reset}
            value="Бренд"
            name="brand"
            onFilter={handleFiltered}
            items={brands}
          />

          <GroupList
            reset={reset}
            value="Страна произрастания"
            name="country"
            onFilter={handleFiltered}
            items={countries}
          />

          <GroupList
            reset={reset}
            value="Способ обработки"
            name="method"
            onFilter={handleFiltered}
            items={methods}
          />

          <GroupList
            reset={reset}
            value="Особенность кофе"
            name="kind"
            onFilter={handleFiltered}
            items={kinds}
          />

          <div className="w-100 d-flex justify-content-center mt-3 mb-2">
            <button className="btn btn-secondary" onClick={handleReset}>
              Сбросить фильтры
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center w-100 mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </aside>
  );
};

CoffeeSideBar.propTypes = {
  onSelect: PropTypes.func
};

export default CoffeeSideBar;
