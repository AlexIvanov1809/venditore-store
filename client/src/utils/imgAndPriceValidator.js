export default function imgAndPriceValidator(data, type) {
  const errors = { img: true, price: true };
  data.forEach((item) => {
    if (type === "image") {
      if (item) {
        errors.img = false;
      }
    }
    if (type === "price") {
      if (item.weight && item.value) {
        errors.price = false;
      }
    }
  });

  if (type === "image") {
    if (errors.img) return { image: "Нужно прикрепить фото" };
  } else if (errors.price) return { price: "Поле необходимое для заполнения" };
}
