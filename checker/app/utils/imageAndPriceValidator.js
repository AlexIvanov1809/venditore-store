function imageAndPriceValidatore(images, data) {
  const checker = {
    ...images,
    quarterP: data.priceQuarter,
    kgP: data.priceKg,
    dripP: data.priceDrip
  };
  const errors = {};
  if (
    !checker.quarter &&
    !checker.kg &&
    !checker.drip &&
    !checker.quarterP &&
    !checker.kgP &&
    !checker.dripP
  ) {
    errors.all = "Хотябы одно поле необходимое для заполнения";
  }
  if (
    (checker.quarter && !checker.quarterP) ||
    (!checker.quarter && checker.quarterP)
  ) {
    errors.quarter = "Поле необходимое для заполнения вместе с картинкой";
  }
  if ((checker.kg && !checker.kgP) || (!checker.kg && checker.kgP)) {
    errors.kg = "Поле необходимое для заполнения вместе с картинкой";
  }
  if ((checker.drip && !checker.dripP) || (!checker.drip && checker.dripP)) {
    errors.drip = "Поле необходимое для заполнения вместе с картинкой";
  }

  return errors;
}

export default imageAndPriceValidatore;
