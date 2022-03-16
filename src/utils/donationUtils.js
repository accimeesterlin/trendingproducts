export function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value === "" || value == null;
}
