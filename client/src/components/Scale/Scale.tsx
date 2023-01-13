import React from "react";
import { ScaleProps } from "./Scale.props";
import styles from "./Scale.module.css";

const Scale = ({ value, name, ...props }: ScaleProps): JSX.Element => {
  return (
    <div {...props}>
      <span>{name}</span>
      <div className={styles.scale}>
        <div
          className={styles.scaleInside}
          style={{ width: value * 10 + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default Scale;
