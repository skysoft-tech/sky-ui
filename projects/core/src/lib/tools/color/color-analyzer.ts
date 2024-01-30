import { Rgb } from './types';

export class ColorAnalyzer {
    /**
     * Pick a color that is readable on bacground color
     * @param bacground Color in `Rgb` fromat
     * @param light Color in `Rgb` fromat
     * @param dark Color in `Rgb` fromat
     * @returns `light`or `dark` color depend which one is more redable.
     */
    public static pickReadableColor([r, g, b]: Rgb, light: Rgb = [255, 255, 255], dark: Rgb = [0, 0, 0]): Rgb {
        // https://stackoverflow.com/a/3943023/112731
        return r * 0.299 + g * 0.587 + b * 0.114 > 128 ? dark : light;
    }
}
