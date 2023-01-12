import { ICoffeeItem } from "../store/models/ICoffeeItem";

interface SelectedItems {
  brand: string[] | [];
  country: string[] | [];
  method: string[] | [];
  kind: string[] | [];
}

interface Selected {
  brand: ICoffeeItem[] | [];
  country: ICoffeeItem[] | [];
  method: ICoffeeItem[] | [];
  kind: ICoffeeItem[] | [];
}

function itemFilter(
  selectedItems: SelectedItems,
  allItems: ICoffeeItem[],
): ICoffeeItem[] {
  let cycle: number = 0;
  const selected: Selected = {
    brand: [],
    country: [],
    method: [],
    kind: [],
  };
  const key = Object.keys(selectedItems) as [
    "brand",
    "country",
    "method",
    "kind",
  ];

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
