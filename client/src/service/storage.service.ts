export default function getFromStorage(name: string) {
  let data = localStorage.getItem(name);
  if (!data) {
    data = sessionStorage.getItem(name);
  }
  return data ? JSON.parse(data) : "";
}
