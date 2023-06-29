import { ChangeDetectorRef, Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateField, ErrorStateMatcher } from './errors';
import { BooleanInput, coerceBooleanProperty, EMPTY_FUNCTION } from './tools';

@Directive()
export abstract class AbstractSkyControl<T> extends ErrorStateField implements ControlValueAccessor {
    protected _value: T | null = null;
    protected _required: boolean | undefined;

    protected onTouched = EMPTY_FUNCTION;

    protected onChange = EMPTY_FUNCTION;

    protected get controlName(): string | null {
        return this.ngControl?.name?.toString() ?? null;
    }

    protected get isInteractive(): boolean {
        return !this.readOnly && !this.disabled;
    }

    @Input()
    @HostBinding('class.readonly')
    readOnly: boolean = false;

    @Input()
    disabled: boolean = false;

    @HostBinding('class.focused')
    focused: boolean = false;

    @Input()
    get value(): T | null {
        return this._value;
    }
    set value(value: T | null) {
        if (value !== this.value) {
            this._value = value;
            this.notifyAboutChange();
        }
    }

    @Input()
    get required(): boolean {
        return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
    }
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }

    @Input()
    cleaner: boolean = true;

    @Output()
    readonly valueChange = new EventEmitter<T | null>();

    @HostBinding('class.invalid')
    get invalid(): boolean {
        return this.isInteractive && this.errorState;
    }

    protected constructor(
        protected readonly changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,

        ngControl: NgControl | null,
        parentForm: NgForm | null,
        parentFormGroup: FormGroupDirective | null
    ) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

        if (this.ngControl === null) {
            console.warn(`NgControl is not injected in ${this.constructor.name}`);
        } else {
            this.ngControl.valueAccessor = this;
        }
    }

    onFocusChange(isFocused: boolean) {
        this.focused = isFocused;
        if (!isFocused) {
            this.controlMarkAsTouched();
        }
    }

    /**
     * This method is called from the inner input
     * @param value incoming value
     */
    onValueChange(value: T | null): void {
        this.value = value;
    }

    /**
     * This method is called when FormControl is changed from code
     * @param value incoming value
     */
    writeValue(value: T | null): void {
        this.value = value;
    }

    registerOnChange(onChange: (value: T | null) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    private controlMarkAsTouched() {
        this.onTouched();
        this.checkControlUpdate();
    }

    protected notifyAboutChange() {
        this.onChange(this.value);
        this.valueChange.emit(this.value);
        this.checkControlUpdate();
    }

    protected checkControlUpdate() {
        this.changeDetectorRef.markForCheck();
    }
}
