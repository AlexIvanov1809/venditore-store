import { ICreateCoffeeImage, Images } from "../models/ICoffeeItem";
import { ImgItem } from "../models/ImageItem";
import fileService from "../service/file.service";

async function imageLoader(images: ICreateCoffeeImage | undefined) {
  if (typeof images !== "undefined") {
    const data: Images = {};
    const keys = Object.keys(images) as ["quarter", "drip", "kg"];
    keys.forEach(async (key) => {
      const { content } = await fileService.create(images[key], key);

      data[key] = content;
    });

    return data;
  } else {
    return {
      quarter: "",
      kg: "",
      drip: "",
    };
  }
}

export default imageLoader;
