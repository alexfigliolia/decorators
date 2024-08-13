import type { GenericFunction } from "./types";
import { extractName } from "./utilities";

/**
 * measureServer
 *
 * Measures the duration of all calls to the target method
 * and logs it to the console
 */
export function measureServer<F extends GenericFunction>(
  original: F,
  context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const name = extractName(this, context);
    const Chalk = require("chalk");
    const { performance } = require("node:perf_hooks");
    const then = performance.now();
    const value = original.call(this, ...args);
    if (value instanceof Promise) {
      void value.then(() => {
        console.log(
          Chalk.blue.bold("Method Call:"),
          Chalk.underline(`${name}.${context.name as string}`),
          "took",
          `${performance.now() - then}ms`,
        );
      });
    } else {
      console.log(
        Chalk.blue.bold("Method Call:"),
        Chalk.underline(`${name}.${context.name as string}`),
        "took",
        `${performance.now() - then}ms`,
      );
    }
    return value;
  };
}
