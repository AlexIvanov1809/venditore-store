export const BASKET_STORAGE_NAME = 'venditore_basket';

export const BEANS = [
  { id: '0', name: 'для чашки' },
  { id: '1', name: 'для фильтра' },
  { id: '2', name: 'для эспрессо' }
];

export const VALIDATOR_CONFIG = {
  required: {
    isRequired: { message: 'Поле необходимое для заполнения' }
  },
  email: {
    isRequired: { message: 'Поле необходимое для заполнения' },
    isEmail: { message: 'Неправильно указан email' }
  },
  password: {
    isRequired: { message: 'Поле необходимое для заполнения' },
    isCapitalSymbol: { message: 'Необходима хотя бы одна заглавная буква' },
    isContainDigit: { message: 'Необходима хотя бы одна цифра' },
    minLength: { message: 'Поле должно содержать более 8 символов', value: 8 },
    isEqual: { message: 'Пароли не совпадают' }
  }
};
