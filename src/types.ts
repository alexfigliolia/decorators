export type GenericFunction<A extends any[] = any[], V = any> = (
  ...args: A
) => V;

export type DecoratorFunction<T, F extends GenericFunction> = (
  this: T,
  ...args: Parameters<F>
) => ReturnType<F>;

export type MethodGenerator<T, F extends GenericFunction> = (
  original: F,
  context: ClassMethodDecoratorContext<T, DecoratorFunction<T, F>>,
) => DecoratorFunction<T, F>;

export type GenericClass<A extends any[] = any[], V = any> = abstract new (
  ...args: A
) => V;
