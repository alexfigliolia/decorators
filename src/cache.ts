import type { GenericFunction } from "./types";

export function cache<F extends GenericFunction>(
  original: F,
  _context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  const cache = new Map<string, any>();
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const value = original.call(this, ...args);
    cache.set(key, value);
    return value;
  };
}
