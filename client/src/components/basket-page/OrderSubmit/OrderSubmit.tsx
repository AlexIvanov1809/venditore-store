import { useState } from 'react';
import { OrderData } from '@/types/basketTypes';
import { FnOnChange } from '@/types/uiTypes';
import styles from './OrderSubmit.module.scss';
import { Button, TextInput, TextAreaField } from '../../ui';
import useValidation from '@/hooks/useValidation';
import { VALIDATOR_CONFIG } from '@/constants/configConstants';
import { ValidatorConfig } from '@/types/constsTypes';

interface Props {
  onSubmit: (data: OrderData) => void;
}

const validationConfig = (value: number): ValidatorConfig => {
  const requiredWithMinLength = {
    isRequired: { message: 'Поле необходимое для заполнения' },
    minLength: { message: `Поле должно содержать не менее ${value} символов`, value }
  };
  return requiredWithMinLength;
};

function OrderSubmit({ onSubmit }: Props) {
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '+7',
    address: '',
    comment: ''
  });
  const [valid, setValid] = useState(true);
  const nameError = useValidation(orderData.name, validationConfig(3));
  const phoneError = useValidation(orderData.phone, validationConfig(10));
  const addressError = useValidation(orderData.address, VALIDATOR_CONFIG.required);

  const validate = () => {
    return !!nameError || !!phoneError || !!addressError;
  };

  const changeHandler: FnOnChange = ({ name, value }) => {
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setValid(false);
      return;
    }
    onSubmit(orderData);
  };
  return (
    <form className={styles.order_submit} onSubmit={handleSubmit}>
      <TextInput
        label="Имя"
        name="name"
        value={orderData.name}
        onChange={changeHandler}
        error={!valid ? nameError : ''}
      />
      <TextInput
        label="Номер телефона"
        name="phone"
        type="tel"
        value={orderData.phone}
        onChange={changeHandler}
        error={!valid ? phoneError : ''}
      />
      <TextInput
        label="Адрес доставки"
        name="address"
        value={orderData.address}
        onChange={changeHandler}
        error={!valid ? addressError : ''}
      />
      <TextAreaField label="Комментарии к заказу " name="comment" value={orderData.comment} onChange={changeHandler} />
      <Button appearance="primary" type="submit">
        Отправить
      </Button>
    </form>
  );
}

export default OrderSubmit;
