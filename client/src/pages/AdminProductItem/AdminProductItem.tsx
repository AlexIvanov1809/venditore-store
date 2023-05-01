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
import { ENTITY_TYPES } from '@/constants/adminPageConstants';
import styles from './AdminProductItem.module.scss';

const AdminProductItem = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productItem, setProductItem] = useState<null | IProduct>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
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
            } catch (e: unknown) {
              if (!(e instanceof Error)) {
                return;
              }
              if (e.message !== 'canceled') {
                console.log(e);
              }
            }
          });
          if (id) {
            const [response] = await httpService.fetchOneProduct(id);
            setProductItem(() => response);
          }
        } catch (e: unknown) {
          if (!(e instanceof Error)) {
            return;
          }
          if (e.message !== 'canceled') {
            console.log(e);
          }
        } finally {
          setIsLoading(false);
          setUpdated(false);
        }
      })();
    }

    if (typeof id === 'string' && !productItem) {
      setIsLoading(true);
      const data = products.products.filter((item) => item.id === parseInt(id, 10));
      setProductItem(data[0]);
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [updated, id]);

  const removeHandle = async (productId: string | number) => {
    setIsLoading(true);
    try {
      await httpService.removeProduct(productId);
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

  if (isLoading || !productItem) {
    return <Loader />;
  }

  return (
    <div className={styles.main_item}>
      <Button appearance="primary" onClick={() => navigate(ADMIN_ROUTE)}>
        Back
      </Button>
      <div className={styles.item_container}>
        <div>
          <h3>{productItem.type}</h3>
          <h4>{productItem.brand}</h4>
          <h4>{productItem.teaType}</h4>
          <h4>{productItem.fullName}</h4>
        </div>
        <div>
          {productItem.images.map((img) => (
            <img key={img.id} width={120} src={config.apiURL + img.name} alt="item" />
          ))}
        </div>
        <span>{productItem.makingMethod}</span>
        <span>{productItem.manufacturingMethod}</span>
        {productItem.acidity && productItem.density && (
          <div className={styles.productItem_scale}>
            <Scale value={productItem.acidity} name="Кислотность" />
            <Scale value={productItem.density} name="Плотность" />
          </div>
        )}
        <span>{productItem.packageType}</span>
        <p>{productItem.shortDescription}</p>
        <p>{productItem.description}</p>
        {productItem.prices.map((price) => (
          <div key={price.id}>
            <div>{price.weight}</div>
            <div>{price.value} &#8381;</div>
          </div>
        ))}
        <div data-is-active={productItem.active}>
          В продаже: <Active />
        </div>
        <div className={styles.item_buttons}>
          <DeleteBtn onDelete={removeHandle} id={id || ''} />
          <IconButton appearance="primary" onClick={openEditModule} icon="Edit" />
        </div>
      </div>
      {editing && <EditItemModule product={productItem} onUpdated={setUpdated} onHide={openEditModule} />}
    </div>
  );
});

export default AdminProductItem;
