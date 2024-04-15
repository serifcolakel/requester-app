/**
 * @description - Replace spaces with a prefix
 * @param str - string to replace spaces with prefix
 * @param regex - regex to match the string
 * @returns - boolean indicating if the string has a match
 */
export const hasMatch = (str: string, regex: RegExp): boolean => {
  return str.match(regex) !== null;
};

/**
 * @description Check if two values are equal
 * @param a - first value to compare
 * @param b - second value to compare
 * @returns - boolean indicating if the two values are equal
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
  // TODO (serif) : Implement a better comparison function without using any external libraries
  return JSON.stringify(a) === JSON.stringify(b);
};
