import { IProductImage, IProductPrice, IProductType } from './productTypes';

export interface IFetchPayload {
  typeId?: number | string | null;
  brandId?: string;
  countryId?: string;
  makingMethodId?: string;
  manufacturingMethodId?: string;
  teaTypeId?: string;
  packageTypeId?: string;
  page?: number;
  limit?: number;
}

export interface IResponseProduct {
  id: number;
  sortName: string;
  fullName: string;
  minPriceValue: number;
  description: string | null;
  shortDescription: string;
  acidity: number | null;
  density: number | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  countryId: IProductType['id'] | null;
  typeId: IProductType['id'];
  brandId: IProductType['id'];
  makingMethodId: IProductType['id'] | null;
  manufacturingMethodId: IProductType['id'] | null;
  teaTypeId: IProductType['id'] | null;
  packageTypeId: IProductType['id'] | null;
  images: IProductImage[];
  prices: IProductPrice[];
  type: ProductTypeNames;
  brand: ProductTypeNames;
  country: ProductTypeNames | null;
  making_method: ProductTypeNames | null;
  manufacturing_method: ProductTypeNames | null;
  tea_type: ProductTypeNames | null;
  package_type: ProductTypeNames | null;
}

type ProductTypeNames = {
  name: string;
};
