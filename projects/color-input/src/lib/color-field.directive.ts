/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef } from '@angular/core';
import { AbstractInputAccessor, ColorValidator, Hex, SkyDestroyService } from '@sky-ui/core';
import { DefaultImaskFactory } from 'angular-imask';
import { InputMask } from 'imask';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { SkyColorInputComponent } from './color-input.component';

@Directive({
    selector: 'input[skyColorField]',
    host: {
        '[attr.disabled]': 'host.disabled || null',
        '[attr.skyTextField]': 'true',
        '[readonly]': 'host.readonly',
        '(focus)': 'host.onFocusChange(true)',
        '(blur)': 'host.onFocusChange(false)',
    },
    providers: [SkyDestroyService, { provide: AbstractInputAccessor, useExisting: SkyColorFieldDirective }],
})
export class SkyColorFieldDirective extends AbstractInputAccessor<SkyColorInputComponent> {
    private mask!: InputMask<{ mask: any }>;

    constructor(
        datePicker: SkyColorInputComponent,
        nativeElementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        destroy: SkyDestroyService,
        maskFactory: DefaultImaskFactory
    ) {
        super(datePicker, nativeElementRef);

        this.mask = maskFactory.create(nativeElementRef.nativeElement, {
            mask: /^#[0-9a-f]{0,8}$/i,
            displayChar: '#',
        });

        this.mask.on('complete', () => {
            if (ColorValidator.isHexValid(this.mask.value as Hex)) {
                console.log('complete');
                this.host.onValueChange(this.mask.value as Hex);
            } else {
                this.host.onValueChange(null);
            }
        });

        this.host.valueChange.pipe(distinctUntilChanged(), takeUntil(destroy)).subscribe(value => {
            if (!value) {
                return;
            }

            this.mask.value = value;
        });
    }
}
