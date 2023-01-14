import React, { useEffect, useState } from "react";
import { TeaSidebarProps } from "./TeaSidebar.props";
import styles from "./TeaSidebar.module.css";
import { useAppSelector } from "../../hooks/redux";
import { FilterGroupList } from "..";
import { IHandleChange } from "../FilterGroupList/FilterGroupList";
import {
  getTeaBrandsList,
  getTeaBrandsLoadingStatus,
} from "../../store/teaItems/teaBrands";
import {
  getTeaTypesList,
  getTeaTypesLoadingStatus,
} from "../../store/teaItems/teaType";
import {
  getTeaPackagesList,
  getTeaPackagesLoadingStatus,
} from "../../store/teaItems/teaPackages";

const TeaSidebar = ({
  getSelect,
  className,
  ...props
}: TeaSidebarProps): JSX.Element => {
  const [reset, setReset] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    type: [],
    package: [],
  });
  useEffect(() => {
    getSelect(selectedItems);
  }, [selectedItems]);
  const brandsLoadingStatus = useAppSelector(getTeaBrandsLoadingStatus());
  const typesLoadingStatus = useAppSelector(getTeaTypesLoadingStatus());
  const packagesLoadingStatus = useAppSelector(getTeaPackagesLoadingStatus());
  const brands = useAppSelector(getTeaBrandsList());
  const types = useAppSelector(getTeaTypesList());
  const packages = useAppSelector(getTeaPackagesList());

  const handleFiltered = (items: {
    [key: string]: IHandleChange["name"][];
  }) => {
    setSelectedItems((prevState) => ({ ...prevState, ...items }));
  };

  const handleReset = () => {
    setSelectedItems({
      brand: [],
      type: [],
      package: [],
    });
    setReset(!reset);
  };

  return (
    <aside {...props}>
      <h5 className="pb-2">Фильтры</h5>
      <FilterGroupList
        reset={reset}
        value="Бренд"
        name="brand"
        onFilter={handleFiltered}
        items={brands}
      />

      <FilterGroupList
        reset={reset}
        value="Вид"
        name="type"
        onFilter={handleFiltered}
        items={types}
      />
      <FilterGroupList
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
    </aside>
  );
};

export default TeaSidebar;
