import { ICreateImage, ICreateCoffeeItem } from "../models/ICoffeeItem";

export interface ImgError {
  all?: string;
  quarter?: string;
  kg?: string;
  drip?: string;
}

function imageAndPriceValidator(
  images: ICreateImage | undefined,
  data: ICreateCoffeeItem,
) {
  const checker = {
    ...images,
    quarterP: data.priceQuarter,
    kgP: data.priceKg,
    dripP: data.priceDrip,
  };
  const errors: ImgError = {};
  if (
    !checker.quarter &&
    !checker.kg &&
    !checker.drip &&
    !checker.quarterP &&
    !checker.kgP &&
    !checker.dripP
  ) {
    errors.all = "Хотя бы одно поле необходимое для заполнения";
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

export default imageAndPriceValidator;
