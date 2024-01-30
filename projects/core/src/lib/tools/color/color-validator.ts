import { Hex } from './types';

export class ColorValidator {
    public static isHexValid(value: Hex): boolean {
        const regexp = RegExp('^#[A-Fa-f0-9]*$');
        if (!regexp.test(value)) {
            return false;
        }

        return value.length === 4 || value.length === 7 || value.length === 9;
    }
}
