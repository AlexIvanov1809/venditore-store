import { ICoffeeItem } from "../../../models/ICoffeeItem";
import { TableItem } from "../TeaTable/TeaTable.props";

export interface CoffeeTableProps {
  coffeeItems: ICoffeeItem[] | null;
  onSort: (item: TableItem) => void;
  selectedSort: TableItem;
}
