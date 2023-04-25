import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IProduct } from '@/types/productTypes';
import httpService from '@/http/productAPI';
import { EditItemModule, DeleteBtn } from '@/components/admin-page';
import { Loader, Button, Scale, IconButton } from '@/components/ui';
import Active from '@/assets/icons/active.svg';
import { ADMIN_ROUTE } from '@/constants/routesConstants';
import config from '@/config/config.json';
import { useRootStore } from '@/context/StoreContext';
import styles from './AdminProductItem.module.scss';
import { ENTITY_TYPES } from '@/constants/adminPageConstants';

const AdminProductItem = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<null | IProduct>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!products.products.length || updated) {
      setIsLoading(true);
      (async () => {
        try {
          ENTITY_TYPES.forEach(async (prop) => {
            if (products[prop.getter].length) {
              return;
            }
            try {
              const data = await httpService.fetchEntityItems(prop.endpoint, signal);
              products[prop.setter](data);
            } catch (e: any) {
              if (e.message !== 'canceled') {
                console.log(e);
              }
            }
          });
          if (id) {
            const [response] = await httpService.fetchOneProduct(id);
            setItem(() => response);
          }
        } catch (e: any) {
          if (e.message !== 'canceled') {
            console.log(e);
          }
        } finally {
          setIsLoading(false);
          setUpdated(false);
        }
      })();
    }

    if (typeof id === 'string' && !item) {
      setIsLoading(true);
      const data = products.products.filter((item) => item.id === parseInt(id));
      setItem(data[0]);
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [updated, id]);

  const removeHandle = async (id: string | number) => {
    setIsLoading(true);
    try {
      await httpService.removeProduct(id);
      navigate(ADMIN_ROUTE);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModule = () => {
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
          {item.images.map((img) => (
            <img key={img.id} width={120} src={config.apiURL + img.name} alt="item" />
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
        {item.prices.map((price) => (
          <div key={price.id}>
            <div>{price.weight}</div>
            <div>{price.value} &#8381;</div>
          </div>
        ))}
        <div data-is-active={item.active}>
          В продаже: <Active />
        </div>
        <div className={styles.item_buttons}>
          <DeleteBtn onDelete={removeHandle} id={id || ''} />
          <IconButton appearance="primary" onClick={openEditModule} icon="Edit" />
        </div>
      </div>
      {editing && <EditItemModule product={item} onUpdated={setUpdated} onHide={openEditModule} />}
    </div>
  );
});

export default AdminProductItem;
