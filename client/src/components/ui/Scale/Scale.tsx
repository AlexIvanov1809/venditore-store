// import React from "react";
import styles from "./Scale.module.scss";

interface ScaleProps {
  value: number;
  name: string;
}

function Scale({ value, name }: ScaleProps): JSX.Element {
  return (
    <div>
      <span>{name}</span>
      <div className={styles.scale}>
        <div className={styles.scale_inside} style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  );
}

export default Scale;
