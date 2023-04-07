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
  countryId: IProductType["id"] | null;
  typeId: IProductType["id"] | null;
  brandId: IProductType["id"] | null;
  makingMethodId: IProductType["id"] | null;
  manufacturingMethodId: IProductType["id"] | null;
  teaTypeId: IProductType["id"] | null;
  packageTypeId: IProductType["id"] | null;
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
  countryId: IProductType["id"] | null;
  typeId: IProductType["id"];
  brandId: IProductType["id"];
  makingMethodId: IProductType["id"] | null;
  manufacturingMethodId: IProductType["id"] | null;
  teaTypeId: IProductType["id"] | null;
  packageTypeId: IProductType["id"] | null;
  image: IProductImage[];
  price: IProductPrice[];
  type: ProductTypeNames;
  brand: ProductTypeNames;
  country: ProductTypeNames | null;
  making_method: ProductTypeNames | null;
  manufacturing_method: ProductTypeNames | null;
  tea_type: ProductTypeNames | null;
  package_type: ProductTypeNames | null;
}

type FilterTypesForObject = Pick<
  IProduct,
  "type" | "brand" | "country" | "making_method" | "manufacturing_method" | "tea_type"
>;

type FilterTypesPrimitive = Pick<IProduct, "sortName" | "active">;

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
  productId: IProduct["id"];
}

interface IProductPrice {
  id: number;
  weight: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
  productId?: IProduct["id"];
}

type ProductTypeNames = {
  name: string;
};

type Beans = {
  id: string | number;
  name: string;
};

type FilterTypes = {
  [key in keyof IProduct]?: string[];
};

export {
  IAllProducts,
  IProduct,
  IProductType,
  IProductImage,
  IProductPrice,
  ProductTypeNames,
  IProductForEdit,
  Beans,
  FilterTypes,
  FilterTypesForObject,
  FilterTypesPrimitive
};
