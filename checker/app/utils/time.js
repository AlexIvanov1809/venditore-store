export default function timeChanger(date) {
  if (date) {
    const data = date.replace(/T/g, ".").split(".");
    const arrowTime = data[1].split(":");
    const arrowDate = data[0].split("-").reverse();
    const hour = arrowTime.shift();
    arrowTime.unshift(+hour + 3);
    data[1] = arrowTime.join(":");
    data[0] = arrowDate.join(".");
    return data;
  }
}
