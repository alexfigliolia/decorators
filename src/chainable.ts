import { createMethodDecorator } from "./generators";

export const chainable = createMethodDecorator<any, (...args: any[]) => void>(
  original => {
    return function (this, ...args) {
      original.call(this, ...args);
      return this;
    };
  },
);
