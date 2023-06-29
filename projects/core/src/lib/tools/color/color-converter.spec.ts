import { ColorConverter } from './color-converter';
import { Hex, Hsv, Rgb, Rgba } from './types';

describe('ColorConverter', () => {
    describe('rgb2hex', () => {
        it.each([
            { data: [37, 210, 225], expected: '#25d2e1' },
            { data: [168, 210, 225], expected: '#a8d2e1' },
            { data: [97, 132, 200], expected: '#6184c8' },
            { data: [0, 255, 0], expected: '#00ff00' },
        ])('should conver from RGB to hex correctly', parameter => {
            const result = ColorConverter.rgb2hex(parameter.data as Rgb);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('hex2rgb', () => {
        it.each([
            { data: '#25d2e1', expected: [37, 210, 225] },
            { data: '#a8d2e1', expected: [168, 210, 225] },
            { data: '#6184c8', expected: [97, 132, 200] },
            { data: '#00ff00', expected: [0, 255, 0] },
        ])('should convert color from hex to RGB correctly', parameter => {
            const result = ColorConverter.hex2rgb(parameter.data as Hex);

            expect(result).toEqual(parameter.expected);
        });

        it.each([
            { data: '#fff', expected: [255, 255, 255] },
            { data: '#000', expected: [0, 0, 0] },
            { data: '#fde', expected: [255, 221, 238] },
        ])('should convert color from short hex to RGB correctly', parameter => {
            const result = ColorConverter.hex2rgb(parameter.data as Hex);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('rgba2hex', () => {
        it.each([
            { data: [37, 210, 225, 0], expected: '#25d2e100' },
            { data: [168, 210, 225, 1], expected: '#a8d2e1' },
            { data: [97, 132, 200, 0.25], expected: '#6184c840' },
            { data: [97, 132, 200, 0.005], expected: '#6184c801' },
        ])('should conver from RGB to hex correctly', parameter => {
            const result = ColorConverter.rgba2hex(parameter.data as Rgba);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('hex2rgba', () => {
        it.each([
            { data: '#25d2e100', expected: [37, 210, 225, 0] },
            { data: '#a8d2e1', expected: [168, 210, 225, 1] },
            { data: '#6184c840', expected: [97, 132, 200, 0.25] },
        ])('should convert color from hex to RGB correctly', parameter => {
            const result = ColorConverter.hex2rgba(parameter.data as Hex);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('rgb2hsv', () => {
        it.each([
            { data: [68, 152, 231], expected: [209, 0.71, 0.91] },
            { data: [0, 15, 231], expected: [236, 1, 0.91] },
            { data: [0, 0, 0], expected: [0, 0, 0] },
            { data: [255, 167, 15], expected: [38, 0.94, 1] },
            { data: [255, 255, 255], expected: [0, 0, 1] },
        ])('should conver color in RGB to HSV correctly', parameter => {
            const result = ColorConverter.rgb2hsv(parameter.data as Rgb);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('hsv2rgb', () => {
        it.each([
            { data: [209, 0.71, 0.91], expected: [67, 152, 232] },
            { data: [236, 0.01, 0.91], expected: [230, 230, 232] },
            { data: [0, 0, 0], expected: [0, 0, 0] },
            { data: [0, 0, 1], expected: [255, 255, 255] },
        ])('should conver color in HSV to RGB correctly', parameter => {
            const result = ColorConverter.hsv2rgb(parameter.data as Hsv);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('hex2hsv', () => {
        it.each([
            { data: '#25d2e1', expected: [185, 0.84, 0.88] },
            { data: '#a8d2e1', expected: [196, 0.25, 0.88] },
            { data: '#6184c8', expected: [220, 0.52, 0.78] },
            { data: '#00ff00', expected: [120, 1, 1] },
            { data: '#00ff0000', expected: [120, 1, 1] },
            { data: '#00ff005e', expected: [120, 1, 1] },
            { data: '#fef', expected: [300, 0.07, 1] },
        ])('should conver color in HSV to RGB correctly', parameter => {
            const result = ColorConverter.hex2hsv(parameter.data as Hex);

            expect(result).toEqual(parameter.expected);
        });
    });

    describe('hsv2hex', () => {
        it.each([
            { data: [185, 0.83, 0.88], expected: '#26d1e0' },
            { data: [196, 0.25, 0.88], expected: '#a8d1e0' },
            { data: [220, 0.52, 0.78], expected: '#5f82c7' },
            { data: [120, 1, 1], expected: '#00ff00' },
        ])('should conver color in HSV to RGB correctly', parameter => {
            const result = ColorConverter.hsv2hex(parameter.data as Hsv);

            expect(result).toEqual(parameter.expected);
        });
    });
});
