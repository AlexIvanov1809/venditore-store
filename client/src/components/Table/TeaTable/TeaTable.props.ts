import { ICoffeeItem } from "../../../store/models/ICoffeeItem";
import { ITeaItem } from "../../../store/models/ITeaItem";

export type TableItem = {
  path: string;
  order: "asc" | "desc";
};

export interface TeaTableProps {
  teaItems: ITeaItem[] | null;
  onSort: (item: TableItem) => void;
  selectedSort: TableItem;
}
