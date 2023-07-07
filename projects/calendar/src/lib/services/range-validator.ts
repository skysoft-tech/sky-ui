import { Injectable } from '@angular/core';
import { DateRange } from '../models/date-range.model';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

@Injectable()
export class RangeValidator<T> {
    constructor(private dateAdapter: SkyDateAdapter<T>) {}

    public isValid(inputValue: DateRange<T>[] | DateRange<T>): boolean {
        if (!Array.isArray(inputValue)) {
            return this.validate(inputValue);
        }

        return inputValue.every(range => this.validate(range));
    }

    private validate(range: DateRange<T>): boolean {
        if (!range.from || !range.to) {
            return false;
        }

        return this.dateAdapter.compareDate(range.from, range.to) <= 0;
    }
}
