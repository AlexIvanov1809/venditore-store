import { ICoffeeItem } from "../store/models/ICoffeeItem";
import { ITeaItem } from "../store/models/ITeaItem";

export function paginate(
  items: (ICoffeeItem | ITeaItem)[],
  pageNumber: number,
  pageSize: number,
): (ICoffeeItem | ITeaItem)[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
