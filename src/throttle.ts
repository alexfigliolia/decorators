import type { GenericFunction } from "./types";

/**
 * throttle
 *
 * Throttles calls to the target method by the specified
 * wait time
 */
export function throttle(wait: number) {
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
      if (timer) {
        return;
      }
      original.call(this, ...args);
      timer = setTimeout(() => {
        clear();
      }, wait);
    };
  };
}
