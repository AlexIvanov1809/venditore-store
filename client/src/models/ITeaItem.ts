import { ICreateImage, Images } from "./ICoffeeItem";
import { ImgItem } from "./ImageItem";

export interface ITeaItem {
  _id: string;
  name: string;
  images: Images;
  brand: string;
  package: string;
  description: string;
  type: string;
  weight: string;
  recipe: string;
  price: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICreateTeaItem {
  name: string;
  images: ICreateImage | Images;
  brand: string;
  package: string;
  description: string;
  type: string;
  weight: string;
  recipe: string;
  price: string;
  active: boolean;
}
