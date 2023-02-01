import React from "react";
import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";

const Input = ({
  className,
  children,
  error,
  ...props
}: InputProps): JSX.Element => {
  const inputStyle = cn(styles.input, {
    [styles.error]: error,
  });
  const wrapperStyle = cn(styles.inputWrapper, className);

  return (
    <div className={wrapperStyle}>
      <input className={inputStyle} {...props} />
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Input;
