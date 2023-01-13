import React, { useState, useEffect } from "react";
import { PriceItemProps } from "./PriceItem.props";
import styles from "./PriceItem.module.css";
import cn from "classnames";

enum typeOfPrice {
  quarter = "quarter",
  kg = "kg",
  drip = "drip",
}

interface IOpacity {
  [typeOfPrice.quarter]: boolean;
  [typeOfPrice.kg]: boolean;
  [typeOfPrice.drip]: boolean;
}

const PriceItem = ({
  item,
  handleChange,
  className,
  ...props
}: PriceItemProps): JSX.Element => {
  const [opacity, setOpacity] = useState<IOpacity>({
    quarter: true,
    kg: false,
    drip: false,
  });

  useEffect(() => {
    if (item.price.quarter) {
      setOpacity({
        quarter: true,
        kg: false,
        drip: false,
      });
    } else if (item.price.kg) {
      setOpacity({
        quarter: false,
        kg: true,
        drip: false,
      });
    } else if (item.price.drip) {
      setOpacity({
        quarter: false,
        kg: false,
        drip: true,
      });
    }
  }, []);

  const hiddenChecker = (item: string | undefined) => {
    if (!item) {
      return true;
    } else {
      return false;
    }
  };
  const handleOpacity = (item: "quarter" | "kg" | "drip") => {
    handleChange(item);
    const opacityKeys = Object.keys(opacity) as ["quarter", "kg", "drip"];
    const trueItem = opacityKeys.find((k) => opacity[k]) as typeOfPrice;

    setOpacity({ ...opacity, [trueItem]: false, [item]: true });
  };

  const PriceStyle = cn(styles.priceContainer, className);
  const PriceItemStyle = cn(styles.priceItem, {
    [styles.covered]: true,
  });

  return (
    <div className={PriceStyle} {...props}>
      <div
        className={opacity.quarter ? styles.priceItem : PriceItemStyle}
        hidden={hiddenChecker(item.price.quarter)}
        onClick={() => handleOpacity("quarter")}
        role="button"
      >
        <h6 className={styles.value}>250 г.</h6>
        <span>{item.price.quarter} &#8381;</span>
      </div>
      <div
        className={opacity.kg ? styles.priceItem : PriceItemStyle}
        hidden={hiddenChecker(item.price.kg)}
        onClick={() => handleOpacity("kg")}
        role="button"
      >
        <h6 className={styles.value}>1000 г.</h6>
        <span>{item.price.kg} &#8381;</span>
      </div>
      <div
        className={opacity.drip ? styles.priceItem : PriceItemStyle}
        hidden={hiddenChecker(item.price.drip)}
        onClick={() => handleOpacity("drip")}
        role="button"
      >
        <h6 className={styles.value}>шт.</h6>
        <span>{item.price.drip} &#8381;</span>
      </div>
    </div>
  );
};

export default PriceItem;
