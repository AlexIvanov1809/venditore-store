type BasketChangeHandler = (id: string, action: '+' | '-' | 'del') => void;

type BasketSubmitFn = (e: React.FormEvent<HTMLFormElement>, orderData: OrderData) => void;

type OrderData = {
  name: string;
  phone: string;
  address: string;
  comments?: string;
};

interface IBasketItem {
  id: string;
  brand: string;
  beans: string;
  name: string;
  weight: string;
  value: number;
  quantity: number;
}

interface IOrder extends OrderData {
  items: IBasketItem[];
  total: number;
  id: number;
}

export { OrderData, BasketSubmitFn, BasketChangeHandler, IBasketItem, IOrder };
