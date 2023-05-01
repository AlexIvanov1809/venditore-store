import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { FilterTypes } from '@/types/productTypes';
import { FilterFn } from '@/types/uiTypes';
import { ENTITY_TYPES } from '@/constants/adminPageConstants';
import { useRootStore } from '@/context/StoreContext';
import styles from './Aside.module.scss';
import { Button } from '../../../ui';
import { ProductSortBy, ShopFilterList } from '../..';

interface Props {
  className: string;
}

const EXCEPT_ENDPOINT = 'Type';

const Aside = observer(({ className }: Props) => {
  const { products } = useRootStore();
  const [data, setData] = useState<null | FilterTypes>(null);
  const [refresh, setRefresh] = useState(() => false);

  const acceptFiltration = () => {
    if (data) {
      ENTITY_TYPES.forEach((type) => {
        if (type.setSelected !== 'setSelectedType') {
          const select = data[type.filter]?.join('-');
          products[type.setSelected](select || '');
        }
      });
    }
  };

  useEffect(() => {
    ENTITY_TYPES.forEach((type) => {
      if (type.endpoint !== EXCEPT_ENDPOINT) {
        setData((prev) => ({ ...prev, [type.filter]: [] }));
      }
    });

    acceptFiltration();
  }, [refresh]);

  const handleChange: FilterFn = (filterType, item) => {
    setData((prev) => ({ ...prev, [filterType]: item }));
  };
  return (
    <aside className={cn(className, styles.item_container)}>
      {ENTITY_TYPES.map(
        (type) =>
          type.endpoint !== 'Type' &&
          products[type.getter].length > 1 && (
            <ShopFilterList
              refresh={refresh}
              key={type.id}
              list={type.getter}
              label={type.label}
              filterType={type.filter}
              onChange={handleChange}
            />
          )
      )}
      <Button appearance="danger" onClick={() => setRefresh(!refresh)}>
        Сбросить
      </Button>
      <Button appearance="primary" onClick={acceptFiltration}>
        Применить
      </Button>
      <ProductSortBy />
    </aside>
  );
});

export default Aside;
