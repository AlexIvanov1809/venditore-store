import { observer } from 'mobx-react-lite';
import styles from './CardList.module.css';
import { Card } from '../..';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  className: string;
}
const useProductsCards = () => {
  const { products } = useRootStore();

  if (!(products.products?.length > 0)) {
    return [];
  }

  return products.products.filter((item) => item.active);
};

const CardList = observer(({ className }: Props): JSX.Element => {
  const cards = useProductsCards();

  return (
    <div className={className}>
      <div className={styles.card_container}>
        {cards.map((item) => (
          <Card key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
});

export default CardList;
