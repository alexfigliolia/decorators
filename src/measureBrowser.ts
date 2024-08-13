import { createMethodDecorator } from "./generators";

export const measureBrowser = createMethodDecorator((original, context) => {
  return function (this, ...args) {
    let name: string;
    if (context.static) {
      ({ name } = this);
    } else {
      ({ name } = this.constructor);
    }
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
});
