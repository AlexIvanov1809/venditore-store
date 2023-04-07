import httpService from "../http/productAPI";
import makeFormDataFile from "./makeFormDataFile";

export default function imgUploader(img, product) {
  const imgIds = ["", "", ""];
  product.image.forEach((img) => {
    imgIds[img.row] = img.id;
  });

  img.forEach((file, index) => {
    if (imgIds[index] && typeof file === "object") {
      const formData = makeFormDataFile(null, [file]);
      httpService
        .editProductImage(imgIds[index], formData)
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    }

    if (!imgIds[index] && typeof file === "object") {
      const formData = makeFormDataFile(null, [file]);
      httpService
        .createProductImage(product.id, index, formData)
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }

    if (imgIds[index] && !file) {
      httpService
        .removeProductImage(imgIds[index])
        .then((data) => console.log(data))
        .catch((e) => console.log(e.message));
    }
  });
}
