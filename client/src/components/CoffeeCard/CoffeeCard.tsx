import React, { useEffect, useState } from "react";
import { CoffeeCardProps } from "./CoffeeCard.props";
import styles from "./CoffeeCard.module.css";
import cn from "classnames";
import { CoffeeImgItem, PriceItem, Scale, SelectField } from "../";
import { IChangeFn } from "../SelectField/SelectField.props";

const CoffeeCard = ({ coffeeItem, ...props }: CoffeeCardProps): JSX.Element => {
  const [name, setName] = useState<string>("");
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
          setName("");
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

  const HandleChangeImg = (itemName: string): void => {
    setName(itemName);
  };

  const handleChange = (item: IChangeFn) => {
    setBean(item);
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
      <PriceItem item={coffeeItem} handleChange={HandleChangeImg} />
    </div>
  );
};

export default CoffeeCard;
