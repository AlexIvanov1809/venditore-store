import React from "react";
import { CheckBoxFieldProps } from "./CheckBoxField.props";
import styles from "./CheckBoxField.module.css";

const CheckBoxField = ({
  value,
  name,
  getChange,
  children,
  error,
  className,
  ...props
}: CheckBoxFieldProps): JSX.Element => {
  const handleChange = () => {
    getChange({ name, value: !value });
  };
  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  return (
    <div {...props}>
      <input
        className={getInputClasses()}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
        role="button"
      />
      <label
        className="form-check-label ms-3 text-wrap"
        htmlFor="flexCheckDefault"
        onClick={handleChange}
        role="button"
      >
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckBoxField;
