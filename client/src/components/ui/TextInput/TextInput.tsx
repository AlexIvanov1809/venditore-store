import React from 'react';
import cn from 'classnames';
import styles from './TextInput.module.scss';
import TextInputProps from './TextInput.props';

function TextInput({ label, name, type, value, onChange, error, placeholder, className }: TextInputProps) {
  const inpClassName = cn(className, styles.inp_container, {
    error
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const string = type === 'tel' ? target.value.replace(/[^+\d]/g, '') : target.value;

    onChange({ name: target.name, value: string });
  };

  return (
    <div className={inpClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        maxLength={type === 'tel' ? 12 : undefined}
        type={type || 'text'}
        name={name}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default TextInput;
