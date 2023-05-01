import { BasketChangeHandler, IBasketItem } from '@/types/basketTypes';
import { DECREASE, DELETE, INCREASE } from '@/constants/configConstants';
import { IconButton } from '../../ui';

interface Props {
  className: string;
  changeHandler: BasketChangeHandler;
  item: IBasketItem;
}

function BasketItem({ className, changeHandler, item }: Props) {
  return (
    <li className={className}>
      <span>{item.brand}</span>
      <span>{item.beans}</span>
      <span>{item.name}</span>
      <span>{item.weight}</span>
      <span>{item.value * item.quantity} RUB</span>
      <IconButton onClick={() => changeHandler(item.id, INCREASE)} appearance="primary" icon="Plus" />

      <span>{item.quantity}</span>
      <IconButton appearance="primary" onClick={() => changeHandler(item.id, DECREASE)} icon="Minus" />
      <IconButton appearance="danger" onClick={() => changeHandler(item.id, DELETE)} icon="Delete" />
    </li>
  );
}

export default BasketItem;
