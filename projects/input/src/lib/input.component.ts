import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DoCheck,
    ElementRef,
    Input,
    OnDestroy,
    Optional,
    Self,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { AbstractInputAccessor, AbstractSkyControl, ErrorStateMatcher, SkyInputNameController } from '@sky-ui/core';

@Component({
    selector: 'sky-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        SkyInputNameController,
        {
            provide: AbstractSkyControl,
            useExisting: SkyInputComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SkyInputComponent
    extends AbstractSkyControl<string>
    implements AfterViewInit, DoCheck, OnDestroy, AfterContentInit
{
    @Input()
    textfieldCleaner = false;

    @Input()
    showErrors = true;

    @ContentChild(AbstractInputAccessor)
    control?: AbstractInputAccessor<SkyInputComponent>;

    autofilled: boolean = false;

    get showCleaner(): boolean {
        return this.cleaner && !!this.value && !this.disabled && !this.readOnly;
    }

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,
        private autofillMonitor: AutofillMonitor,
        private inputNameController: SkyInputNameController,
        private nativeElement: ElementRef<HTMLElement>,
        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null
    ) {
        super(changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();

            if (this.ngControl.disabled !== this.disabled) {
                this.disabled = !!this.ngControl.disabled;
            }
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngAfterViewInit() {
        if (!this.control) {
            console.warn('Control is not provided');
            return;
        }

        this.autofillMonitor.monitor(this.control.nativeElementRef).subscribe(event => {
            this.autofilled = event.isAutofilled;
            this.checkControlUpdate();
        });
    }

    ngAfterContentInit() {
        this.inputNameController.checkName(
            this.ngControl?.name,
            this.nativeElement,
            this.control?.nativeElementRef as ElementRef<HTMLInputElement>
        );
    }

    ngOnDestroy() {
        if (this.control) {
            this.autofillMonitor.stopMonitoring(this.control.nativeElementRef);
        }
    }

    clear() {
        this.value = '';
    }

    blur() {
        this.control?.nativeElementRef.nativeElement.blur();
    }

    focus() {
        this.control?.nativeElementRef.nativeElement.focus();
    }
}
