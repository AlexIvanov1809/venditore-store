import React from "react";
import { CoffeeImgItemProps } from "./CoffeeImgItem.props";
import styles from "./CoffeeImgItem.module.css";
import cn from "classnames";

const CoffeeImgItem = ({
  item,
  images,
  className,
  ...props
}: CoffeeImgItemProps): JSX.Element => {
  const imgStyle = cn(styles.coffeeImg, { [styles.hidden]: true });
  return (
    <div {...props}>
      <div>
        {images.quarter && (
          <div className={item === "quarter" ? styles.coffeeImg : imgStyle}>
            <img
              src={`../${images.quarter.htmlPath}`}
              className="d-block mx-auto"
              alt="Coffee 250"
            />
          </div>
        )}
        {images.kg && (
          <div className={item === "kg" ? styles.coffeeImg : imgStyle}>
            <img
              src={`../${images.kg.htmlPath}`}
              className="d-block mx-auto"
              alt="Coffee 1000"
            />
          </div>
        )}
        {images.drip && (
          <div className={item === "drip" ? styles.coffeeImg : imgStyle}>
            <img
              src={`../${images.drip.htmlPath}`}
              className="d-block mx-auto"
              alt="Coffee drip"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeImgItem;
