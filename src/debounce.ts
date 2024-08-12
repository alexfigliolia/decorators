import { createMethodDecorator } from "./generators";

export function debounce(wait: number) {
  return createMethodDecorator<any, (...args: any[]) => void>(
    (original, _context) => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      const clear = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
      return function (this, ...args) {
        clear();
        timer = setTimeout(() => {
          original.call(this, ...args);
        }, wait);
      };
    },
  );
}
