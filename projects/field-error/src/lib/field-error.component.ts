import { ChangeDetectorRef, Component, Host, Input, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormControlStatus, FormGroupDirective, NgControl } from '@angular/forms';
import { AbstractSkyControl, SkyDestroyService } from '@sky-ui/core';

import {
    AsyncFieldErrorMessageService,
    FieldErrorMessageService,
    SimpleFieldErrorMessage,
} from './field-error.service';
import { combineLatest, concat, map, Observable, of, switchMap, take, takeUntil } from 'rxjs';

@Component({
    selector: 'sky-error-description',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.scss'],
    providers: [{ provide: AsyncFieldErrorMessageService, useClass: SimpleFieldErrorMessage }, SkyDestroyService],
})
export class FieldErrorDescriptionComponent implements OnInit {
    private asyncErrorMessageService: AsyncFieldErrorMessageService | undefined;
    private errorMessageService: FieldErrorMessageService | undefined;
    private formControl: AbstractControl | null = null;
    controlName: string | null = null;

    errorMessages?: Observable<string[]>;
    firstErrorMessage?: Observable<string>;

    showErrors!: Observable<boolean>;

    @Input()
    showAll: boolean = false;

    constructor(
        protected readonly changeDetectorRef: ChangeDetectorRef,
        private destroy: SkyDestroyService,
        @Self() simpleErrorMessageService: AsyncFieldErrorMessageService,
        @Optional() protected ngControl?: NgControl | null,
        @Optional() protected readonly host?: AbstractSkyControl<unknown>,
        @Optional() @Host() @SkipSelf() protected parent?: ControlContainer,
        @Optional() @SkipSelf() externalAsyncErrorMessageService?: AsyncFieldErrorMessageService,
        @Optional() @SkipSelf() externalErrorMessageService?: FieldErrorMessageService
    ) {
        this.asyncErrorMessageService = externalAsyncErrorMessageService;
        this.errorMessageService = externalErrorMessageService;
        if (!this.asyncErrorMessageService && !this.errorMessageService) {
            // if there are no any provided services for errors translation - use default one
            this.asyncErrorMessageService = simpleErrorMessageService;
        }
    }

    ngOnInit(): void {
        this.formControl = this.ngControl ? this.ngControl.control : (this.parent as FormGroupDirective)?.form;

        if (!this.formControl) {
            return;
        }

        const statusChangesEvent = this.formControl
            ? this.formControl?.statusChanges.pipe(map((status: FormControlStatus) => status === 'INVALID'))
            : of(false);

        this.showErrors = this.host ? this.host.errorStateChange : statusChangesEvent;

        if (this.ngControl) {
            this.controlName = `${this.ngControl.name}`;
        }

        this.errorMessages = concat(
            of(null), // emit on init
            this.formControl.statusChanges.pipe(takeUntil(this.destroy))
        ).pipe(switchMap(() => this.updateErrorMessages()));

        this.firstErrorMessage = this.errorMessages.pipe(map(s => (s.length ? s[0] : '')));
    }

    private updateErrorMessages(): Observable<string[]> {
        if (!this.formControl?.errors) {
            return of([]);
        }

        const errors = this.formControl.errors;
        const errorKeys = Object.keys(errors);

        const messageObservable = errorKeys.map(errorKey => {
            const errorValue = errors[errorKey];
            return this.getErrorMessageAbstract(this.controlName, errorKey, errorValue);
        });

        return combineLatest(messageObservable).pipe(take(1));
    }

    private getErrorMessageAbstract(fieldName: string | null, failedValidator: string, values: unknown) {
        return this.asyncErrorMessageService
            ? this.asyncErrorMessageService.getErrorMessage(this.controlName, failedValidator, values)
            : of(this.errorMessageService!.getErrorMessage(this.controlName, failedValidator, values));
    }
}
