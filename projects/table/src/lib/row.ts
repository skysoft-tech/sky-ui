/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import {
    CdkFooterRow,
    CdkFooterRowDef,
    CdkHeaderRow,
    CdkHeaderRowDef,
    CdkNoDataRow,
    CdkRow,
    CdkRowDef,
    CDK_ROW_TEMPLATE,
} from '@angular/cdk/table';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    ViewEncapsulation,
} from '@angular/core';
import { SelectionItem } from '@sky-ui/selection';
import { Subject } from 'rxjs';

@Directive({
    selector: '[skyHeaderRowDef]',
    providers: [{ provide: CdkHeaderRowDef, useExisting: SkyHeaderRowDefDirective }],
    inputs: ['columns: skyHeaderRowDef', 'sticky: skyHeaderRowDefSticky'],
})
export class SkyHeaderRowDefDirective extends CdkHeaderRowDef {}

/**
 * Footer row definition for the sky-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
    selector: '[skyFooterRowDef]',
    providers: [{ provide: CdkFooterRowDef, useExisting: SkyFooterRowDefDirective }],
    inputs: ['columns: skyFooterRowDef', 'sticky: skyFooterRowDefSticky'],
})
export class SkyFooterRowDefDirective extends CdkFooterRowDef {}

/**
 * Data row definition for the sky-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
    selector: '[skyRowDef]',
    providers: [{ provide: CdkRowDef, useExisting: SkyRowDefDirective }],
    inputs: ['columns: skyRowDefColumns', 'when: skyRowDefWhen'],
})
export class SkyRowDefDirective<T> extends CdkRowDef<T> {}

@Component({
    selector: 'sky-header-row, tr[sky-header-row]',
    template: CDK_ROW_TEMPLATE,
    host: {
        class: 'sky-header-row',
        role: 'row',
    },
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'skyHeaderRow',
    providers: [{ provide: CdkHeaderRow, useExisting: SkyHeaderRowComponent }],
})
export class SkyHeaderRowComponent extends CdkHeaderRow {}

@Component({
    selector: 'sky-footer-row, tr[sky-footer-row]',
    template: CDK_ROW_TEMPLATE,
    host: {
        class: 'sky-footer-row',
        role: 'row',
    },
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'skyFooterRow',
    providers: [{ provide: CdkFooterRow, useExisting: SkyFooterRowComponent }],
})
export class SkyFooterRowComponent extends CdkFooterRow {}

@Component({
    selector: 'sky-row, tr[sky-row]',
    template: CDK_ROW_TEMPLATE,
    host: {
        class: 'sky-row',
        '[attr.test-attribute]': 'true',
        role: 'row',
    },
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'skyRow',
    providers: [
        {
            provide: CdkRow,
            useExisting: SkyRowComponent,
        },
    ],
})
export class SkyRowComponent extends CdkRow implements SelectionItem {
    @HostBinding('class.selected')
    selected: boolean = false;

    @HostListener('click', ['$event'])
    clickHandler(event: PointerEvent): void {
        this.click.next(event);
    }

    public click: Subject<PointerEvent> = new Subject<PointerEvent>();

    public get isSelected(): boolean {
        return this.selected;
    }

    public get nativeElement(): Element {
        return this.elementRef.nativeElement;
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    public select(): void {
        this.selected = true;
    }

    public deselect(): void {
        this.selected = false;
    }
}

@Directive({
    selector: 'ng-template[skyNoDataRow]',
    providers: [{ provide: CdkNoDataRow, useExisting: SkyNoDataRowDirective }],
})
export class SkyNoDataRowDirective extends CdkNoDataRow {
    override _contentClassName = 'sky-no-data-row';
}
