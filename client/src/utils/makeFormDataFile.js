export default function makeFormDataFile(item, img) {
  const formData = new FormData();
  if (img) {
    img.forEach((i) => {
      if (i !== "") {
        formData.append("img", i);
      }
    });
  }

  if (item) {
    for (const key in item) {
      if (item[key] !== "") {
        formData.append(key, item[key]);
      }
    }
  }
  return formData;
}
