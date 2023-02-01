function itemFilter(selectedItems, allItems) {
  let cycle = 0;
  const selected = {};
  const key = Object.keys(selectedItems);
  key.forEach((item) => (selected[item] = []));
  while (cycle < key.length) {
    if (!cycle) {
      selectedItems[key[cycle]].length
        ? selectedItems[key[cycle]].forEach((item) => {
            selected[key[cycle]] = [
              ...selected[key[cycle]],
              ...allItems.filter((i) => i[key[cycle]] === item)
            ];
          })
        : (selected[key[cycle]] = allItems);
      cycle += 1;
    } else {
      selectedItems[key[cycle]].length
        ? selectedItems[key[cycle]].forEach((item) => {
            selected[key[cycle]] = [
              ...selected[key[cycle]],
              ...selected[key[cycle - 1]].filter((i) => i[key[cycle]] === item)
            ];
          })
        : (selected[key[cycle]] = selected[key[cycle - 1]]);
      cycle += 1;
    }
  }
  return selected[key[cycle - 1]];
}

export default itemFilter;
/**
const selected = {
  brand: [],
  country: [],
  method: [],
  kind: []
};
selectedItems.country.length > 0
  ? selectedItems.country.forEach(
      (item) =>
        (selected.country = [
          ...selected.country,
          ...coffeeAssortment.filter((i) => i.country === item)
        ])
    )
  : (selected.country = coffeeAssortment);

selectedItems.brand.length > 0
  ? selectedItems.brand.forEach(
      (item) =>
        (selected.brand = [
          ...selected.brand,
          ...selected.country.filter((i) => i.brand === item)
        ])
    )
  : (selected.brand = selected.country);

selectedItems.method.length > 0
  ? selectedItems.method.forEach(
      (item) =>
        (selected.method = [
          ...selected.method,
          ...selected.brand.filter((i) => i.method === item)
        ])
    )
  : (selected.method = selected.brand);

selectedItems.kind.length > 0
  ? selectedItems.kind.forEach(
      (item) =>
        (selected.kind = [
          ...selected.kind,
          ...selected.method.filter((i) => i.kind === item)
        ])
    )
  : (selected.kind = selected.method);
*/
