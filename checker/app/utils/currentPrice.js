function currentPrice(item) {
  if (item.weight === "шт") {
    return item.price;
  } else {
    return Math.ceil((parseInt(item.price) / 1000) * parseInt(item.weight));
  }
}

export default currentPrice;
