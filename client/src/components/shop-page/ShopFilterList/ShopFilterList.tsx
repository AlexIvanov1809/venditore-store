import { useEffect, useState } from 'react';
import { IProduct } from '@/types/productTypes';
import { FilterFn, FnOnChange } from '@/types/uiTypes';
import { ProdGetter } from '@/types/constsTypes';
import styles from './ShopFilterList.module.css';
import { CheckBox } from '../../ui';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  refresh: boolean;
  label: string;
  list: keyof ProdGetter;
  onChange: FilterFn;
  filterType: keyof IProduct;
}

function ShopFilterList({ refresh, label, list, onChange, filterType }: Props) {
  const { products } = useRootStore();
  const [data, setData] = useState<null | { [key: string]: boolean }>(null);
  const [changes, setChanges] = useState(true);

  useEffect(() => {
    products[list].forEach((b) => {
      if (b) {
        setData((prev) => ({ ...prev, [b.id.toString()]: false }));
      }
    });
  }, [products, refresh]);

  useEffect(() => {
    const filterList = [];
    for (const key in data) {
      if (data[key]) {
        filterList.push(key);
      }
    }

    onChange(filterType, filterList);
  }, [changes]);

  const changeHandler: FnOnChange = ({ name, value }) => {
    if (typeof value === 'boolean') {
      setData((prev) => ({ ...prev, [name]: value }));
      setChanges(!changes);
    }
  };
  return (
    <div>
      <h3>{label}</h3>
      <div>
        {data &&
          products[list].length > 0 &&
          products[list].map((item) => (
            <CheckBox
              name={item?.id ? item.id.toString() : ''}
              value={item?.id ? data[item.id] : false}
              className={styles.item}
              key={item?.id}
              onChange={changeHandler}
            >
              {item?.name}
            </CheckBox>
          ))}
      </div>
    </div>
  );
}

export default ShopFilterList;
