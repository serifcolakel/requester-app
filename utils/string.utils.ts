/**
 * @description Replace spaces with a prefix
 * @param str - string to replace spaces with prefix
 * @param prefix - prefix to replace spaces with
 * @returns The string with spaces replaced with the prefix
 */
export const replaceSpaces = (str: string, prefix = "-") => {
  return str.replace(/\s/g, prefix);
};
