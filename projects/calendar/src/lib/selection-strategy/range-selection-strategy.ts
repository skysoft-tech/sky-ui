export abstract class SkyRangeSelectionStrategy<T, R> {
    abstract updateValue(currentValue: R, userInput: T): R;
    abstract createPreview(currentValue: R, activeDate: T | null): R | null;
}
