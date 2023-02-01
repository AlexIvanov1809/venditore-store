import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import { useSelector } from "react-redux";
import {
  getTeaBrandsList,
  getTeaBrandsLoadingStatus
} from "../../store/teaItems/teaBrands";
import {
  getTeaTypesList,
  getTeaTypesLoadingStatus
} from "../../store/teaItems/teaType";
import {
  getTeaPackagesList,
  getTeaPackagesLoadingStatus
} from "../../store/teaItems/teaPackages";

const TeaSideBar = ({ onSelect }) => {
  const [reset, setReset] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    type: [],
    package: []
  });
  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);
  const brandsLoadingStatus = useSelector(getTeaBrandsLoadingStatus());
  const typesLoadingStatus = useSelector(getTeaTypesLoadingStatus());
  const packagesLoadingStatus = useSelector(getTeaPackagesLoadingStatus());
  const brands = useSelector(getTeaBrandsList());
  const types = useSelector(getTeaTypesList());
  const packages = useSelector(getTeaPackagesList());

  const handleFiltered = (items) => {
    setSelectedItems((prevState) => ({ ...prevState, ...items }));
  };

  const handleReset = () => {
    setSelectedItems({
      brand: [],
      type: [],
      package: []
    });
    setReset(!reset);
  };
  return (
    <aside className="card m-auto p-3 text-center" style={{ width: "300px" }}>
      {!brandsLoadingStatus && !typesLoadingStatus && !packagesLoadingStatus ? (
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
            value="Вид"
            name="type"
            onFilter={handleFiltered}
            items={types}
          />
          <GroupList
            reset={reset}
            value="Упаковка"
            name="package"
            onFilter={handleFiltered}
            items={packages}
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

TeaSideBar.propTypes = {
  onSelect: PropTypes.func
};

export default TeaSideBar;
