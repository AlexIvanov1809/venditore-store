import React, { useEffect, useState } from "react";
import { TeaCardProps } from "./TeaCard.props";
import styles from "./TeaCard.module.css";
import cn from "classnames";
import { BuyButton } from "..";
import {
  editItemBasket,
  getStore,
  storeAdding,
} from "../../store/consumerBasket";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IBasketItems } from "../../models/IBasket";
import currentPrice from "../../helpers/currentPrice";

const TeaCard = ({
  teaItem,
  className,
  ...props
}: TeaCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [bought, setBought] = useState(false);
  const basket = useAppSelector(getStore());
  const cardStyle = cn(styles.teaCard, className);

  useEffect(() => {
    if (basket.length > 0) {
      // localStorageService.setBasketItems(basket);
    }
    basket.forEach((i) => {
      if (i._id === teaItem._id) {
        return setBought(true);
      }
    });
  }, [basket]);

  const price = currentPrice(teaItem);
  const unit =
    teaItem.weight === "шт." ? teaItem.weight : teaItem.weight + " г.";

  const handleSubmit = (item: number) => {
    let same = false;

    const order: IBasketItems = {
      _id: teaItem._id,
      brand: teaItem.brand,
      name: teaItem.name,
      quantity: item,
      price,
      weight: unit,
    };
    basket.map((i) => {
      if (i._id === order._id) {
        same = true;
        const newQuantity = order.quantity + i.quantity;
        order.quantity = newQuantity;
      }
      return i;
    });
    if (!same) {
      dispatch(storeAdding(order));
    } else {
      dispatch(editItemBasket(order));
    }
  };
  return (
    <div className={cardStyle} {...props}>
      <div className="w-100">
        <h5>{teaItem.brand}</h5>
        <p>{teaItem.type}</p>
        {teaItem.images.tea && (
          <img
            src={"../" + teaItem.images.tea.htmlPath}
            className="d-block mx-auto"
            alt="Tea"
          />
        )}
        <h4 className="text-capitalize">{teaItem.name}</h4>
        <p className="" style={{ textAlign: "justify" }}>
          {teaItem.description}
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className=" d-flex flex-column justify-content-center align-items-start mt-3">
          <div>
            <span className="fw-bold">{unit}</span>
          </div>
          <div>
            <span>{price} &#8381;</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <BuyButton bought={bought} getChange={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TeaCard;
