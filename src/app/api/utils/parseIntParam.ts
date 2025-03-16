/**
 * This function parses a string parameter to an integer.
 * It throws an error if the parsing fails.
 * @param {string} value - The string value to parse.
 * @returns {number} - The parsed integer.
 * @throws {Error} - Throws an error if parsing fails.
 */
const parseIntParam = (value: string): number => {
  try {
    return parseInt(value, 10); //base 10, avoids hexadecimal if string starts with 0x
  } catch (error) {
    throw new Error('Error parsing parameter.');
  }
};

export default parseIntParam;
