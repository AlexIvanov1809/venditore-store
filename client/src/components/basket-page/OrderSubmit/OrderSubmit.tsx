import { useState } from 'react';
import { BasketSubmitFn } from '@/types/basketTypes';
import { FnOnChange } from '@/types/uiTypes';
import styles from './OrderSubmit.module.scss';
import { Button, TextInput, TextAreaField } from '../../ui';

interface Props {
  onSubmit: BasketSubmitFn;
}

function OrderSubmit({ onSubmit }: Props) {
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const changeHandler: FnOnChange = ({ name, value }) => {
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className={styles.order_submit} onSubmit={(e) => onSubmit(e, orderData)}>
      <TextInput label="Имя" name="name" value={orderData.name} onChange={changeHandler} />
      <TextInput label="Номер телефона" name="phone" type="tel" value={orderData.phone} onChange={changeHandler} />
      <TextInput label="Адрес доставки" name="address" value={orderData.address} onChange={changeHandler} />
      <TextAreaField label="Комментарии к заказу " name="comment" value={orderData.comment} onChange={changeHandler} />
      <Button appearance="primary" type="submit">
        Отправить
      </Button>
    </form>
  );
}

export default OrderSubmit;
