// import React from "react";
import cn from "classnames";
import styles from "./Button.module.scss";
import { icons } from "../../../assets/images";
import { ButtonProps } from "./Button.props";

function Button({ appearance, children, icon, className, ...props }: ButtonProps): JSX.Element {
  const btnStyle = cn(styles.button, className, {
    [styles.primary]: appearance == "primary",
    [styles.danger]: appearance == "danger"
  });

  const IconComponent = icon ? icons[icon] : "";
  return (
    <button {...props} className={btnStyle}>
      {children || <IconComponent />}
    </button>
  );
}

export default Button;
