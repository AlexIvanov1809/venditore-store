import cn from 'classnames';
import styles from './TypeBar.module.css';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  className: string;
}

function TypeBar({ className }: Props) {
  const { products } = useRootStore();
  return (
    <div className={cn(className, styles.item_container)}>
      {products.types.map((type) => (
        <div
          className={styles.item}
          key={type?.id}
          onClick={() => products.setSelectedType(type?.id ? type.id : '')}
          data-active={type?.id === products.selectedType}
        >
          {type?.name}
        </div>
      ))}
    </div>
  );
}

export default TypeBar;
