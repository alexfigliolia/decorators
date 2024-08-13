import type { GenericFunction } from "./types";
import { extractName } from "./utilities";

/**
 * logServer
 *
 * Logs parameters and return values for the target method
 */
export function logServer<F extends GenericFunction>(
  original: F,
  context: ClassMethodDecoratorContext<ThisParameterType<F>, F>,
) {
  if (process.env.NODE_ENV === "production") {
    return original;
  }
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const name = extractName(this, context);
    const v = original.call(this, ...args);
    void import("chalk").then(({ default: Chalk }) => {
      console.log(
        Chalk.green.bold("Calling:"),
        Chalk.underline(`${name}.${context.name as string}`),
        "with",
        args,
      );
      if (v instanceof Promise) {
        void v.then(r => {
          console.log(
            Chalk.blue.bold("   Returning From:"),
            Chalk.underline(`${name}.${context.name as string}`),
            "with",
            r,
          );
        });
      } else {
        console.log(
          Chalk.blue.bold("   Returning From:"),
          Chalk.underline(`${name}.${context.name as string}`),
          "with",
          v,
        );
      }
    });
    return v;
  };
}
