import { IProduct } from './productType';

type FnOnChange = (data: { name: string; value: boolean | string | number }, id?: number) => void;

type ErrorMsg = string;

type Options = { id: string | number; name: string | number };

type ErrorValidation = {
  [key in keyof IProduct]?: string;
};

type HideFn = (data?: boolean) => void;

type DeleteFn = (id: string | number) => void;

type SortProps = {
  type: keyof IProduct;
  sort: 'asc' | 'desc';
};

type FilterFn = (filterType: keyof IProduct, item: string[]) => void;

export { FnOnChange, ErrorMsg, Options, ErrorValidation, HideFn, DeleteFn, SortProps, FilterFn };
