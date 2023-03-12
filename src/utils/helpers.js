export const isTouch =
  'ontouchstart' in window ||
  (window.DocumentTouch && document instanceof window.DocumentTouch);

export const stall = async (stallTime = 500) => {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
};

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return `${str.slice(0, num)}...`;
};
