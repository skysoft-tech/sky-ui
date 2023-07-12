/* eslint-disable @angular-eslint/no-host-metadata-property */

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    Optional,
    Self,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
    AbstarctSkyToggle,
    AbstractInputAccessor,
    AbstractSkyControl,
    ErrorStateMatcher,
    SkyInputNameController,
} from '@sky-ui/core';

@Component({
    selector: 'sky-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        ErrorStateMatcher,
        SkyInputNameController,
        {
            provide: AbstractSkyControl,
            useExisting: SkyCheckboxComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.sky-checkbox-checked]': 'checked',
        '[class.sky-checkbox-disabled]': 'disabled',
        '[class.sky-checkbox-indeterminate]': 'indeterminate',
    },
})
export class SkyCheckboxComponent extends AbstarctSkyToggle implements AfterViewInit {
    private _indeterminate: boolean = false;
    @Input()
    get indeterminate(): boolean {
        return this._indeterminate;
    }
    set indeterminate(value: boolean) {
        this._indeterminate = value;
    }

    @Input()
    showErrors = true;

    @ContentChild(AbstractInputAccessor)
    control?: AbstractInputAccessor<SkyCheckboxComponent>;

    @ViewChild('input') input!: ElementRef<HTMLInputElement>;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null,
        private readonly _inputNameController: SkyInputNameController
    ) {
        super('sky-checkbox-', changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);
    }

    ngAfterViewInit(): void {
        const name = this.ngControl?.name || this.inputId;
        this._inputNameController.checkName(name, this.control?.nativeElementRef, this.input);
    }

    blur() {
        this.focused = false;
    }

    focus() {
        this.focused = true;
    }

    inputClick(event: Event) {
        this.indeterminate = false;
        this.handleInputClick();
        event.stopPropagation();
    }
}
