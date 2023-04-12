import styles from './CheckBox.module.scss';
import { CheckboxProps } from './Checkbox.props';

function CheckBox({ name, value, onChange, children, error }: CheckboxProps): JSX.Element {
  const handleChange = () => {
    onChange({ name, value: !value });
  };
  return (
    <div className={styles.checkbox_container}>
      <input type="checkbox" id={name} onChange={handleChange} checked={value} role="button" />
      <label className={styles.checkbox_label} htmlFor="flexCheckDefault" onClick={handleChange} role="button">
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default CheckBox;