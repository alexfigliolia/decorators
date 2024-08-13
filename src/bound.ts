import type { GenericFunction } from "./types";

/**
 * bound
 *
 * Binds the target method to the instance in which
 * it's defined
 */
export function bound<F extends GenericFunction>(
  original: F,
  context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  context.addInitializer(function (this: ThisParameterType<F>) {
    const self = this as Record<string | symbol, any>;
    self[context.name] = self[context.name].bind(this);
  });
  return original;
}
