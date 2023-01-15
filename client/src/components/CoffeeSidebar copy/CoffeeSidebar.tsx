import React, { useEffect, useState } from "react";
import { CoffeeSidebarProps } from "./CoffeeSidebar.props";
import styles from "./CoffeeSidebar.module.css";
import { useAppSelector } from "../../hooks/redux";
import {
  getBrandsList,
  getBrandsLoadingStatus,
} from "../../store/coffeeItems/brands";
import {
  getCountriesList,
  getCountriesLoadingStatus,
} from "../../store/coffeeItems/countries";
import {
  getMethodsList,
  getMethodsLoadingStatus,
} from "../../store/coffeeItems/methods";
import {
  getKindsList,
  getKindsLoadingStatus,
} from "../../store/coffeeItems/kinds";
import { FilterGroupList } from "../";
import { IHandleChange } from "../FilterGroupList/FilterGroupList";

const CoffeeSidebar = ({
  getSelect,
  className,
  ...props
}: CoffeeSidebarProps): JSX.Element => {
  const [reset, setReset] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    country: [],
    method: [],
    kind: [],
  });
  useEffect(() => {
    getSelect(selectedItems);
  }, [selectedItems]);
  const brandsLoadingStatus = useAppSelector(getBrandsLoadingStatus());
  const countriesLoadingStatus = useAppSelector(getCountriesLoadingStatus());
  const methodsLoadingStatus = useAppSelector(getMethodsLoadingStatus());
  const kindsLoadingStatus = useAppSelector(getKindsLoadingStatus());
  const countries = useAppSelector(getCountriesList());
  const brands = useAppSelector(getBrandsList());
  const methods = useAppSelector(getMethodsList());
  const kinds = useAppSelector(getKindsList());

  const handleFiltered = (items: {
    [key: string]: IHandleChange["name"][];
  }) => {
    setSelectedItems((prevState) => ({ ...prevState, ...items }));
  };

  const handleReset = () => {
    setSelectedItems({
      brand: [],
      country: [],
      method: [],
      kind: [],
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
        value="Страна произрастания"
        name="country"
        onFilter={handleFiltered}
        items={countries}
      />

      <FilterGroupList
        reset={reset}
        value="Способ обработки"
        name="method"
        onFilter={handleFiltered}
        items={methods}
      />

      <FilterGroupList
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
    </aside>
  );
};

export default CoffeeSidebar;
