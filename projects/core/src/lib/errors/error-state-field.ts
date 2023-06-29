import { Directive, EventEmitter } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, ValidationErrors, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from './error-state-matcher';

@Directive()
export abstract class ErrorStateField {
    /** Whether the component is in an error state. */
    errorState: boolean = false;

    /** An object used to control the error state of the component. */
    errorStateMatcher: ErrorStateMatcher;

    errorStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    get errors(): ValidationErrors | null {
        const parent = this.parentFormGroup || this.parentForm;
        if (!parent) {
            return null;
        }

        return parent.errors;
    }

    constructor(
        protected defaultErrorStateMatcher: ErrorStateMatcher,
        protected parentForm: NgForm | null,
        protected parentFormGroup: FormGroupDirective | null,
        public ngControl: NgControl | null
    ) {
        this.errorStateMatcher = defaultErrorStateMatcher;
    }

    /** Updates the error state based on the provided error state matcher. */
    updateErrorState() {
        if (!this.ngControl) {
            return;
        }

        const oldState = this.errorState;
        const parent = this.parentFormGroup || this.parentForm;
        const matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
        const control = this.ngControl ? (this.ngControl.control as FormControl<unknown | null>) : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.errorStateChange.emit(newState);
        }
    }
}
