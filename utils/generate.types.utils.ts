import JsonToTS from "json-to-ts";

/**
 * @description - Generate types for a given data
 * @param data - The data to generate types for
 * @param rootName - The root name of the generated types
 * @returns - The generated types
 */
export const getDataType = (
  data: unknown,
  rootName: string = "Root"
): string => {
  let result = "";

  JsonToTS(data, {
    rootName,
  }).forEach((type, i) => {
    result += `${i !== 0 ? "\n" : ""}${type}\n`;
  });

  return result;
};
