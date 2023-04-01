export function isStrings(array: any): array is string[] {
    return Array.isArray(array) && typeof array[0] === 'string';
}
