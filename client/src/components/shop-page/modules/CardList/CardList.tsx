import { observer } from 'mobx-react-lite';
import styles from './CardList.module.css';
import { Card } from '../..';
import useProductsCards from '@/hooks/useProductsCards';

interface Props {
  className: string;
}

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
