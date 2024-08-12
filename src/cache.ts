import { createMethodDecorator } from "./generators";

export const cache = createMethodDecorator(original => {
  const cache = new Map<string, any>();
  return function (this, ...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const value = original.call(this, ...args);
    cache.set(key, value);
    return value;
  };
});
