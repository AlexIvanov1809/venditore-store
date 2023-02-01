import fileService from "../service/file.service";

async function imageLoader(images) {
  const data = {};
  for (const key in images) {
    const { content } = await fileService.create(images[key], key);
    data[key] = content;
  }
  return data;
}

export default imageLoader;
