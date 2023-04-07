import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Beans, IProduct, IProductPrice } from "@/types/productType";
import { FnOnChange } from "@/types/uiTypes";
import { IBasketItem } from "@/types/basketTypes";
import styles from "./Card.module.css";
import { Scale, CardPrice, SelectField } from "../../ui";
import { ImgCarousel, OrderCardBtn } from "..";
import { Context } from "../../../main";
import { BASKET_STORAGE_NAME, BEANS } from "../../../utils/consts";

interface Props {
  product: IProduct;
}

const Card = observer(({ product }: Props) => {
  const { basket } = useContext(Context);
  const [price, setPrice] = useState<IProductPrice>();
  const [quantity, setQuantity] = useState<number>(1);
  const [order, setOrder] = useState<(IBasketItem | undefined)[]>([]);
  const [bought, setBought] = useState<boolean>(false);
  const [beans, setBeans] = useState<Beans>({ id: "", name: "" });

  useEffect(() => {
    setPrice(product.price[0]);
  }, [product]);

  useEffect(() => {
    if (order.length) {
      basket.setOrder(order as IBasketItem[]);
      localStorage.setItem(BASKET_STORAGE_NAME, JSON.stringify(order));
    }
    if (basket.order.length) {
      basket.order.forEach((i) => {
        if (i?.id.split("-")[0] === product.id.toString()) {
          setBought(true);
        }
      });
    }
  }, [order]);

  const grindType: FnOnChange = ({ value }) => {
    if (typeof value !== "boolean") {
      setBeans({ id: value, name: BEANS[Number(value)].name });
    }
  };

  const orderHandler = () => {
    const inBasket = basket.order;
    if (price) {
      const newOrder = {
        id: `${product.id}-${price.weight}`,
        brand: product.brand?.name,
        name: `${product.country?.name || ""} ${product.sortName}`,
        beans: beans.name,
        weight: price.weight,
        value: +price.value * quantity,
        quantity
      };
      const filtered = inBasket.filter((item) => item?.id !== newOrder.id);
      filtered.push(newOrder);
      setOrder(filtered);
    }
  };

  return (
    <div key={product.id} className={styles.card}>
      <div className={styles.product_container}>
        <div>
          <h4>{product.brand?.name}</h4>
          <h4>{product.tea_type?.name}</h4>
          <h4>
            {product.country ? `${product.country.name} ` : ""}
            {product.sortName}
          </h4>
        </div>
        <div>
          <ImgCarousel images={product.image} />
        </div>
        <span>{product.making_method?.name}</span>
        <span>{product.manufacturing_method?.name}</span>
        <span>{product.package_type?.name}</span>
        {product.acidity && product.density && (
          <div className={styles.product_scale}>
            <Scale value={product.acidity} name="Кислотность" />
            <Scale value={product.density} name="Плотность" />
          </div>
        )}
        <p>{product.shortDescription}</p>
        <p>{product.description}</p>
        <div>
          <SelectField label="Выберете помол" options={BEANS} value={beans.id} onChange={grindType} />
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
