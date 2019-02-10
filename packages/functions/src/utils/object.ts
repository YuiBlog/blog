export function without<T>(obj: T, ...fields: Array<keyof T>): T {
  const newObj = {} as T;
  for (const prop of Object.keys(obj)) {
    if ((fields as string[]).includes(prop)) {
      continue;
    }
    newObj[prop] = obj[prop];
  }

  return newObj;
}