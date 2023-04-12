import { ProductStore } from '@/store';
import { IProduct } from './productTypes';

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
  ProductStore,
  'types' | 'brands' | 'countries' | 'makingMethods' | 'manufacturingMethods' | 'teaTypes' | 'packageTypes'
>;
type ProdSetters = Pick<
  ProductStore,
  | 'setTypes'
  | 'setBrands'
  | 'setCountries'
  | 'setMakingMethods'
  | 'setManufacturingMethods'
  | 'setTeaTypes'
  | 'setPackageTypes'
>;

type ProdSetSel = Pick<
  ProductStore,
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
  type: keyof IProduct;
};

type ValidatorConfig = {
  [key in keyof IProduct]?: {
    isRequired: {
      message: string;
    };
  };
};

export { EntityTypes, AdminItemFields, ValidatorConfig, ProdGetter, ProdSetters, ProdSetSel };
