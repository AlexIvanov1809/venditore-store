import { HtmlHTMLAttributes, DetailedHTMLProps } from "react";
import { ICoffeeItem } from "../../../models/ICoffeeItem";
import { ITeaItem } from "../../../models/ITeaItem";
import { TableItem } from "../TeaTable/TeaTable.props";

export interface IColumn {
  [key: string]: {
    path: string;
    name: string;
    component?: (item: ITeaItem | ICoffeeItem) => JSX.Element;
  };
}

export interface TableProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  columns: IColumn;
  data: (ITeaItem | ICoffeeItem)[] | null;
  type: "tea" | "coffee";
  onSort: (item: TableItem) => void;
  selectedSort: TableItem;
}
