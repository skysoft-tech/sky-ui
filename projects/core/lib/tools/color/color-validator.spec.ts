import { ColorValidator } from './color-validator';
import { Hex } from './types';

describe('ColorValidator', () => {
    describe('isHexValid', () => {
        [
            { data: '#000', expected: true },
            { data: '#0ee000', expected: true },
            { data: '#ffffffff', expected: true },
            { data: '#0', expected: false },
            { data: '#0edf', expected: false },
            { data: '#00g', expected: false },
        ].forEach(parameter => {
            it('Should validate color in hex correctly', () => {
                const result = ColorValidator.isHexValid(parameter.data as Hex);

                expect(result).toEqual(parameter.expected);
            });
        });
    });
});
