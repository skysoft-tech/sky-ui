import { Directive, ElementRef, Input } from '@angular/core';

export type ColorKind = 'basic' | 'primary' | 'accent' | 'warn' | undefined;

const DefaultColor: ColorKind = 'basic';

@Directive()
export abstract class ColoredComponent {
    protected constructor(private elementRef: ElementRef) {
        this.color = DefaultColor;
    }

    private _color: ColorKind;

    get color(): ColorKind {
        return this._color;
    }

    @Input()
    set color(value: ColorKind) {
        const colorPalette = value || DefaultColor;
        if (colorPalette !== this._color) {
            if (this._color) {
                this.elementRef.nativeElement.classList.remove(`sky-${this._color}`);
            }
            if (colorPalette) {
                this.elementRef.nativeElement.classList.add(`sky-${colorPalette}`);
            }

            this._color = colorPalette;
        }
    }
}
