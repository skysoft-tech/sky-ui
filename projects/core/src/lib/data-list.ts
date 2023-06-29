import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { AbstractSkyControl } from './control';

export type ComparerFunction<T> = (firstOption: T, secondOption: T) => boolean;
export type ValueAccessorFunction<T> = (option: T) => string;
export type FilterFunction<T> = (option: T, filterValue: number | string | null) => boolean;

const DefaultFilterFactory = <T>(valueAccessor: ValueAccessorFunction<T>) => {
    return (option: T, searchText: number | string | null): boolean => {
        if (searchText === null) {
            return true;
        }
        var valueToCompare = valueAccessor(option);
        return valueToCompare.toLocaleLowerCase().startsWith(searchText.toString().toLocaleLowerCase());
    };
};

const DefaultValueAccessor = <T>(option: T): string => {
    return (option as Object).toString();
};

@Directive()
export abstract class AbstractSkyDataList<T> extends AbstractSkyControl<T> {
    @Input()
    valueAccessor: ValueAccessorFunction<T> = DefaultValueAccessor;

    @Input()
    compareWith: ComparerFunction<T> = (firstOption: T, secondOption: T) => firstOption === secondOption;

    @Input()
    filter: FilterFunction<T> = DefaultFilterFactory<T>(this.valueAccessor);

    private _filterValue: string | null = '';
    get filterValue() {
        return this._filterValue;
    }

    set filterValue(value: string | null) {
        if (this._filterValue !== value) {
            this._filterValue = value;

            this.filteredOptions = this.applyFiltering();
        }
    }

    private _options!: T[] | null;
    @Input()
    get options() {
        return this._options;
    }
    set options(value: T[] | null) {
        if (this._options !== value) {
            this._options = value;

            this.filteredOptions = this.applyFiltering();
        }
    }

    private _filteredOptions: T[] | null = null;
    get filteredOptions() {
        return this._filteredOptions;
    }
    set filteredOptions(value: T[] | null) {
        if (this._filteredOptions !== value) {
            this._filteredOptions = value;
            this.optionsChange.emit(value);
        }
    }
    @Output()
    optionsChange = new EventEmitter<T[] | null>();

    applyFiltering(): T[] | null {
        if (!this.options) {
            return null;
        }

        if (!this.filterValue) {
            return this.options;
        }

        return this.options.filter((option: T) => this.filter(option, this.filterValue));
    }

    isSelected(value: T): boolean {
        if (this.value === null) {
            return false;
        }

        return this.compareWith(this.value, value);
    }

    setSelectedItem(item: T | null) {
        this.value = item;
    }
}
