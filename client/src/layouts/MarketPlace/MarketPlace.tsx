import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks/redux";
import CoffeeMarket from "../../pages/coffeePages/CoffeeMarket/CoffeeMarket";
import { loadCoffeeItemsList } from "../../store/coffeeItems/coffeeItems";
import { AppDispatch } from "../../store/createStore";
import styles from "./MarketPlace.module.css";

const MarketPlace = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
  }, []);
  return (
    <main className={styles.main}>
      <CoffeeMarket />
    </main>
  );
};

export default MarketPlace;
