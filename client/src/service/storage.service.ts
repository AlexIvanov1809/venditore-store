import { IBasketItem } from '@/types/basketTypes';
import { BASKET_STORAGE_NAME } from '@/constants/otherConstants';

export function getFromStorage(name: string) {
  let data = localStorage.getItem(name);
  if (!data) {
    data = sessionStorage.getItem(name);
  }
  return data ? JSON.parse(data) : '';
}

export function setToStorage(data: IBasketItem[]) {
  localStorage.setItem(BASKET_STORAGE_NAME, JSON.stringify(data));
}
