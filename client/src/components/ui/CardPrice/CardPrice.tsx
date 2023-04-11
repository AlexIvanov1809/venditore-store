import styles from './CardPrice.module.scss';
import { CardPriceProps } from './CardPrice.props';

function CardPrice({ price, active, ...props }: CardPriceProps): JSX.Element {
  return (
    <div {...props} key={price.id} className={styles.price_item} data-active={active}>
      <div>{price.weight}</div>
      <div>{price.value} &#8381;</div>
    </div>
  );
}

export default CardPrice;
