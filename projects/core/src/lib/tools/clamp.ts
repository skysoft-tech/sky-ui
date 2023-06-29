/**
 * Clamps a value between two inclusive limits.
 * @param value data to clamp
 * @param min lower limit.
 * @param max upper limit.
 * @returns  `value` if it is between limits,
 *           `min` if `value` is less than `min`,
 *           `max` if `value` is bigger than `max`.
 */
export function skyClamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
