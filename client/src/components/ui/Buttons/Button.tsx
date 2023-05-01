import cn from 'classnames';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';

export function getAppearance(appearance: 'primary' | 'danger', className: string | undefined) {
  return cn(styles.button, className, {
    [styles.primary]: appearance === 'primary',
    [styles.danger]: appearance === 'danger'
  });
}

function Button({ appearance, children, className, ...props }: ButtonProps): JSX.Element {
  const btnStyle = getAppearance(appearance, className);

  return (
    <button type="button" {...props} className={btnStyle}>
      {children}
    </button>
  );
}

export default Button;
