import cn from 'classnames';
import styles from './TypeBar.module.scss';
import { useRootStore } from '@/context/StoreContext';
import { Button } from '@/components/ui';

interface Props {
  className: string;
}

function TypeBar({ className }: Props) {
  const { products } = useRootStore();
  return (
    <div className={cn(className, styles.item_container)}>
      {products.types.map((type) => (
        <Button
          appearance="primary"
          className={styles.item}
          key={type.id}
          onClick={() => products.setSelectedType(type.id ? type.id : '')}
          data-active={type.id === products.selectedType}
        >
          {type.name}
        </Button>
      ))}
    </div>
  );
}

export default TypeBar;
