import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChildren,
    ElementRef,
    AfterViewInit,
    ViewEncapsulation,
    Optional,
    Self,
    ChangeDetectorRef,
    DoCheck,
    ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AbstractSkyControl, AutofillExtentionService, ErrorStateMatcher, SkyDestroyService } from '@sky-ui/core';
import { Subscription, takeUntil } from 'rxjs';

@Component({
    selector: 'sky-code-input',
    templateUrl: './code-input.component.html',
    styleUrls: ['./code-input.component.scss'],
    providers: [
        SkyDestroyService,
        {
            provide: AbstractSkyControl,
            useExisting: SkyCodeInputComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SkyCodeInputComponent extends AbstractSkyControl<string> implements AfterViewInit, DoCheck {
    @Input()
    set codeLength(value: number) {
        this.placeholders = new Array(value).fill(null);
    }

    autofill!: Subscription;

    @Input()
    showErrors = false;

    @Input()
    override get value(): string | null {
        return this._value;
    }
    override set value(value: string | null) {
        if (value !== this.value) {
            if (!value) {
                this.reset();
            } else {
                this.setInputValues(value);
            }
            this._value = value;
            this.emitChanges();
        }
    }

    @Input()
    public onlyDigitsAllowed = true;

    @ViewChild('extensionTarget') extensionTarget!: ElementRef<HTMLInputElement>;

    @ViewChildren('cell')
    public cellRefs: Array<ElementRef<HTMLInputElement>> = [];
    public inputs: Array<HTMLInputElement> = [];
    public placeholders: Array<void> = [];

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,

        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null,

        private autofillExtentionService: AutofillExtentionService,
        private destroy: SkyDestroyService
    ) {
        super(changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);
        this.codeLength = 6;
    }

    ngAfterViewInit(): void {
        this.inputs = Array.from(this.cellRefs).map(e => e.nativeElement);
        this.autofill = this.autofillExtentionService
            .observeExtentionValue(this.extensionTarget.nativeElement)
            .pipe(takeUntil(this.destroy))
            .subscribe(value => {
                this.setInputValues(value, 0);
                this.emitChanges();
            });

        this.setInputValues(this.value ?? '', 0);
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

    onPaste(e: ClipboardEvent, index: number): void {
        e.preventDefault();
        e.stopPropagation();

        if (!e.clipboardData) return;

        const data = e.clipboardData.getData('text').trim();

        this.setInputValues(data, index);

        this.emitChanges();
        this.inputs[index].blur();
        return;
    }

    onInput(event: Event, i: number): void {
        const e = event as InputEvent;
        const value = e.data as string;
        if (!this.isValidInputEvent(e) || !this.isValidInput(value)) {
            e.preventDefault();
            e.stopPropagation();
            this.setSingleInputValue(i, '');
            return;
        }

        this.setSingleInputValue(i, value);
        this.jumpToNextCell(i, true);
        return;
    }

    isValidInputEvent = (e: InputEvent) => e.inputType === 'insertText';

    isValidInput(value: string | null) {
        if (!value) return false;

        const isNumber = /\d/.test(value);
        if (this.onlyDigitsAllowed && !isNumber) return false;

        const isLetterOrNumber = /[a-zA-Z0-9]/.test(value);
        if (!this.onlyDigitsAllowed && !isLetterOrNumber) return false;

        return true;
    }

    jumpToCell(index: number): void {
        this.inputs[index]?.focus();
        this.inputs[index]?.select();

        this.emitChanges();
    }

    jumpToNextCell(index: number, canBeComplete = false) {
        const next = index + 1;
        if (canBeComplete && next === this.inputs.length) {
            this.inputs[index]?.blur();
            this.emitChanges();
            return;
        }
        this.jumpToCell(next);
    }

    jumpToPreviousCell(index: number) {
        this.jumpToCell(index - 1);
    }

    setSingleInputValue(index: number, value: string) {
        this.inputs[index].value = value;
    }

    reset() {
        this.inputs.forEach((_, index) => this.setSingleInputValue(index, ''));
    }

    setInputValues(data: string, startIndex = 0) {
        const values = data.split('');

        let inputIndex = startIndex;
        let valueIndex = 0;
        while (inputIndex < this.inputs.length && valueIndex < values.length) {
            const value = values[valueIndex].toString();

            if (!this.isValidInput(value)) {
                this.setSingleInputValue(inputIndex, '');
                return;
            }

            this.setSingleInputValue(inputIndex, value);

            inputIndex++;
            valueIndex++;
        }
    }

    emitChanges() {
        if (this.inputs.length === 0) {
            return;
        }

        const value = this.inputs.map(i => i.value).join('');

        if (value !== this.value) {
            this._value = value;
            this.notifyAboutChange();
        }
    }
}
