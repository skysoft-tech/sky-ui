import { ColorComparer } from './color-comparer';
import { Rgb } from './types';

type Parameter = {
    data: {
        color1: Rgb;
        color2: Rgb;
    };
    expected: boolean;
};

describe('ColorComparer', () => {
    describe('compare', () => {
        it.each<Parameter>([
            { data: { color1: [0, 0, 0], color2: [0, 0, 0] }, expected: true },
            { data: { color1: [255, 255, 255], color2: [255, 255, 255] }, expected: true },
            { data: { color1: [18, 168, 25], color2: [18, 168, 25] }, expected: true },
            { data: { color1: [0, 0, 1], color2: [0, 0, 0] }, expected: false },
            { data: { color1: [255, 0, 15], color2: [0, 15, 255] }, expected: false },
            { data: { color1: [254, 254, 254], color2: [255, 255, 255] }, expected: false },
        ])('Should compare colors correct', parameter => {
            const result = ColorComparer.compare(parameter.data.color1, parameter.data.color2);

            expect(result).toEqual(parameter.expected);
        });
    });
});
