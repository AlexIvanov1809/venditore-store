import { IProduct, SortTypes } from './productTypes';

type FnOnChange = (data: { name: string; value: boolean | string | number; id?: number }) => void;

type ErrorMsg = string;

type Options = { id: string | number; name: string | number };

type HideFn = (data?: boolean) => void;

type DeleteFn = (id: string | number) => void;

type SortProps = {
  type: keyof SortTypes;
  sort: 'asc' | 'desc';
};

type FilterFn = (filterType: keyof IProduct, item: string[]) => void;

type ImgType = { id: number; image: string | File }[];

export { FnOnChange, ErrorMsg, Options, HideFn, DeleteFn, SortProps, FilterFn, ImgType };
