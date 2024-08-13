import { createMethodDecorator } from "./generators";

export const logServer = createMethodDecorator((original, context) => {
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
});
