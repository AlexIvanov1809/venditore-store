import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { loadCoffeeItemsList } from "../../../store/coffeeItems/coffeeItems";
import { loadbrandsList } from "../../../store/coffeeItems/brands";
import { loadCountriesList } from "../../../store/coffeeItems/countries";
import { loadmethodsList } from "../../../store/coffeeItems/methods";
import { loadkindsList } from "../../../store/coffeeItems/kinds";
import { loadTeaItemsList } from "../../../store/teaItems/teaItems";
import { loadTeaTypesList } from "../../../store/teaItems/teaType";
import { loadTeaBrandsList } from "../../../store/teaItems/teaBrands";
import { loadTeaPackagesList } from "../../../store/teaItems/teaPackages";
import { loadBasketList } from "../../../store/consumerBasket";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadbrandsList());
    dispatch(loadCountriesList());
    dispatch(loadmethodsList());
    dispatch(loadkindsList());
    dispatch(loadTeaItemsList());
    dispatch(loadTeaTypesList());
    dispatch(loadTeaBrandsList());
    dispatch(loadTeaPackagesList());
    dispatch(loadBasketList());
  }, []);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
