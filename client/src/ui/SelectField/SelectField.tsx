import React from "react";
import { SelectFieldProps } from "./SelectField.props";
import styles from "./SelectField.module.css";

const SelectField = ({
  label,
  value,
  getChange,
  defaultOption,
  options,
  error,
  name,
  className,
  ...props
}: SelectFieldProps): JSX.Element => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    getChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
  return (
    <div className={className} {...props}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value={defaultOption} disabled={defaultOption === ""}>
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option key={option._id} value={option.value}>
              {option.value}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
