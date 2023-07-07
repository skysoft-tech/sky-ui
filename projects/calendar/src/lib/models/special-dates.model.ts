import { InjectionToken } from '@angular/core';
import { DateRange } from './date-range.model';
import { Hex } from '@sky-ui/core';

export const SUPORTED_RANGES = new InjectionToken<Ranges>('SUPORTED_RANGES');

export type Ranges = Record<string, Hex>;

/**
 * Range with type.
 */
export class PeriodWithType<T> extends DateRange<T> {
    override readonly from: T;
    override readonly to: T;

    constructor(period: { from: T; to?: T }, readonly type: string) {
        super(period.from, period?.to ?? period.from);

        this.from = period.from;
        this.to = period?.to ?? period.from;
    }
}

export type SpecialDateInput<T> = PeriodWithType<T>;
