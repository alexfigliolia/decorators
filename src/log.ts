import { createMethodDecorator } from "./generators";

export const log = createMethodDecorator((original, context) => {
  if (process.env.NODE_ENV === "production") {
    return original;
  }
  if (typeof window !== "undefined") {
    return function (this, ...args) {
      console.log(
        "%cCalling:",
        "color: #26ad65; font-weight: bold",
        context.name,
        "with",
        args,
      );
      const v = original.call(this, ...args);
      if (v instanceof Promise) {
        void v.then(r => {
          console.log(
            "   %cReturning From:",
            "color: rgb(17, 118, 249); font-weight: bold; font-weight: bold",
            context.name,
            "with",
            r,
          );
        });
      } else {
        console.log(
          "   %cReturning From:",
          "color: rgb(17, 118, 249); font-weight: bold; font-weight: bold",
          context.name,
          "with",
          v,
        );
      }
      return v;
    };
  }
  return function (this, ...args) {
    const v = original.call(this, ...args);
    void import("chalk").then(({ default: Chalk }) => {
      console.log(
        Chalk.green.bold("Calling:"),
        Chalk.underline(context.name),
        "with",
        args,
      );
      if (v instanceof Promise) {
        void v.then(r => {
          console.log(
            Chalk.blue.bold("   Returning From:"),
            Chalk.underline(context.name),
            "with",
            r,
          );
        });
      } else {
        console.log(
          Chalk.blue.bold("   Returning From:"),
          Chalk.underline(context.name),
          "with",
          v,
        );
      }
      return v;
    });
    return v;
  };
});
