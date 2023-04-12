import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { IProductType } from '@/types/productTypes';
import { HideFn } from '@/types/uiTypes';
import { ProdGetter, ProdSetters } from '@/types/constsTypes';
import styles from './EntityContainer.module.css';
import { Button } from '../../ui';
import EntitiesEditor from '../EntitiesEditor/EntitiesEditor';
import httpService from '@/http/productAPI';
import { useRootStore } from '@/context/StoreContext';

interface Props {
  endpoint: string;
  label: string;
  getter: keyof ProdGetter;
  setter: keyof ProdSetters;
  isBlack: boolean;
}

const EntityContainer = observer(({ endpoint, label, getter, setter, isBlack }: Props) => {
  const { products } = useRootStore();
  const [show, setShow] = useState<boolean>(false);
  const [item, setItem] = useState<null | IProductType>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const containerName = cn(styles.types_container, {
    [styles.type_black]: isBlack
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await httpService.fetchEntityItems(endpoint);
        products[setter](data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [refresh, products]);

  const onHide: HideFn = (bool) => {
    if (typeof bool === 'boolean') {
      setItem(null);
      setShow(bool);
      setRefresh(!refresh);
    }
  };

  const removeItem = async (id: string | number) => {
    try {
      await httpService.removeEntityItem(endpoint, id);
      onHide(false);
    } catch (e) {
      console.log(e);
    }
  };

  const editItem = (item: IProductType) => {
    setItem(item);
    setShow(true);
  };

  return (
    <div>
      <div className={containerName}>
        <h6>{label}</h6>
        <div className={styles.types_list}>
          {products[getter].map((item) => (
            <div className={styles.types_item} key={item?.id}>
              <div>{item?.name}</div>
              <div>
                <Button appearance="primary" onClick={() => editItem(item)} icon="Edit" />
              </div>
            </div>
          ))}
        </div>
        <Button appearance="primary" onClick={() => setShow(!show)}>
          Создать
        </Button>
      </div>
      {show && (
        <EntitiesEditor
          onDelete={removeItem}
          endpoint={endpoint}
          label={item ? 'Обновить' : 'Создать'}
          onHide={onHide}
          item={item}
        />
      )}
    </div>
  );
});

export default EntityContainer;
