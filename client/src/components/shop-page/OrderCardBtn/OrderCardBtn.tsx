import { Dispatch, SetStateAction } from "react";
import { Button } from "../../ui";

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
        <Button
          appearance="primary"
          onClick={() => setQuantity((prev) => (prev - 1 !== 0 ? prev - 1 : prev))}
          icon="Minus"
        />
        <span>{quantity}</span>
        <Button appearance="primary" onClick={() => setQuantity((prev) => prev + 1)} icon="Plus" />
      </div>
      <Button appearance="primary" onClick={onOrder}>
        {!bought ? "Buy" : "add"}
      </Button>
    </div>
  );
}

export default OrderCardBtn;
