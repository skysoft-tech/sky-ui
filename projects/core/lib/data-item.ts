import { FocusableOption, FocusOrigin, Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Directive, ElementRef, Input, Optional } from '@angular/core';
import { AbstractSkyDataList } from './data-list';

@Directive()
export abstract class AbstractSkyDataItem<T> implements FocusableOption, Highlightable {
    @Input() value!: T;

    get selected() {
        return this.dataList.isSelected(this.value);
    }

    private _isActive = false;
    get isActive() {
        return this._isActive;
    }

    constructor(
        @Optional() public dataList: AbstractSkyDataList<T>,
        private element: ElementRef,
        protected _changeDetectorRef: ChangeDetectorRef
    ) {}

    disabled?: boolean | undefined;

    onClick() {
        this.dataList.setSelectedItem(this.value);
    }

    focus(origin?: FocusOrigin): void {
        this.element.nativeElement.focus();
    }

    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        this._isActive = true;
    }

    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        this._isActive = false;
    }
}
