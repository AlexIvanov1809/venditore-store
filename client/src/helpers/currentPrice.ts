import { ITeaItem } from "../models/ITeaItem";

function currentPrice(item: ITeaItem): number | string {
  if (item.weight === "шт") {
    return item.price;
  } else {
    return Math.ceil((parseInt(item.price) / 1000) * parseInt(item.weight));
  }
}

export default currentPrice;
