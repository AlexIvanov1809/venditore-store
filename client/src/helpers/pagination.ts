import { ICoffeeItem } from "../store/models/ICoffeeItem";

export function paginate(
  items: ICoffeeItem[],
  pageNumber: number,
  pageSize: number,
) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
