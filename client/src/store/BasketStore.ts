import { IBasketItem } from '@/types/basketTypes';
import { makeAutoObservable } from 'mobx';

export default class BasketStore {
  private _basket: IBasketItem[];

  constructor() {
    this._basket = [];
    makeAutoObservable(this);
  }

  setOrder(products: IBasketItem[]) {
    this._basket = products;
  }

  setIncrementQty(id: IBasketItem['id']) {
    const data = this._basket.map((prod) => {
      if (prod?.id === id) {
        prod.quantity += 1;
      }
      return prod;
    });
    this._basket = data;
  }

  setDecrementQty(id: IBasketItem['id']) {
    const data = this._basket.map((prod) => {
      if (prod?.id !== id) return prod;

      if (prod?.id === id && prod?.quantity > 1) {
        prod.quantity -= 1;
        return prod;
      }
      if (prod.quantity !== 1) return prod;
    });
    const newData = data.filter((prod) => prod) as IBasketItem[];
    this._basket = newData || [];
  }

  get order() {
    return this._basket;
  }
}