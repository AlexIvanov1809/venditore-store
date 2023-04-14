import { ProductFieldsForValidation, ValidatorConfig } from '@/types/constsTypes';

export const BASKET_STORAGE_NAME = 'venditore_basket';

export const BEANS = [
  { id: '0', name: 'для чашки' },
  { id: '1', name: 'для фильтра' },
  { id: '2', name: 'для эспрессо' }
];

export const VALIDATOR_CONFIG: ValidatorConfig<ProductFieldsForValidation> = {
  brandId: {
    isRequired: { message: 'Поле необходимое для заполнения' }
  },
  typeId: {
    isRequired: { message: 'Поле необходимое для заполнения' }
  },
  sortName: {
    isRequired: { message: 'Поле необходимое для заполнения' }
  },
  shortDescription: {
    isRequired: { message: 'Поле необходимое для заполнения' }
  }
};
