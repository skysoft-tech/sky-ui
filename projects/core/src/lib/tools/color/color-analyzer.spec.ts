import { ColorAnalyzer } from './color-analyzer';
import { Rgb } from './types';

describe('ColorAnalyzer', () => {
    describe('pickContrastColor', () => {
        it.each<{ data: Rgb; expected: Rgb }>([
            { data: [144, 107, 146], expected: [255, 255, 255] },
            { data: [211, 132, 22], expected: [255, 255, 255] },
            { data: [53, 222, 179], expected: [255, 255, 255] },
            { data: [231, 96, 251], expected: [255, 255, 255] },
            { data: [127, 231, 143], expected: [0, 0, 0] },
            { data: [203, 255, 0], expected: [0, 0, 0] },
            { data: [196, 233, 199], expected: [0, 0, 0] },
        ])('Should pick correct collor', parameter => {
            const result = ColorAnalyzer.pickReadableColor(parameter.data);

            expect(result).toEqual(parameter.expected);
        });
    });
});
