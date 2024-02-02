export function hasNull(self: object) {
  return Object.values(self).some((value) => value === null);
}
