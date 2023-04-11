export interface INewProduct {
  acidity: string;
  density: string;
  sortName: string;
  shortDescription: string;
  description: string;
  brandId: string;
  package: string;
  typeId: string;
  countryId: string;
  makingMethodId: string;
  manufacturingMethodId: string;
  teaTypeId: string;
  packageTypeId: string;
  price: string;
  active: boolean;
}

export default function makeFormDataFile(item: INewProduct, img: (string | File)[]) {
  const formData = new FormData();
  if (img) {
    img.forEach((i) => {
      if (i !== '') {
        formData.append('img', i);
      }
    });
  }

  if (item) {
    let key: keyof INewProduct;
    for (key in item) {
      if (item[key] !== '') {
        formData.append(key, item[key] as string);
      }
    }
  }
  return formData;
}
