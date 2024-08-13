import type { DecoratorFunction, GenericFunction } from "./types";
import { extractName } from "./utilities";

/**
 * measureBrowser
 *
 * Measures the duration of all calls to the target method
 * and logs it to the console
 */
export function measureBrowser<F extends GenericFunction>(
  original: F,
  context: ClassMethodDecoratorContext<
    ThisParameterType<F>,
    DecoratorFunction<ThisParameterType<F>, F>
  >,
) {
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const name = extractName(this, context);
    const then = performance.now();
    const value = original.call(this, ...args);
    if (value instanceof Promise) {
      void value.then(() => {
        console.log(
          "%cMethod Call:",
          "color: rgb(17, 118, 249); font-weight: bold; font-weight: bold",
          `${name}.${context.name as string}`,
          "took",
          `${performance.now() - then}ms`,
        );
      });
    } else {
      console.log(
        "%cMethod Call:",
        "color: rgb(17, 118, 249); font-weight: bold; font-weight: bold",
        `${name}.${context.name as string}`,
        "took",
        `${performance.now() - then}ms`,
      );
    }
    return value;
  };
}
