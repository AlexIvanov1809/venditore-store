import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { IProductType } from '@/types/productTypes';
import { HideFn } from '@/types/uiTypes';
import { ProdGetter, ProdSetters } from '@/types/constsTypes';
import httpService from '@/http/productAPI';
import { useRootStore } from '@/context/StoreContext';
import styles from './EntityContainer.module.scss';
import { Button, IconButton } from '../../ui';
import EntitiesEditor from '../EntitiesEditor/EntitiesEditor';

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
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      try {
        const data = await httpService.fetchEntityItems(endpoint, signal);
        products[setter](data);
      } catch (e: unknown) {
        if (!(e instanceof Error)) {
          return;
        }
        if (e.message !== 'canceled') {
          console.log(e);
        }
      }
    })();
    return () => {
      controller.abort();
    };
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

  const editItem = (prodType: IProductType) => {
    setItem(prodType);
    setShow(true);
  };

  return (
    <div>
      <div className={containerName}>
        <h6>{label}</h6>
        <div className={styles.types_list}>
          {products[getter].map((prodType) => (
            <div className={styles.types_item} key={prodType?.id}>
              <div>{prodType?.name}</div>
              <div>
                <IconButton appearance="primary" onClick={() => editItem(prodType)} icon="Edit" />
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
