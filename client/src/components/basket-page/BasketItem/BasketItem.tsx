import { BasketChangeHandler, IBasketItem } from '@/types/basketTypes';
import { Button } from '../../ui';

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
      <span>{item.value} RUB</span>
      <Button onClick={() => changeHandler(item.id, '+')} appearance="primary" icon="Plus" />

      <span>{item.quantity}</span>
      <Button appearance="primary" onClick={() => changeHandler(item.id, '-')} icon="Minus" />
      <Button appearance="danger" onClick={() => changeHandler(item.id, 'del')} icon="Delete" />
    </li>
  );
}

export default BasketItem;
