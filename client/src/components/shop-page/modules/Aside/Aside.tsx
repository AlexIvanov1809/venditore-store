import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { FilterTypes } from '@/types/productTypes';
import { FilterFn } from '@/types/uiTypes';
import styles from './Aside.module.css';
import { Button } from '../../../ui';
import { ShopFilterList } from '../..';
import { ENTITY_TYPES } from '@/constants/consts';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  className: string;
}

const Aside = observer(({ className }: Props) => {
  const { products } = useRootStore();
  const [data, setData] = useState<null | FilterTypes>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    ENTITY_TYPES.forEach((type) => {
      if (type.endpoint !== 'Type') {
        setData((prev) => ({ ...prev, [type.filter]: [] }));
      }
    });
  }, [refresh]);

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

  const onChange: FilterFn = (filterType, item) => {
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
              onChange={onChange}
            />
          )
      )}
      <Button appearance="danger" onClick={() => setRefresh(!refresh)}>
        Сбросить
      </Button>
      <Button appearance="primary" onClick={acceptFiltration}>
        Применить
      </Button>
    </aside>
  );
});

export default Aside;
