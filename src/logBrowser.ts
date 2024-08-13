import type { DecoratorFunction, GenericFunction } from "./types";
import { extractName } from "./utilities";

/**
 * logBrowser
 *
 * Logs parameters and return values for the target method
 */
export function logBrowser<F extends GenericFunction>(
  original: F,
  context: ClassMethodDecoratorContext<
    ThisParameterType<F>,
    DecoratorFunction<ThisParameterType<F>, F>
  >,
): DecoratorFunction<ThisParameterType<F>, F> {
  if (process.env.NODE_ENV === "production") {
    return original;
  }
  return function (this, ...args: Parameters<F>) {
    const name = extractName(this, context);
    console.log(
      "%cCalling:",
      "color: #26ad65; font-weight: bold",
      `${name}.${context.name as string}`,
      "with",
      args,
    );
    const v = original.call(this, ...args);
    if (v instanceof Promise) {
      void v.then(r => {
        console.log(
          "   %cReturning From:",
          "color: rgb(17, 118, 249); font-weight: bold; font-weight: bold",
          `${name}.${context.name as string}`,
          "with",
          r,
        );
      });
    } else {
      console.log(
        "   %cReturning From:",
        "color: rgb(17, 118, 249); font-weight: bold; font-weight: bold",
        `${name}.${context.name as string}`,
        "with",
        v,
      );
    }
    return v;
  };
}
