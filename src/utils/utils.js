export const BASE_URL = "https://test.create.diagnal.com";

export function throttle(func, wait) {
  let isWaiting = false;
  return function executedFunction(...args) {
    if (!isWaiting) {
      func.apply(this, args);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, wait);
    }
  };
}
