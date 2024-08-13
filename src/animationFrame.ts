import { createMethodDecorator } from "./generators";

export const animationFrame = createMethodDecorator((original, _context) => {
  return function (this, ...args) {
    requestAnimationFrame(() => {
      original.call(this, ...args);
    });
  };
});
