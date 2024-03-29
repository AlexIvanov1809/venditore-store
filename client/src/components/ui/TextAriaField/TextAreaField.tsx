import React from 'react';
import cn from 'classnames';
import styles from './TextAreaField.module.scss';
import TextAreaFieldProps from './TextAriaField.props';

function TextAreaField({ label, name, value, onChange, error }: TextAreaFieldProps) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ name: target.name, value: target.value });
  };

  const className = cn(styles.text_container, { error });

  return (
    <div className={className}>
      <label htmlFor={name}> {label}</label>
      <div className={styles.text_item}>
        <textarea rows={5} id={name} name={name} value={value || ''} onChange={handleChange} />

        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default TextAreaField;
