import { ProductsStore } from '@/store';
import { IProduct, SortTypes } from './productTypes';

type EntityTypes = {
  id: number;
  endpoint: string;
  label: string;
  getter: keyof ProdGetter;
  setter: keyof ProdSetters;
  filter: keyof IProduct;
  setSelected: keyof ProdSetSel;
  isBlack: boolean;
};
type ProdGetter = Pick<
  ProductsStore,
  'types' | 'brands' | 'countries' | 'makingMethods' | 'manufacturingMethods' | 'teaTypes' | 'packageTypes'
>;
type ProdSetters = Pick<
  ProductsStore,
  | 'setTypes'
  | 'setBrands'
  | 'setCountries'
  | 'setMakingMethods'
  | 'setManufacturingMethods'
  | 'setTeaTypes'
  | 'setPackageTypes'
>;

type ProdSetSel = Pick<
  ProductsStore,
  | 'setSelectedType'
  | 'setSelectedBrand'
  | 'setSelectedCountry'
  | 'setSelectedMakingMethod'
  | 'setSelectedManufacturingMethod'
  | 'setSelectedTeaType'
  | 'setSelectedPackageType'
>;

type AdminItemFields = {
  id: number;
  name: string;
  type: keyof SortTypes;
};

type ProductFieldsForValidation = Pick<IProduct, 'brandId' | 'typeId' | 'sortName' | 'shortDescription'>;

type ValidatorConfig = {
  [key: string]: { message: string; value?: number };
};

export {
  EntityTypes,
  AdminItemFields,
  ValidatorConfig,
  ProdGetter,
  ProdSetters,
  ProdSetSel,
  ProductFieldsForValidation
};
