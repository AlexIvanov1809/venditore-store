import { useEffect } from "react";
import { loadCoffeeItemsList } from "../../store/coffeeItems/coffeeItems";
import { loadCountriesList } from "../../store/coffeeItems/countries";
import { loadMethodsList } from "../../store/coffeeItems/methods";
import { loadKindsList } from "../../store/coffeeItems/kinds";
import { loadTeaItemsList } from "../../store/teaItems/teaItems";
import { loadTeaTypesList } from "../../store/teaItems/teaType";
import { loadTeaBrandsList } from "../../store/teaItems/teaBrands";
import { loadTeaPackagesList } from "../../store/teaItems/teaPackages";
// import { loadBasketList } from "../../store/consumerBasket";
import { loadBrandsList } from "../../store/coffeeItems/brands";
import { useAppDispatch } from "../redux";
import { AppLoaderProps } from "./AppLoader.props";

const AppLoader = ({ children }: AppLoaderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadBrandsList());
    dispatch(loadCountriesList());
    dispatch(loadMethodsList());
    dispatch(loadKindsList());
    dispatch(loadTeaItemsList());
    dispatch(loadTeaTypesList());
    dispatch(loadTeaBrandsList());
    dispatch(loadTeaPackagesList());
    // dispatch(loadBasketList());
  }, []);

  return <>{children}</>;
};

export default AppLoader;
