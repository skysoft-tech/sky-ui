/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Directive } from '@angular/core';
import { AbstractInputAccessor } from '@sky-ui/core';
import { SkyInputComponent } from './input.component';

@Directive({
    selector: 'input[skyTextfield], textarea[skyTextfield]',
    host: {
        '[attr.disabled]': 'host.disabled || null',
        '[readonly]': 'host.readonly',
        '[value]': 'host.value',
        '(input)': 'host.onValueChange($event.target.value)',
        '(focus)': 'host.onFocusChange(true)',
        '(blur)': 'host.onFocusChange(false)',
    },
    providers: [{ provide: AbstractInputAccessor, useExisting: SkyTextfieldDirective }],
})
export class SkyTextfieldDirective extends AbstractInputAccessor<SkyInputComponent> {
    // @HostBinding('value')
    // get value(): string | null {
    //     return this.host.value;
    // }
    // @HostListener('input', ["$event.target.value"])
    // input(inputValue: string | null){
    //     this.host.onValueChange(inputValue)
    // }
}
