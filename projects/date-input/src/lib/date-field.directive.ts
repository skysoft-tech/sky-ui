/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { DefaultImaskFactory } from 'angular-imask';
import { InputMask, MaskedRange } from 'imask';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { SkyDateInputComponent } from './date-input.component';
import { AbstractInputAccessor, SkyDestroyService } from '@sky-ui/core';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

@Directive({
    selector: 'input[skyDateField]',
    host: {
        '[attr.disabled]': 'host.disabled || null',
        '[attr.skyTextField]': 'true',
        '[readonly]': 'host.readonly',
        '(focus)': 'host.onFocusChange(true)',
        '(blur)': 'host.onFocusChange(false)',
    },
    providers: [SkyDestroyService, { provide: AbstractInputAccessor, useExisting: SkyDateFieldDirective }],
})
export class SkyDateFieldDirective extends AbstractInputAccessor<SkyDateInputComponent> implements OnInit, OnDestroy {
    private mask!: InputMask<{ mask: DateConstructor }>;
    private separator: string = '';
    private patternParts: string[] = [];

    private blocks = {
        d: { mask: MaskedRange, from: 1, to: 31, maxLength: 2 },
        m: { mask: MaskedRange, from: 1, to: 12, maxLength: 2 },
        Y: { mask: MaskedRange, from: 1900, to: 2999, maxLength: 4 },
    };

    constructor(
        datePicker: SkyDateInputComponent,
        nativeElementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        private destroy: SkyDestroyService,
        private maskFactory: DefaultImaskFactory,
        private dataAdapter: SkyDateAdapter<Date>
    ) {
        super(datePicker, nativeElementRef);
    }

    ngOnInit(): void {
        const pattern = this.getPattern();
        this.mask = this.maskFactory.create<any>(this.nativeElementRef.nativeElement, {
            mask: Date,
            pattern,
            blocks: this.blocks,
            format: (date: Date) => this.format(date, pattern),
            parse: (str: string) => this.parse(str),
        });

        this.setDateByPattern(this.host.value, pattern);

        this.getMaskValueChangeEvent()
            .pipe(takeUntil(this.destroy))
            .subscribe(value => this.host.onValueChange(value));

        this.host.valueChange
            .pipe(
                takeUntil(this.destroy),
                distinctUntilChanged((prev, current) => this.dataAdapter.sameDate(prev, current))
            )
            .subscribe(date => this.setDateByPattern(date, pattern));
    }

    ngOnDestroy(): void {
        this.mask.destroy();
    }

    private getMaskValueChangeEvent(): Observable<Date | null> {
        const valueChange: Subject<Date | null> = new Subject<Date | null>();
        this.mask.on('accept', () => {
            if (!this.mask.masked.isComplete) {
                valueChange.next(null);
            }
        });
        this.mask.on('complete', () => {
            valueChange.next(this.parse(this.mask.value));
        });

        return valueChange.pipe(distinctUntilChanged());
    }

    private getPattern(): string {
        const dayRegExp = new RegExp(/0?7/);
        const monthRegExp = new RegExp(/0?8/);
        const separatorRegExp = new RegExp(/[^\d)]/);
        const dateString = new Date('8/7/2023').toLocaleDateString(navigator.language);

        this.separator = dateString.match(separatorRegExp)![0];
        const dateParts = dateString.split(this.separator);

        for (const part of dateParts) {
            if (dayRegExp.test(part)) {
                if (!this.host.monthViewOnly) {
                    this.patternParts.push('d');
                }
                continue;
            }

            if (monthRegExp.test(part)) {
                this.patternParts.push('m');
                continue;
            }

            this.patternParts.push('Y');
        }

        return this.patternParts.join(this.separator);
    }

    private format(date: Date, pattern: string): string {
        let result = pattern;
        let day: string = this.dataAdapter.getDate(date).toString();
        let month: string = (this.dataAdapter.getMonth(date) + 1).toString();
        const year: string = this.dataAdapter.getYear(date).toString();

        if (day.length < 2) {
            day = '0' + day;
        }

        if (month.length < 2) {
            month = '0' + month;
        }

        if (!this.host.monthViewOnly) {
            result = result.replace('d', day);
        }

        result = result.replace('m', month);
        result = result.replace('Y', year);

        return result;
    }

    private parse(str: string): Date {
        let day: number;
        let month: number;
        let year: number;
        const dateParts = str.split(this.separator).map(part => +part);

        if (dateParts.length === 2) {
            [month, year] = dateParts;
            this.replaceParts(dateParts, year, month);
            return this.dataAdapter.createDate(year, month - 1, 1);
        } else {
            [day, month, year] = dateParts;
            this.replaceParts(dateParts, year, month, day);
            return this.dataAdapter.createDate(year, month - 1, day);
        }
    }

    private replaceParts(dateParts: number[], year: number, month: number, day?: number): number[] {
        dateParts.forEach((part, i) => {
            switch (this.patternParts[i]) {
                case 'd': {
                    day = part;
                    break;
                }
                case 'm': {
                    month = part;
                    break;
                }
                case 'Y': {
                    year = part;
                    break;
                }
            }
        });

        return dateParts;
    }

    private setDateByPattern(date: Date | null, pattern: string): void {
        if (!date) {
            return;
        }

        const valueToSet = this.format(date, pattern);
        this.mask.value = valueToSet;
    }
}
