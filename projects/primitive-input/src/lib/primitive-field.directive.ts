import { Directive, ElementRef } from '@angular/core';

export interface FieldAccessor {
    nativeElement: HTMLInputElement;
}

@Directive({
    selector: 'input[skyPrimitiveField], textarea[skyPrimitiveField]',
})
export class SkyFieldDirective implements FieldAccessor {
    public get nativeElement(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    constructor(private elementRef: ElementRef<HTMLInputElement>) {}
}
