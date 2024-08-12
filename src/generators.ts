import type {
  DecoratorFunction,
  GenericClass,
  GenericFunction,
  MethodGenerator,
} from "./types";

export const createMethodDecorator = <T, F extends GenericFunction>(
  func: MethodGenerator<T, F>,
) => {
  return (
    original: F,
    context: ClassMethodDecoratorContext<T, DecoratorFunction<T, F>>,
  ) => {
    return func(original, context);
  };
};

export const createClassDecorator = <
  T extends GenericClass,
  F extends (instance: T, context: ClassDecoratorContext<T>) => T,
>(
  func: F,
) => {
  return (instance: T, context: ClassDecoratorContext<T>) => {
    return func(instance, context);
  };
};
