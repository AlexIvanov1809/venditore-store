import { ImgItem } from "./ImageItem";

export interface ICreateCoffeeItem {
  name: string;
  images: ICreateImage | Images;
  brand: string;
  sortName: string;
  country: string;
  acidity: number;
  density: number;
  description: string;
  kind: string;
  method: string;
  preparationMethod: string;
  price?: Price;
  active: boolean;
  priceQuarter?: string;
  priceKg?: string;
  priceDrip?: string;
}

export interface ICreateImage {
  quarter?: File | string;
  kg?: File | string;
  drip?: File | string;
  tea?: File | string;
}

export interface ICoffeeItem {
  _id: string;
  name: string;
  images: Images;
  brand: string;
  sortName: string;
  country: string;
  acidity: number;
  density: number;
  description: string;
  kind: string;
  method: string;
  preparationMethod: string;
  price: Price;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Images {
  quarter?: ImgItem;
  kg?: ImgItem;
  drip?: ImgItem;
  tea?: ImgItem;
}

export interface Price {
  quarter?: string;
  kg?: string;
  drip?: string;
}
