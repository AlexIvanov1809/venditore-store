import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { IFilters } from "../../models/IFilters";
import { IHandleChange } from "./FilterGroupList";

export interface FilterGroupListProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: string;
  name: string;
  onFilter: (item: { [key: string]: IHandleChange["name"][] }) => void;
  items: IFilters[] | null;
  reset: boolean;
}
