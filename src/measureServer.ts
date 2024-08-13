import { createMethodDecorator } from "./generators";

export const measureServer = createMethodDecorator((original, context) => {
  return function (this, ...args) {
    let name: string;
    if (context.static) {
      ({ name } = this);
    } else {
      ({ name } = this.constructor);
    }
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
});
