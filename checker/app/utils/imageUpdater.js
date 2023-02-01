import fileService from "../service/file.service";

async function imageUpdater(image, data) {
  const update = { ...image };
  for (const key in image) {
    if (!image[key]._id) {
      if (image[key]) {
        if (data.images[key]) {
          const { content } = await fileService.edit(
            image[key],
            data.images[key]
          );
          update[key] = content;
        } else {
          const { content } = await fileService.create(image[key], key);
          update[key] = content;
        }
      } else {
        const { content } = await fileService.remove(data.images[key]);
        delete update[key];
        console.log(content.message);
      }
    }
  }
  return update;
}
export default imageUpdater;
