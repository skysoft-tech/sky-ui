import { FactoryProvider, Optional, SkipSelf } from '@angular/core';
import { DateRange } from '../models/date-range.model';
import { SkyRangeSelectionStrategy } from './range-selection-strategy';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

export class DefaultRangeSelectionStrategy<T> extends SkyRangeSelectionStrategy<T, DateRange<T>> {
    constructor(private dateAdapter: SkyDateAdapter<T>) {
        super();
    }

    updateValue({ from, to }: DateRange<T>, userInput: T): DateRange<T> {
        if (from == null) {
            from = userInput;
        } else if (to == null && userInput && this.dateAdapter.compareDate(userInput, from) >= 0) {
            to = userInput;
        } else {
            from = userInput;
            to = null;
        }

        return new DateRange(from, to);
    }

    createPreview(currentValue: DateRange<T>, activeDate: T | null): DateRange<T> | null {
        let from: T | null = null;
        let to: T | null = null;

        if (currentValue.from && !currentValue.to && activeDate) {
            from = currentValue.from;
            to = activeDate;
        }

        return new DateRange<T>(from, to);
    }
}

export function SKY_RANGE_STRATEGU_PROVIDER_FACTORY(
    parent: SkyRangeSelectionStrategy<unknown, unknown>,
    adapter: SkyDateAdapter<unknown>
): SkyRangeSelectionStrategy<unknown, unknown> {
    return parent || new DefaultRangeSelectionStrategy(adapter);
}

export const SKY_RANGE_STRATEGY_PROVIDER: FactoryProvider = {
    provide: SkyRangeSelectionStrategy,
    deps: [[new Optional(), new SkipSelf(), SkyRangeSelectionStrategy], SkyDateAdapter],
    useFactory: SKY_RANGE_STRATEGU_PROVIDER_FACTORY,
};
