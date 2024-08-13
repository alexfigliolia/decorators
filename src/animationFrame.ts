import type { GenericFunction } from "./types";

/**
 * animationFrame
 *
 * Executes the target method inside calls to `requestAnimationFrame`
 */
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
