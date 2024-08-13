import type { GenericFunction } from "./types";

export function chainable<F extends GenericFunction>(
  original: F,
  _context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    original.call(this, ...args);
    return this;
  };
}
