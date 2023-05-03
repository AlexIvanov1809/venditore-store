import cn from 'classnames';
import { useRootStore } from '@/context/StoreContext';
import { Button } from '@/components/ui';
import styles from './TypeBar.module.scss';
import { useEffect, useState } from 'react';
import httpService from '@/http/productAPI';

interface Props {
  className: string;
}

function TypeBar({ className }: Props) {
  const { products } = useRootStore();
  const [allTypes, setAllTypes] = useState<null | { [key: string]: boolean }>(null);

  useEffect(() => {
    const types = products.types;
    types.forEach(async (type) => {
      try {
        const { count } = await httpService.fetchProducts({ typeId: type.id, page: 1, limit: 1 });
        if (count) {
          setAllTypes((prev) => ({ ...prev, [type.name]: true }));
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [products.types]);
  return (
    <div className={cn(className, styles.item_container)}>
      {products.types.map((type) => {
        if (allTypes && allTypes[type.name]) {
          return (
            <Button
              appearance="primary"
              className={styles.item}
              key={type.id}
              onClick={() => products.setSelectedType(type.id ? type.id : '')}
              data-active={type.id === products.selectedType}
            >
              {type.name}
            </Button>
          );
        }
      })}
    </div>
  );
}

export default TypeBar;
