import { ColorConverter } from './color-converter';
import { Hex, Rgb } from './types';

/**
 * Tools for color mixing.
 */
export class ColorMixer {
    /**
     * Mix colors in specified proportion.
     * @param colorA First color to mix in `Hex`.
     * @param colorB Second color to mix in `Hex`.
     * @param weight Proportion in which colors mill be mixed. Between 0 and 100, where 50 is equal proportion. `Default` is 50.
     * @returns Color in `Hex` that is result of mixing `colorA` and `colorB`.
     */
    public static mix(colorA: Hex, colorB: Hex, weight: number = 50): Hex {
        if (weight < 0 || weight > 100) {
            throw new Error('Property `weight` must be between 0 and 100.');
        }

        const resultColor: Rgb = [0, 0, 0];

        const rgbColorA = ColorConverter.hex2rgb(colorA); //this.getRgbParts(colorA).map(this.hex2dec);
        const rgbColorB = ColorConverter.hex2rgb(colorB);

        for (let i = 0; i < rgbColorA.length; i++) {
            const cAPart = rgbColorA[i];
            const cBPart = rgbColorB[i];
            const partsCombination = Math.round(cBPart + (cAPart - cBPart) * (weight / 100));
            resultColor[i] = partsCombination;
        }

        return ColorConverter.rgb2hex(resultColor);
    }

    /**
     * Mix array of colors in equal proportion.
     * @param colors Array of colors that will be mixed, in `Hex`.
     * @returns Color in `Hex` that is result of mixing colors in array in equal proportion.
     */
    public static mixArray(colors: Hex[]): Hex {
        if (colors.length === 0) {
            throw new Error(`Array can't be empty.`);
        }

        let result: Hex | null = null;
        let r = 2;

        for (let color of colors) {
            if (!result) {
                result = color;
                continue;
            }

            const proportion = 100 / r;

            result = ColorMixer.mix(color, result, proportion);
            r++;
        }

        return result!;
    }
}
