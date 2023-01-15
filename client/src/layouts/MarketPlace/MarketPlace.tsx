import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import CoffeeMarket from "../../pages/coffeePages/CoffeeMarket/CoffeeMarket";
import TeaMarket from "../../pages/teaPages/TeaMarket/TeaMarket";
import {
  getCoffeeItemsError,
  getCoffeeItemsLoadingStatus,
} from "../../store/coffeeItems/coffeeItems";
import styles from "./MarketPlace.module.css";

const MarketPlace = (): JSX.Element => {
  const { store } = useParams();
  const [currentPage, setCurrentPage] = useState<string | undefined>(store);
  const [hidden, setHidden] = useState<boolean>(true);
  const [firstOrder, setFirstOrder] = useState<boolean>(true);

  const isLoading = useAppSelector(getCoffeeItemsLoadingStatus());
  const error = useAppSelector(getCoffeeItemsError());

  const handleClick = (page: "tea" | "coffee") => {
    setCurrentPage(page);
  };
  const handleOrder = (type: "continue" | undefined) => {
    if (firstOrder) {
      if (type === "continue") {
        setHidden(true);
        setFirstOrder(false);
      } else {
        setHidden(false);
      }
    }
  };
  return (
    <main className={styles.main}>
      <div className="d-flex justify-content-center">
        <Link
          className={
            "m-2 w-50 btn btn-" +
            (currentPage === "coffee" ? "primary" : "secondary")
          }
          role="button"
          onClick={() => handleClick("coffee")}
          to={"/market/coffee"}
        >
          Кофе
        </Link>
        <Link
          className={
            "m-2 w-50 btn btn-" +
            (currentPage === "tea" ? "primary" : "secondary")
          }
          role="button"
          onClick={() => handleClick("tea")}
          to={"/market/tea"}
        >
          Чай
        </Link>
      </div>

      {currentPage === "coffee" ? (
        <CoffeeMarket handleOrder={handleOrder} />
      ) : (
        <TeaMarket handleOrder={handleOrder} />
      )}

      <div
        className={
          hidden ? "d-none" : "position-fixed top-50 start-50 translate-middle"
        }
      >
        <div className="card p-4 shadow">
          <span className="fw-bold">ТОВАР ДОБАВЛЕН В КОРЗИНУ</span>
          <div className="m-auto text-center  p-4 zindex-dropdown d-flex flex-column">
            <Link to={"/basket"} className="btn btn-primary mb-3">
              Перейти в корзину
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => handleOrder("continue")}
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MarketPlace;
