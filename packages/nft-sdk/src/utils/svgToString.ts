/**
 * Normalize SVG by removing whitespaces & newlines
 * Used for testing
 */
export function svgToString(str: string) {
    return str.replace(/[\r\n]/gm, '').replaceAll(' ', '');
}
