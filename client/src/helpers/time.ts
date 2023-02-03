export default function timeChanger(date: string | null): string[] | [] {
  if (date) {
    const data = date.replace(/T/g, ".").split(".");
    const arrowTime = data[1].split(":");
    const arrowDate = data[0].split("-").reverse();
    const hour = arrowTime.shift();
    if (hour) {
      const b = parseInt(hour) + 3;
      arrowTime.unshift(b.toString());
    }
    data[1] = arrowTime.join(":");
    data[0] = arrowDate.join(".");
    return data;
  } else {
    return [];
  }
}
