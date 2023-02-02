import { ICoffeeItem } from "../models/ICoffeeItem";
import { ITeaItem } from "../models/ITeaItem";

type Path = keyof ICoffeeItem | string;

export default function sortedItems<T>(
  items: Array<T>,
  path: keyof T,
  order: "asc" | "desc",
): Array<T> | null {
  if (items && items.length > 0) {
    const arr = [...items];
    const sortedItems = arr.sort((a, b) => {
      if (order === "asc") {
        if (a[path] < b[path]) return -1;
        if (a[path] > b[path]) return 1;
        return 0;
      } else {
        if (a[path] < b[path]) return 1;
        if (a[path] > b[path]) return -1;
        return 0;
      }
    });
    return sortedItems;
  }
  return null;
}
