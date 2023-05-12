import cn from 'classnames';
import { useRootStore } from '@/context/StoreContext';
import { Button } from '@/components/ui';
import { useEffect, useState } from 'react';
import httpService from '@/http/productAPI';
import { IProductType } from '@/types/productTypes';
import styles from './TypeBar.module.scss';

interface Props {
  className: string;
}

function TypeBar({ className }: Props) {
  const { products } = useRootStore();
  const [allTypes, setAllTypes] = useState<null | { [key: string]: boolean }>(null);

  useEffect(() => {
    const { types } = products;
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

  function makeClassName(type: IProductType): string {
    return allTypes && allTypes[type.name] ? styles.item : styles.none;
  }
  return (
    <div className={cn(className, styles.item_container)}>
      {products.types.map((type) => (
        <Button
          appearance="primary"
          className={makeClassName(type)}
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
