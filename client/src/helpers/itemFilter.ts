import { ICoffeeItem } from "../models/ICoffeeItem";
import { ITeaItem } from "../models/ITeaItem";

type SelectedItems = {
  [key: string]: string[] | [];
};

interface Selected {
  [key: string]: (ICoffeeItem | ITeaItem)[] | [];
}

function itemFilter(
  selectedItems: SelectedItems,
  allItems: (ICoffeeItem | ITeaItem)[],
): (ICoffeeItem | ITeaItem)[] {
  let cycle: number = 0;
  const selected: Selected = {};
  const key = Object.keys(selectedItems) as (keyof (ICoffeeItem | ITeaItem))[];

  key.forEach((item) => (selected[item] = []));
  while (cycle < key.length) {
    if (!cycle) {
      selectedItems[key[cycle]].length
        ? selectedItems[key[cycle]].forEach((item) => {
            selected[key[cycle]] = [
              ...selected[key[cycle]],
              ...allItems.filter((i) => i[key[cycle]] === item),
            ];
          })
        : (selected[key[cycle]] = allItems);
      cycle += 1;
    } else {
      selectedItems[key[cycle]].length
        ? selectedItems[key[cycle]].forEach((item) => {
            selected[key[cycle]] = [
              ...selected[key[cycle]],
              ...selected[key[cycle - 1]].filter((i) => i[key[cycle]] === item),
            ];
          })
        : (selected[key[cycle]] = selected[key[cycle - 1]]);
      cycle += 1;
    }
  }
  return selected[key[cycle - 1]];
}

export default itemFilter;
