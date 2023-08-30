import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
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
    selector: 'sky-slide-toggle',
    templateUrl: './slide-toggle.component.html',
    styleUrls: ['./slide-toggle.component.scss'],
    providers: [
        SkyInputNameController,
        {
            provide: AbstractSkyControl,
            useExisting: SkySlideToggleComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SkySlideToggleComponent extends AbstarctSkyToggle implements AfterContentInit {
    @Input()
    showErrors = true;

    @ContentChild(AbstractInputAccessor)
    control?: AbstractInputAccessor<SkySlideToggleComponent>;

    @ViewChild('input') input!: ElementRef<HTMLInputElement>;

    @HostBinding('class.sky-slide-toggle-checked')
    get checkedClass() {
        return this.checked;
    }

    @HostBinding('class.sky-slide-toggle-disabled')
    get disabledClass() {
        return this.disabled;
    }

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null,
        private readonly _inputNameController: SkyInputNameController
    ) {
        super('sky-slide-toggle-', changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);
    }

    ngAfterContentInit(): void {
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
        this.handleInputClick();
        event.stopPropagation();
    }
}
