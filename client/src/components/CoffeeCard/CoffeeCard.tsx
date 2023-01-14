import React, { useEffect, useState } from "react";
import { CoffeeCardProps } from "./CoffeeCard.props";
import styles from "./CoffeeCard.module.css";
import cn from "classnames";
import { BuyButton, CoffeeImgItem, PriceItem, Scale, SelectField } from "../";
import { IChangeFn } from "../SelectField/SelectField.props";
import { editItemBasket, storeAdding } from "../../store/consumerBasket";
import { useAppDispatch } from "../../hooks/redux";
import { IBasketItems } from "../../store/models/IBasket";

const CoffeeCard = ({ coffeeItem, ...props }: CoffeeCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<"drip" | "kg" | "quarter">("quarter");
  const [bought, setBought] = useState<boolean>(false);
  const [bean, setBean] = useState<IChangeFn>({
    name: "beans",
    value: "в зернах",
  });
  const beans = [
    { _id: 1, value: "для чашки" },
    { _id: 2, value: "для фильтра" },
    { _id: 3, value: "для эспрессо" },
  ];

  useEffect(() => {
    if (!coffeeItem.price.quarter) {
      if (!coffeeItem.price.kg) {
        if (!coffeeItem.price.drip) {
          // setName("");
        } else {
          setName("drip");
        }
      } else {
        setName("kg");
      }
    } else {
      setName("quarter");
    }
  }, []);

  const HandleChangeImg = (itemName: "drip" | "kg" | "quarter"): void => {
    setName(itemName);
  };

  const handleChange = (item: IChangeFn) => {
    setBean(item);
  };

  const handleSubmit = (item: number) => {
    let same = false;
    let weight;
    switch (name) {
      case "quarter":
        weight = "250 г.";
        break;
      case "kg":
        weight = "1 кг.";
        break;
      case "drip":
        weight = "дрип пакет";
        break;
    }
    const order: IBasketItems = {
      _id: coffeeItem._id + "." + name + bean.value,
      [bean.name]: bean.value,
      name: coffeeItem.name,
      brand: coffeeItem.brand,
      quantity: item,
      price: coffeeItem.price[name],
      weight,
    };
    // basket.map((i) => {
    //   if (i._id === order._id) {
    //     same = true;
    //     const newQuantity = order.quantity + i.quantity;
    //     order.quantity = newQuantity;
    //   }
    //   return i;
    // });
    if (!same) {
      dispatch(storeAdding(order));
    } else {
      dispatch(editItemBasket(order));
    }
  };
  return (
    <div className={styles.coffeeCard} {...props}>
      <div>
        <h5>{coffeeItem.brand}</h5>
        <p>{coffeeItem.preparationMethod}</p>
        <h4>{coffeeItem.name}</h4>
        <p>{coffeeItem.method}</p>
        <CoffeeImgItem images={coffeeItem.images} item={name} />
        <p>{coffeeItem.kind}</p>

        <p>{coffeeItem.description}</p>
      </div>
      <div>
        <div className={styles.scale}>
          <Scale value={coffeeItem.acidity} name="Кислотность" />
          <Scale value={coffeeItem.density} name="Плотность" />
        </div>
        <SelectField
          label=""
          value={bean.value}
          defaultOption="в зернах"
          name="beans"
          options={beans}
          getChange={handleChange}
          className={styles.selectBeans}
        />
        <div className={styles.bottom}>
          <PriceItem item={coffeeItem} handleChange={HandleChangeImg} />
          <BuyButton bought={bought} getChange={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
