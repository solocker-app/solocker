export const removeBigInt = function <T extends object>(input: T): T {
  if (Array.isArray(input)) {
    let index = 0;
    const array: any[] = [];

    for (const value of input) {
      if (typeof value === "bigint") array[index] = Number(value);
      if (typeof value === "object") array.push(removeBigInt(value));
      else array.push(value);

      index++;
    }

    return array as T;
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "bigint") result[key] = Number(value);
    if (typeof value === "object") result[key] = removeBigInt(value);
    else result[key] = value;
  }

  return result as T;
};
