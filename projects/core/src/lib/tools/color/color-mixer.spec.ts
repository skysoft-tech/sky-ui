import { ColorMixer } from './color-mixer';
import { Hex } from './types';

describe('ColorMixer', () => {
    describe('mix', () => {
        it('should mix colors in specified proportion correctly', () => {
            const colorA: Hex = '#3988b7';
            const colorB: Hex = '#b79239';
            const proportion: number = 66;

            const result = ColorMixer.mix(colorA, colorB, proportion);

            expect(result).toEqual('#648b8c');
        });

        it('should mix colors in equal proportions correctly', () => {
            const colorA: Hex = '#010101';
            const colorB: Hex = '#030303';

            const result = ColorMixer.mix(colorA, colorB);

            expect(result).toEqual('#020202');
        });

        it('should mix colors in equal proportion and three symbols format correctly', () => {
            const colorA: Hex = '#fff';
            const colorB: Hex = '#555';

            const result = ColorMixer.mix(colorA, colorB);

            expect(result).toEqual('#aaaaaa');
        });

        it('should throw error if if proportion less then 0', () => {
            const colorA: Hex = '#3988b7';
            const colorB: Hex = '#b79239';
            const proportion: number = -1;

            expect(() => ColorMixer.mix(colorA, colorB, proportion)).toThrow(
                new Error('Property `weight` must be between 0 and 100.')
            );
        });

        it('should throw error if if proportion bigger then 100', () => {
            const colorA: Hex = '#3988b7';
            const colorB: Hex = '#b79239';
            const proportion: number = 101;

            expect(() => ColorMixer.mix(colorA, colorB, proportion)).toThrow(
                new Error('Property `weight` must be between 0 and 100.')
            );
        });
    });

    describe('mixArray', () => {
        it('should mix array of collors in equal proportions correctly', () => {
            const colors: Hex[] = ['#3988B7', '#B79239', '#010101', '#BF17AF'];

            const result = ColorMixer.mixArray(colors);

            expect(result).toEqual('#6c4c68');
        });

        it('should return the same color if only one color in array', () => {
            const colors: Hex[] = ['#3988B7'];

            const result = ColorMixer.mixArray(colors);

            expect(result).toEqual('#3988B7');
        });

        it('should throw error if array is empty', () => {
            const colors: Hex[] = [];

            expect(() => ColorMixer.mixArray(colors)).toThrow(new Error(`Array can't be empty.`));
        });
    });
});
