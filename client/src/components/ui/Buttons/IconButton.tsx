import icons from '@/assets/icons/index';
import { ButtonProps } from './IconButton.props';
import { getAppearance } from './Button';

function IconButton({ appearance, icon, className, ...props }: ButtonProps): JSX.Element {
  const btnStyle = getAppearance(appearance, className);

  const IconComponent = icons[icon];
  return (
    <button type="button" {...props} className={btnStyle}>
      <IconComponent />
    </button>
  );
}

export default IconButton;
