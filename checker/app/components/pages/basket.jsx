import React, { useEffect, useState } from "react";
import Counter from "../common/counters/counter";
import { useDispatch, useSelector } from "react-redux";
import {
  backupBasket,
  deleteItem,
  editItemBasket,
  getStore,
  resetBasket
} from "../../store/consumerBasket";
import OrderSubmit from "../ui/orderSubmit";
import localStorageSevice from "../../service/localStorage.service";
import messageConverter from "../../utils/messageConverter";
import orderService from "../../service/order.service";
import { Link } from "react-router-dom";

const Basket = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(getStore());
  const localStorageorderItems = localStorageSevice.getBasketItems();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (orderItems.length > 0) {
      setItems(orderItems);
      localStorageSevice.setBasketItems(orderItems);
    } else if (orderItems.length === 0 && localStorageorderItems) {
      dispatch(backupBasket(localStorageorderItems));
      localStorageSevice.removeBasketItems();
    } else {
      setItems(orderItems);
    }
  }, [orderItems]);

  useEffect(() => {
    const allItemsList = [];
    orderItems.forEach((i) => {
      const itemPrice = i.quantity * parseInt(i.price);
      allItemsList.push(itemPrice);
    });
    const totalSum = allItemsList.reduce((i, acc) => i + acc, 0);
    setTotal(totalSum);
  }, [orderItems]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    localStorageSevice.removeBasketItems();
  };

  const handleReset = () => {
    setLoading(false);
    localStorageSevice.removeBasketItems();
    dispatch(resetBasket());
  };

  const handleChange = (id, counter) => {
    const item = items.find((i) => i._id === id);
    const newItem = { ...item, quantity: item.quantity + counter };
    dispatch(editItemBasket(newItem));
  };
  const handleSubmit = async (costumerData) => {
    setLoading(true);
    const dataToSand = { ...costumerData, items, total, _id: Date.now() };
    const message = messageConverter(dataToSand);
    await orderService.create({ message });
    handleReset();
  };
  if (items.length > 0) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="grid-container m-2">
            <div className="col m-2 p-0">
              <div className="card pt-2 pb-2 pe-2 ps-0 basket-block">
                <ol className="">
                  {items.map((count) => (
                    <Counter
                      key={count._id}
                      onDelete={handleDelete}
                      onChange={handleChange}
                      orderItems={count}
                    />
                  ))}
                </ol>
                <h5 className="ms-2">
                  Общая стоимость:{" "}
                  <span style={{ fontWeight: "900", color: "blue" }}>
                    {total} &#8381;
                  </span>
                </h5>
                <p className="ms-2">
                  Минимальный заказ для доставки:{" "}
                  <span className="fw-bold">750 &#8381;</span>
                </p>
                <div className="text-end mx-1">
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={handleReset}
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>
            </div>
            <div className=" col m-2 p-0 basket-block">
              <OrderSubmit onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
        {loading && (
          <div className="position-fixed top-50 start-50 translate-middle zindex-fixed w-100 h-100 bg-opacity-25 bg-dark d-flex align-items-center justify-content-center">
            <div className="d-flex justify-content-center w-100 mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="position-fixed top-50 start-50 translate-middle h-100 w-100 d-flex align-items-center justify-content-center">
        <div className="card p-4 text-center">
          <span className="fw-bold mb-3">Пустая корзина</span>
          <Link className="btn btn-primary" to={"/market/coffee"}>
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }
};

export default Basket;
