import React from "react";
import { coffeeItemAPI } from "../../service/coffeeItems/coffeeItem.service";
import styles from "./MarketPlace.module.css";

const MarketPlace = (): JSX.Element => {
  const { data: coffeeItems, isLoading } =
    coffeeItemAPI.useFetchAllCoffeeItemsQuery();
  console.log(coffeeItems);

  if (isLoading) {
    return <main className={styles.main}>loading...</main>;
  }
  return (
    <main className={styles.main}>
      {coffeeItems &&
        coffeeItems.map((item) => <div key={item._id}>{item.name}</div>)}
    </main>
  );
};

export default MarketPlace;
