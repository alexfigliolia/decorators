import { createMethodDecorator } from "./generators";

export const logBrowser = createMethodDecorator((original, context) => {
  if (process.env.NODE_ENV === "production") {
    return original;
  }
  return function (this, ...args) {
    let name: string;
    if (context.static) {
      ({ name } = this);
    } else {
      ({ name } = this.constructor);
    }
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
});
