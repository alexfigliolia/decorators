import type { GenericFunction } from "./types";

/**
 * debounce
 *
 * Debounces the target method by the specified wait time
 */
export function debounce(wait: number) {
  return function <F extends GenericFunction>(
    original: F,
    _context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
  ) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const clear = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      clear();
      timer = setTimeout(() => {
        original.call(this, ...args);
        clear();
      }, wait);
    };
  };
}
