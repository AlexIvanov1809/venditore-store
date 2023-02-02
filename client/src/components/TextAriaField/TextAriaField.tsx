import React, { useState } from "react";
import { TextAriaFieldProps } from "./TextAriaField.props";
import styles from "./TextAriaField.module.css";
import cn from "classnames";

const TextAriaField = ({
  label,
  className,
  name,
  value,
  getChange,
  error,
  ...props
}: TextAriaFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputStyle = cn(styles.input, {
    [styles.error]: error,
  });
  const wrapperStyle = cn(styles.inputWrapper, className);

  const getInputClass = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    getChange({ name: target.name, value: target.value });
  };

  return (
    <div className={wrapperStyle}>
      <label htmlFor={name}> {label}</label>
      <textarea
        rows={5}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={getInputClass()}
        {...props}
      />
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextAriaField;
