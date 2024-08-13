import type { DecoratorFunction, GenericClass, GenericFunction } from "./types";

export const extractName = <F extends GenericFunction>(
  instance: ThisParameterType<F>,
  context: ClassMethodDecoratorContext<
    ThisParameterType<F>,
    DecoratorFunction<ThisParameterType<F>, F>
  >,
) => {
  let name: string;
  if (context.static || typeof this === "function") {
    ({ name } = instance as GenericClass);
  } else {
    ({ name } = (instance as GenericClass).constructor);
  }
  return name;
};
