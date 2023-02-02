import React, { useState } from "react";
import { TextFormProps } from "./TextForm.props";
import styles from "./TextForm.module.css";
import cn from "classnames";

const TextForm = ({
  label,
  className,
  name,
  type,
  value,
  getChange,
  error,
  ...props
}: TextFormProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputStyle = cn(styles.input, {
    [styles.error]: error,
  });
  const wrapperStyle = cn(styles.inputWrapper, className);

  const getInputClass = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    getChange({ name: target.name, value: target.value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={wrapperStyle}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={showPassword ? "text" : type}
        name={name}
        className={getInputClass()}
        id={name}
        value={value}
        placeholder={type === "tel" ? "(949) 123 45 67" : ""}
        onChange={handleChange}
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

export default TextForm;
