import { createMethodDecorator } from "./generators";

export function throttle(wait: number) {
  return createMethodDecorator<any, (...args: any[]) => void>(original => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const clear = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    return function (this, ...args) {
      if (timer) {
        return;
      }
      original.call(this, ...args);
      timer = setTimeout(() => {
        clear();
      }, wait);
    };
  });
}
