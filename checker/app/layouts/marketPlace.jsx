import React, { useState } from "react";
import CoffeeMarket from "../components/pages/coffeePages/coffeeMarket";
import {
  getCoffeeItemsError,
  getCoffeeItemsLoadingStatus
} from "../store/coffeeItems/coffeeItems";
import { useSelector } from "react-redux";
import TeaMarket from "../components/pages/teaPages/teaMarket";
import { Link, useParams } from "react-router-dom";

const MarketPlace = () => {
  const { store } = useParams();
  const [currentPage, setCurrentPage] = useState(store);
  const [hidden, setHidden] = useState(true);
  const [firstOrder, setFirstOrder] = useState(true);

  const isLoading = useSelector(getCoffeeItemsLoadingStatus());
  const error = useSelector(getCoffeeItemsError());

  const handleClick = (page) => {
    setCurrentPage(page);
  };
  const handleOrder = (type) => {
    if (firstOrder) {
      if (type === "continue") {
        setHidden(true);
        setFirstOrder(false);
      } else {
        setHidden(false);
      }
    }
  };

  if (!error && !isLoading) {
    return (
      <>
        <div className="position-relative overflow-hidden mx-md-5 mx-ms-1 ">
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
              hidden
                ? "d-none"
                : "position-fixed top-50 start-50 translate-middle"
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
        </div>
      </>
    );
  }
  return (
    <>
      {error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="card">
            <p>Что-то пошло не так, перегрузите пожалуйста страницу</p>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="d-flex justify-content-center w-100 mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketPlace;
