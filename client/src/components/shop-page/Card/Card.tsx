import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IProduct, IProductPrice } from '@/types/productTypes';
import { FnOnChange } from '@/types/uiTypes';
import { IBasketItem } from '@/types/basketTypes';
import { useRootStore } from '@/context/StoreContext';
import { setToStorage } from '@/service/storage.service';
import { BEANS } from '@/constants/configConstants';
import styles from './Card.module.scss';
import { Scale, CardPrice, SelectField } from '../../ui';
import { ImgCarousel, OrderCardBtn } from '..';

interface Props {
  product: IProduct;
}

const Card = observer(({ product }: Props) => {
  const { basket } = useRootStore();
  const [price, setPrice] = useState<IProductPrice>(() => product.prices[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [order, setOrder] = useState<IBasketItem[]>([]);
  const [bought, setBought] = useState<boolean>(false);
  const [beans, setBeans] = useState({ name: 'Зерно' });

  useEffect(() => {
    if (order.length) {
      basket.setOrder(order);
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
    if (typeof value === 'string') {
      setBeans({ name: value });
    }
  };

  const orderHandler = () => {
    const productsInBasket = basket.order;
    if (price) {
      const newOrder = {
        id: `${product.id}-${price.weight}-${beans.name}-${product.brand}`,
        brand: product.brand,
        name: product.fullName,
        beans: beans.name,
        weight: price.weight,
        value: +price.value,
        quantity
      };
      let sameItem = false;
      const filteredProducts = productsInBasket.map((item) => {
        if (item.id === newOrder.id) {
          sameItem = true;
          item.quantity += newOrder.quantity;
          return item;
        }
        return item;
      });
      if (!sameItem) {
        filteredProducts.push(newOrder);
      }
      setOrder(filteredProducts);
    }
  };

  return (
    <div key={product.id} className={styles.card}>
      <div className={styles.product_container}>
        <div>
          <h4>{product.brand}</h4>
          <h4>{product.teaType}</h4>
          <h4>{product.fullName}</h4>
        </div>
        <div>
          <ImgCarousel images={product.images} />
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
        {product.type.toLowerCase() === 'кофе' && (
          <div>
            <SelectField
              label="Выберите помол"
              options={BEANS}
              value={beans.name}
              defaultOption="Зерно"
              onChange={grindType}
            />
          </div>
        )}
        <div className={styles.price_buy}>
          <div className={styles.price}>
            {product.prices.map((priceItem) => (
              <CardPrice
                key={priceItem.id}
                onClick={() => setPrice(priceItem)}
                price={priceItem}
                active={priceItem.id === price.id}
              />
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
