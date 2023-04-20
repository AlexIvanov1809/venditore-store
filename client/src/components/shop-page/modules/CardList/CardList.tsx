import { observer } from 'mobx-react-lite';
import styles from './CardList.module.css';
import { Card } from '../..';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  className: string;
}

const CardList = observer(({ className }: Props): JSX.Element => {
  const { products } = useRootStore();

  return (
    <div className={className}>
      <div className={styles.card_container}>
        {products.products.map((item) => (
          <Card key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
});

export default CardList;
