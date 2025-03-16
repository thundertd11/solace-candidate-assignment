/**
 * Sanitizes string parameters to prevent SQL injection
 * @param value The string value to sanitize
 * @returns Sanitized string
 */
const sanitizeParam = (value: string | null): string =>
  value ? value.trim().replace(/[%_'"\\;:]/g, '') : '';

export default sanitizeParam;
