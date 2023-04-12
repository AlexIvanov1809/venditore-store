import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { BASKET_STORAGE_NAME } from '@/constants/consts';
import { BasketChangeHandler, BasketSubmitFn } from '@/types/basketTypes';
import styles from './Basket.module.css';
import { Button } from '@/components/ui';
import { OrderSubmit, BasketItem } from '@/components/basket-page';
import { sendOrder } from '@/http/orderAPI';
import { messageConverter } from '@/utils';
import { useRootStore } from '@/context/StoreContext';
import { setToStorage } from '@/service/storage.service';

const Basket = observer(() => {
  const navigate = useNavigate();
  const { basket } = useRootStore();
  const [inBasket, setInBasket] = useState(basket.order);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setInBasket(basket.order);
    setToStorage(basket.order);
  }, [basket, basket.order]);

  const changeHandler: BasketChangeHandler = (id, action) => {
    switch (action) {
      case '+':
        basket.setIncrementQty(id);
        break;

      case '-':
        basket.setDecrementQty(id);
        break;

      case 'del':
        const filtered = inBasket.filter((item) => item?.id !== id);
        basket.setOrder(filtered);
        break;

      default:
        break;
    }
  };

  const submitHandler: BasketSubmitFn = async (e, orderData) => {
    e.preventDefault();
    try {
      let total = 0;
      inBasket.forEach((i) => {
        total += i ? i.value : 0;
      });

      const message = messageConverter({
        ...orderData,
        items: inBasket,
        total,
        id: Date.now()
      });

      await sendOrder(message);
      basket.setOrder([]);
      localStorage.removeItem(BASKET_STORAGE_NAME);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.basket}>
      <div>
        <ol className={styles.products_list}>
          {inBasket.length > 0 &&
            inBasket.map((item) => (
              <BasketItem item={item} className={styles.product} key={item?.id} changeHandler={changeHandler} />
            ))}
        </ol>
        <Button appearance="primary" onClick={() => setConfirm(true)}>
          Оформить покупку
        </Button>
      </div>
      {confirm && <OrderSubmit onSubmit={submitHandler} />}
    </main>
  );
});

export default Basket;
