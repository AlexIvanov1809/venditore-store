import React, { useState } from "react";
import { BuyButtonProps } from "./BuyButton.props";
import styles from "./BuyButton.module.css";

const BuyButton = ({
  getChange,
  bought,
  onOrder,
  className,
  ...props
}: BuyButtonProps): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleChange = (counter: number) => {
    setQuantity(quantity + counter);
  };

  const handleSubmit = (qty: number) => {
    getChange(qty);
    // onOrder("ordered");
  };

  return (
    <div {...props}>
      <div className={styles.counter}>
        <button
          className={styles.counterBtn}
          onClick={quantity > 1 ? () => handleChange(-1) : () => {}}
        >
          -
        </button>
        <span className={styles.counterNumber}>{quantity}</span>
        <button className={styles.counterBtn} onClick={() => handleChange(1)}>
          +
        </button>
      </div>
      <button
        onClick={() => handleSubmit(quantity)}
        className={styles.buyButton}
      >
        {bought ? "В корзину" : "Купить"}
      </button>
    </div>
  );
};

export default BuyButton;
