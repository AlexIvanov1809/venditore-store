import { ICoffeeItem } from "../../../models/ICoffeeItem";
import { ITeaItem } from "../../../models/ITeaItem";
import { IColumn } from "../Table/Table.props";

export interface TableBodyProps {
  columns: IColumn;
  data: (ITeaItem | ICoffeeItem)[];
  type: "tea" | "coffee";
}
