import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Beans, IProduct, IProductPrice } from '@/types/productTypes';
import { FnOnChange } from '@/types/uiTypes';
import { IBasketItem } from '@/types/basketTypes';
import { useRootStore } from '@/context/StoreContext';
import { setToStorage } from '@/service/storage.service';
import { BEANS } from '@/constants/consts';
import styles from './Card.module.css';
import { Scale, CardPrice, SelectField } from '../../ui';
import { ImgCarousel, OrderCardBtn } from '..';

interface Props {
  product: IProduct;
}

const Card = observer(({ product }: Props) => {
  const { basket } = useRootStore();
  const [price, setPrice] = useState<IProductPrice>();
  const [quantity, setQuantity] = useState<number>(1);
  const [order, setOrder] = useState<IBasketItem[]>([]);
  const [bought, setBought] = useState<boolean>(false);
  const [beans, setBeans] = useState<Beans>({ id: '', name: '' });

  useEffect(() => {
    setPrice(product.price[0]);
  }, [product]);

  useEffect(() => {
    if (order.length) {
      basket.setOrder(order as IBasketItem[]);
      setToStorage(order);
    }
    if (basket.order.length) {
      basket.order.forEach((i) => {
        if (i?.id.split('-')[0] === product.id.toString()) {
          setBought(true);
        }
      });
    }
  }, [order]);

  const grindType: FnOnChange = ({ value }) => {
    if (typeof value !== 'boolean') {
      setBeans({ id: value, name: BEANS[Number(value)].name });
    }
  };

  const orderHandler = () => {
    const productsInBasket = basket.order;
    if (price) {
      const newOrder = {
        id: `${product.id}-${price.weight}`,
        brand: product.brand,
        name: `${product.country ?? ''} ${product.sortName}`,
        beans: beans.name,
        weight: price.weight,
        value: +price.value * quantity,
        quantity
      };
      const filtered = productsInBasket.filter((item) => item?.id !== newOrder.id);
      filtered.push(newOrder);
      setOrder(filtered);
    }
  };

  return (
    <div key={product.id} className={styles.card}>
      <div className={styles.product_container}>
        <div>
          <h4>{product.brand}</h4>
          <h4>{product.teaType}</h4>
          <h4>
            {product.country ? `${product.country} ` : ''}
            {product.sortName}
          </h4>
        </div>
        <div>
          <ImgCarousel images={product.image} />
        </div>
        <span>{product.makingMethod}</span>
        <span>{product.manufacturingMethod}</span>
        <span>{product.packageType}</span>
        {product.acidity && product.density && (
          <div className={styles.product_scale}>
            <Scale value={product.acidity} name="Кислотность" />
            <Scale value={product.density} name="Плотность" />
          </div>
        )}
        <p>{product.shortDescription}</p>
        <p>{product.description}</p>
        <div>
          <SelectField label="Выберите помол" options={BEANS} value={beans.id} onChange={grindType} />
        </div>
        <div className={styles.price_buy}>
          <div className={styles.price}>
            {product.price.map((p) => (
              <CardPrice key={p.id} onClick={() => setPrice(p)} price={p} active={p.id === price?.id} />
            ))}
          </div>
          <OrderCardBtn
            className={styles.order_btn}
            bought={bought}
            quantity={quantity}
            setQuantity={setQuantity}
            onOrder={orderHandler}
          />
        </div>
      </div>
    </div>
  );
});

export default Card;
