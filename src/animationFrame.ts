import type { GenericFunction } from "./types";

export function animationFrame<F extends GenericFunction>(
  original: F,
  _context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    requestAnimationFrame(() => {
      original.call(this, ...args);
    });
  };
}
