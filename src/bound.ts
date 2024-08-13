import { createMethodDecorator } from "./generators";
import type { GenericClass, GenericFunction } from "./types";

export const bound = createMethodDecorator<
  Record<string | symbol, any> & GenericClass,
  GenericFunction
>((original, context) => {
  context.addInitializer(function (this) {
    this[context.name] = this[context.name].bind(this);
  });
  return original;
});
