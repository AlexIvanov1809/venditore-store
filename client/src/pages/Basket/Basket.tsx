import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { BASKET_STORAGE_NAME, DELETE, DECREASE, INCREASE } from '@/constants/configConstants';
import { BasketChangeHandler, OrderData } from '@/types/basketTypes';
import { Button } from '@/components/ui';
import { OrderSubmit, BasketItem } from '@/components/basket-page';
import sendOrder from '@/http/orderAPI';
import { useRootStore } from '@/context/StoreContext';
import { setToStorage } from '@/service/storage.service';
import { useErrorBoundary, withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';
import styles from './Basket.module.scss';
import convertToTelegramMsgText from './helper/messageConverter';

const Basket = observer(() => {
  const navigate = useNavigate();
  const { basket } = useRootStore();
  const [inBasket, setInBasket] = useState(basket.order);
  const [confirm, setConfirm] = useState(false);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    setInBasket(basket.order);
    setToStorage(basket.order);
  }, [basket.order]);

  const changeHandler: BasketChangeHandler = (id, action) => {
    switch (action) {
      case INCREASE:
        basket.setIncrementQty(id);
        break;

      case DECREASE:
        basket.setDecrementQty(id);
        break;

      case DELETE:
        const filtered = inBasket.filter((item) => item?.id !== id);
        basket.setOrder(filtered);
        break;

      default:
        break;
    }
  };

  const submitHandler = async (orderData: OrderData) => {
    try {
      let total = 0;
      inBasket.forEach((orderedItem) => {
        total += orderedItem.value * orderedItem.quantity;
      });

      const message = convertToTelegramMsgText({
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
      showBoundary(e);
    }
  };

  return (
    <main className={styles.basket}>
      <div>
        <ol className={styles.products_list}>
          {inBasket.map((item) => (
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

export default withErrorBoundary(Basket, { FallbackComponent: ErrorFallback });
