import { Dispatch, SetStateAction } from 'react';
import { Button, IconButton } from '../../ui';

interface Props {
  className: string;
  bought: boolean;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  onOrder: () => void;
}

function OrderCardBtn({ className, bought, quantity, setQuantity, onOrder }: Props) {
  return (
    <div className={className}>
      <div>
        <IconButton appearance="primary" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} icon="Minus" />
        <span>{quantity}</span>
        <IconButton appearance="primary" onClick={() => setQuantity((prev) => prev + 1)} icon="Plus" />
      </div>
      <Button appearance="primary" onClick={onOrder}>
        {!bought ? 'Buy' : 'add'}
      </Button>
    </div>
  );
}

export default OrderCardBtn;
