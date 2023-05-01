import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/context/StoreContext';
import styles from './CardList.module.scss';
import { Card } from '../..';

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
