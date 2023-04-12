import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IProduct } from '@/types/productTypes';
import styles from './AdminItem.module.css';
import httpService from '@/http/productAPI';
import { EditItemModule, DeleteBtn } from '@/components/admin-page';
import { Loader, Button, Scale, IconButton } from '@/components/ui';

import { ADMIN_ROUTE, ENTITY_TYPES } from '@/constants/consts';
import config from '@/config/config.json';
import { useRootStore } from '@/context/StoreContext';
import { frontDataAdapter } from '@/utils';

const AdminItem = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<null | IProduct>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    console.log('start');
    if ((products && products.products) || !Array.isArray(products.products) || updated) {
      (async () => {
        try {
          ENTITY_TYPES.forEach(async (prop) => {
            const data = await httpService.fetchEntityItems(prop.endpoint);
            products[prop.setter](data);
          });
          if (id) {
            const data = await httpService.fetchOneProduct(id);
            frontDataAdapter([data]);
            setItem(frontDataAdapter([data])[0]);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setUpdated(false);
          setIsLoading(false);
        }
      })();
    } else {
      const data = products.products.filter((item) => item.id === parseInt(id || ''));
      setItem(data[0]);
      setIsLoading(false);
    }
  }, [products, updated, id]);

  const removeHandle = (id: string | number) => {
    setIsLoading(true);
    httpService
      .removeProduct(id)
      .then((d) => {
        console.log(d);
        navigate(ADMIN_ROUTE);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const editHandle = () => {
    setEditing(!editing);
  };

  if (isLoading || !item) {
    return <Loader />;
  }

  return (
    <div className={styles.main_item}>
      <Button appearance="primary" onClick={() => navigate(ADMIN_ROUTE)}>
        Back
      </Button>
      <div className={styles.item_container}>
        <div>
          <h3>{item.type}</h3>
          <h4>{item.brand}</h4>
          <h4>{item.teaType}</h4>
          <h4>
            {item.country} {item.sortName}
          </h4>
        </div>
        <div>
          {item.image.map((i) => (
            <img key={i.id} width={120} src={config.apiURL + i.name} alt="item" />
          ))}
        </div>
        <span>{item.makingMethod}</span>
        <span>{item.manufacturingMethod}</span>
        {item.acidity && item.density && (
          <div className={styles.item_scale}>
            <Scale value={item.acidity} name="Кислотность" />
            <Scale value={item.density} name="Плотность" />
          </div>
        )}
        <span>{item.packageType}</span>
        <p>{item.shortDescription}</p>
        <p>{item.description}</p>
        {item.price.map((p) => (
          <div key={p.id}>
            <div>{p.weight}</div>
            <div>{p.value} &#8381;</div>
          </div>
        ))}
        <div>{item.active ? 'true' : 'false'}</div>
        <div className={styles.item_buttons}>
          <DeleteBtn onDelete={removeHandle} id={id || ''} />
          <IconButton appearance="primary" onClick={editHandle} icon="Edit" />
        </div>
      </div>
      {editing && <EditItemModule product={item} updated={setUpdated} onHide={editHandle} />}
    </div>
  );
});

export default AdminItem;
