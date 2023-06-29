import { ChangeDetectorRef, Directive, Input, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AbstractSkyControl } from './control';
import { ErrorStateMatcher } from './errors';

let nextUniqueId = 0;

@Directive()
export class AbstarctSkyToggle extends AbstractSkyControl<boolean> {
    @Input()
    get checked(): boolean {
        return this.value || false;
    }
    set checked(value: boolean) {
        this.value = value;
    }

    private _uniqueId: string;
    @Input() id: string;
    get inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    constructor(
        idPrefix: string,
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null
    ) {
        super(changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);

        this.id = this._uniqueId = `${idPrefix}${++nextUniqueId}`;
    }

    protected handleInputClick(): void {
        this.value = !this.value;
    }

    interactionEvent(event: Event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
}
