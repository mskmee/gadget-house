/**
 *
 * @param str - The input string
 * @returns Returns the string with first capitalized letter and lowered others
 * @example
 * ```ts
 * formatTitle('heLLO'); // 'Hello'
 * ```
 */
export function formatTitle(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}
