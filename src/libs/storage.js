export function getData(key) {
  const value = localStorage.getItem(key);
  if (!value) return undefined;
  return JSON.parse(value);
}

export function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}
