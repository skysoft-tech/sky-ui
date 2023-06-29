import { Hex, Hsv, Rgb, Rgba } from './types';

/**
 * Tools for color converting.
 */
export class ColorConverter {
    /**
     * Conver color from `Hex` to `Hsv`
     * @param value Color in `Hex` format.
     * @returns Color in `Hsv` format.
     */
    public static hex2hsv(value: Hex): Hsv {
        const rgb = ColorConverter.hex2rgb(value);
        return ColorConverter.rgb2hsv(rgb);
    }

    /**
     * Conver color from `Hsv` to `Hex`
     * @param value Color in `Hsv` format.
     * @returns Color in `Hex` format.
     */
    public static hsv2hex(value: Hsv): Hex {
        const rgb = ColorConverter.hsv2rgb(value);
        return ColorConverter.rgb2hex(rgb);
    }

    /**
     * Conver color from `Hsv` to `Rgb`
     * @param value Color in `Hsv` format.
     * @returns Color in `Rgb` format.
     */
    public static hsv2rgb(value: Hsv): Rgb {
        // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
        const [h, s, v] = value;

        const f = (n: number): number => {
            const k = (n + h / 60) % 6;
            return ColorConverter.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
        };

        return [f(5), f(3), f(1)];
    }

    /**
     * Conver color from `Rgb` to `Hsv`
     * @param value Color in `Rgb` format.
     * @returns Color in `Hsv` format.
     */
    public static rgb2hsv(value: Rgb): Hsv {
        // https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
        let [r, g, b] = value;
        r = r / 255;
        g = g / 255;
        b = b / 255;
        let v = Math.max(r, g, b);
        const c = v - Math.min(r, g, b);

        let k = 0;
        if (c !== 0) {
            if (v === b) {
                k = (r - g) / c + 4;
            } else if (v === g) {
                k = (b - r) / c + 2;
            } else if (v === r) {
                k = ((g - b) / c) % 6;
            }
        }

        const h = ColorConverter.round(60 * k);
        const s = v === 0 ? 0 : ColorConverter.round(c / v, 2);
        v = ColorConverter.round(v, 2);

        return [h, s, v];
    }

    /**
     * Conver color from `Hex` to `Rgb`
     * @param value Color in `Hex` format.
     * @returns Color in `Rgb` format.
     */
    public static hex2rgb(value: Hex): Rgb {
        const hexParts = [];
        const hexStr = value.replace(/#/g, '');
        let segmentLength = 1;

        if (hexStr.length > 3) {
            segmentLength = 2;
        }

        for (let i = 0; i < hexStr.length; i += segmentLength) {
            let part = hexStr.slice(i, i + segmentLength);

            if (segmentLength === 1) {
                part += part;
            }

            hexParts.push(this.hex2dec(part));
        }

        return hexParts as Rgb;
    }

    /**
     * Conver color from `Rgb` to Hex``
     * @param value Color in `Rgb` format.
     * @returns Color in `Hex` format.
     */
    public static rgb2hex(value: Rgb): Hex {
        const hexParts = value.map(p => {
            let hex = this.dec2hex(p);

            if (hex.length < 2) {
                hex = `0${hex}`;
            }

            return hex;
        });

        return `#${hexParts.join('')}`;
    }

    /**
     * Conver color from `Hex` to Rgba``
     * @param value Color in `Rgba` format.
     * @returns Color in `Rgba` format.
     */
    public static hex2rgba(value: Hex): Rgba {
        let a = 1;
        if (value.length > 7) {
            const aInHex = value.slice(-2);
            a = ColorConverter.round(this.hex2dec(aInHex) / 255, 2);
            value = value.slice(0, -2) as Hex;
        }

        const rgb = ColorConverter.hex2rgb(value);

        return [...rgb, a];
    }

    /**
     * Conver color from `Rgba` to Hex``
     * @param value Color in `Rgba` format.
     * @returns Color in `Hex` format.
     */
    public static rgba2hex(value: Rgba): Hex {
        const [r, g, b, a] = value;
        const rgbInHex = ColorConverter.rgb2hex([r, g, b]);
        let aInHex = '';

        if (a !== 1) {
            aInHex = ColorConverter.dec2hex(ColorConverter.round(a * 255));
            if (aInHex.length === 1) {
                aInHex = `0${aInHex}`;
            }
        }

        return (rgbInHex + aInHex) as Hex;
    }

    private static dec2hex(value: number) {
        return value.toString(16);
    }

    private static hex2dec(value: string): number {
        return parseInt(value, 16);
    }

    private static round(value: number, precision: number = 0): number {
        const k = Math.pow(10, precision);

        return Math.round(value * k) / k;
    }
}
