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
    const updatedBasket = this._basket.map((prod) => {
      if (prod.id === id) {
        prod.quantity += 1;
      }
      return prod;
    });

    this._basket = updatedBasket;
  }

  setDecrementQty(id: IBasketItem['id']) {
    const updatedBasket = this._basket.map((prod) => {
      if (prod.id === id) {
        prod.quantity -= 1;
        return prod;
      }
      return prod;
    });

    this._basket = updatedBasket.filter((prod) => prod.quantity > 0);
  }

  get order() {
    return this._basket;
  }
}
