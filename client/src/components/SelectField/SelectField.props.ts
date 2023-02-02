import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { IFilters } from "../../models/IFilters";

export interface IChangeFn {
  name: string;
  value: string | number;
}

export interface SelectFieldProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  value: number | string;
  getChange: (item: IChangeFn) => void;
  defaultOption: number | string;
  options: IFilters[] | null;
  error?: string;
  name: string;
}
