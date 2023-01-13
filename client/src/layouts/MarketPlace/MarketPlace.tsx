import React from "react";
import CoffeeMarket from "../../pages/coffeePages/CoffeeMarket/CoffeeMarket";
import styles from "./MarketPlace.module.css";

const MarketPlace = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <CoffeeMarket />
    </main>
  );
};

export default MarketPlace;
