import { ICoffeeItem } from "../models/ICoffeeItem";
import { ITeaItem } from "../models/ITeaItem";

export function paginate<T>(
  items: Array<T>,
  pageNumber: number,
  pageSize: number,
): Array<T> {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
