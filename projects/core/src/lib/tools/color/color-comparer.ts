import { Rgb } from './types';

export class ColorComparer {
    /**
     * Check if color are equal.
     * @param color1 First color for comparison in `Rgb`.
     * @param color2 Second color for comparison in `Rgb`.
     * @returns `true` if colors are equal, otherwise `false`.
     */
    public static compare(color1: Rgb, color2: Rgb): boolean {
        return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2];
    }
}
