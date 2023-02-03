import { Images, ICoffeeItem, IEditImage } from "../models/ICoffeeItem";
import { ITeaItem } from "../models/ITeaItem";
import fileService from "../service/file.service";

async function imageUpdater(image: IEditImage, data: ICoffeeItem | ITeaItem) {
  const update = { ...image };
  const keys = Object.keys(image) as ["quarter", "drip", "kg", "tea"];
  keys.forEach(async (key) => {
    if (!image[key]?.hasOwnProperty("_id")) {
      if (image[key]) {
        if (data.images[key]) {
          const imgFile = image[key] as File;
          const { content } = await fileService.edit(imgFile, data.images[key]);
          update[key] = content;
        } else {
          const imgFile = image[key] as File;
          const { content } = await fileService.create(imgFile, key);
          update[key] = content;
        }
      } else {
        const { content } = await fileService.remove(data.images[key]);
        delete update[key];
        console.log(content.message);
      }
    }
  });
  // for (const key in image) {
  //   if (!image[key]._id) {
  //     if (image[key]) {
  //       if (data.images[key]) {
  //         const { content } = await fileService.edit(
  //           image[key],
  //           data.images[key]
  //         );
  //         update[key] = content;
  //       } else {
  //         const { content } = await fileService.create(image[key], key);
  //         update[key] = content;
  //       }
  //     } else {
  //       const { content } = await fileService.remove(data.images[key]);
  //       delete update[key];
  //       console.log(content.message);
  //     }
  //   }
  // }
  return update as Images;
}
export default imageUpdater;
