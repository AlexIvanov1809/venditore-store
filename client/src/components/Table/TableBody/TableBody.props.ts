import { ICoffeeItem } from "../../../store/models/ICoffeeItem";
import { ITeaItem } from "../../../store/models/ITeaItem";
import { IColumn } from "../Table/Table.props";

export interface TableBodyProps {
  columns: IColumn;
  data: (ITeaItem | ICoffeeItem)[];
  type: "tea" | "coffee";
}
