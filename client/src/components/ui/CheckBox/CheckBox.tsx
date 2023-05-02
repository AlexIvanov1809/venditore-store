import styles from './CheckBox.module.scss';
import { CheckboxProps } from './Checkbox.props';

function CheckBox({ name, value, onChange, children, error }: CheckboxProps): JSX.Element {
  const handleChange = () => {
    onChange({ name, value: !value });
  };
  return (
    <button type="button" onClick={handleChange} className={styles.checkbox_container}>
      <input type="checkbox" id={name} onChange={handleChange} checked={value} />
      <label className={styles.checkbox_label} htmlFor="checkLabelValue">
        {children}
      </label>
      {error && <div>{error}</div>}
    </button>
  );
}

export default CheckBox;
