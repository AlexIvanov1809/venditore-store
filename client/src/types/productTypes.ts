interface IAllProducts {
  count: number;
  rows: IProduct[];
}

interface IProductForEdit {
  id: number;
  sortName: string;
  description: string | null;
  shortDescription: string;
  acidity: string | null;
  density: string | null;
  active: boolean;
  countryId: IProductType['id'] | null;
  typeId: IProductType['id'] | null;
  brandId: IProductType['id'] | null;
  makingMethodId: IProductType['id'] | null;
  manufacturingMethodId: IProductType['id'] | null;
  teaTypeId: IProductType['id'] | null;
  packageTypeId: IProductType['id'] | null;
  price: string;
}

interface IProduct {
  id: number;
  sortName: string;
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
  type: string;
  brand: string;
  country: string | null;
  makingMethod: string | null;
  manufacturingMethod: string | null;
  teaType: string | null;
  packageType: string | null;
}

type SortTypes = Pick<
  IProduct,
  | 'type'
  | 'brand'
  | 'country'
  | 'makingMethod'
  | 'manufacturingMethod'
  | 'teaType'
  | 'packageType'
  | 'sortName'
  | 'active'
>;

interface IProductType {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IProductImage {
  id: number;
  name: string;
  row: number;
  createdAt: Date;
  updatedAt: Date;
  productId: IProduct['id'];
}

interface IProductPrice {
  id: number;
  weight: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
  productId?: IProduct['id'];
}

type Beans = {
  id: string | number;
  name: string;
};

type FilterTypes = {
  [key in keyof IProduct]?: string[];
};

interface INewProduct {
  acidity: string;
  density: string;
  sortName: string;
  shortDescription: string;
  description: string;
  brandId: string;
  package: string;
  typeId: string;
  countryId: string;
  makingMethodId: string;
  manufacturingMethodId: string;
  teaTypeId: string;
  packageTypeId: string;
  price: string;
  active: boolean;
}

export {
  IAllProducts,
  IProduct,
  IProductType,
  IProductImage,
  IProductPrice,
  IProductForEdit,
  Beans,
  FilterTypes,
  SortTypes,
  INewProduct
};
