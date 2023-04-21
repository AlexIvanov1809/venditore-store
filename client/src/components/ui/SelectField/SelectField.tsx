import React from 'react';
import cn from 'classnames';
import styles from './SelectField.module.scss';
import SelectFieldProps from './SelectField.props';

function SelectField({ label, value, onChange, defaultOption, options, error, name, id }: SelectFieldProps) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value, id });
  };

  const className = cn(styles.select_field, { error });

  return (
    <div className={className}>
      <label htmlFor={name} className={styles.select_label}>
        {label}
      </label>
      <div>
        <select className={styles.select_tag} id={name} name={name} value={value || ''} onChange={handleChange}>
          <option value={defaultOption} disabled={defaultOption === ''}>
            {defaultOption}
          </option>
          {options &&
            options.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.name}
              </option>
            ))}
        </select>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default SelectField;
