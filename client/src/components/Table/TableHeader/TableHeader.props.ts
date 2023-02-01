import { IColumn } from "../Table/Table.props";
import { TableItem } from "../TeaTable/TeaTable.props";

export interface TableHeaderProps {
  columns: IColumn;
  onSort: (item: TableItem) => void;
  selectedSort: TableItem;
}
