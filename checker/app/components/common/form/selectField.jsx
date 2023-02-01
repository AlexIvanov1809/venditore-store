import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-2">
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

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  defaultOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array
};

export default SelectField;
