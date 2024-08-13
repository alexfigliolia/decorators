import type { GenericFunction } from "./types";

/**
 * chainable
 *
 * Modifies the return type of the target method to
 * instead return the instance in which it belongs to
 *
 * Warning - typescript cannot yet pick up on the change
 * in return type
 */
export function chainable<F extends GenericFunction>(
  original: F,
  _context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    original.call(this, ...args);
    return this;
  };
}
