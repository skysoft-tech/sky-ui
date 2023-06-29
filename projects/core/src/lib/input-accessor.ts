import { Directive, Inject, ElementRef } from '@angular/core';
import { AbstractSkyControl } from './control';

@Directive()
export class AbstractInputAccessor<TControl extends AbstractSkyControl<any>> {
    constructor(
        @Inject(AbstractSkyControl) protected readonly host: TControl,
        public nativeElementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {}
}
