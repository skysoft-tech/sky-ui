/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
    CdkCell,
    CdkCellDef,
    CdkColumnDef,
    CdkFooterCell,
    CdkFooterCellDef,
    CdkHeaderCell,
    CdkHeaderCellDef,
} from '@angular/cdk/table';
import { Directive, InjectionToken, Input } from '@angular/core';

export const SkySortHeaderColumnDef = new InjectionToken('SKY_SORT_HEADER_COLUMN_DEF');

@Directive({
    selector: '[skyCellDef]',
    providers: [{ provide: CdkCellDef, useExisting: SkyCellDefDirective }],
})
export class SkyCellDefDirective extends CdkCellDef {}

@Directive({
    selector: '[skyHeaderCellDef]',
    providers: [{ provide: CdkHeaderCellDef, useExisting: SkyHeaderCellDefDirective }],
})
export class SkyHeaderCellDefDirective extends CdkHeaderCellDef {}

@Directive({
    selector: '[skyFooterCellDef]',
    providers: [{ provide: CdkFooterCellDef, useExisting: SkyFooterCellDefDirective }],
})
export class SkyFooterCellDefDirective extends CdkFooterCellDef {}

@Directive({
    selector: '[skyColumnDef]',
    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
    inputs: ['sticky'],
    providers: [
        { provide: CdkColumnDef, useExisting: SkyColumnDefDirective },
        { provide: SkySortHeaderColumnDef, useExisting: SkyColumnDefDirective },
    ],
})
export class SkyColumnDefDirective extends CdkColumnDef {
    @Input('skyColumnDef')
    override get name(): string {
        return this._name;
    }
    override set name(name: string) {
        this._setNameInput(name);
    }

    protected override _updateColumnCssClassName() {
        super._updateColumnCssClassName();
        this._columnCssClassName!.push(`sky-column-${this.cssClassFriendlyName}`);
    }
}

@Directive({
    selector: 'skyHeaderCell, th[skyHeaderCell]',
    host: {
        class: 'sky-header-cell',
        role: 'columnheader',
    },
})
export class SkyHeaderCellDirective extends CdkHeaderCell {}

@Directive({
    selector: 'skyFooterCell, td[skyFooterCell]',
    host: {
        class: 'sky-footer-cell',
        role: 'gridcell',
    },
})
export class SkyFooterCellDirective extends CdkFooterCell {}

@Directive({
    selector: 'skyCell, td[skyCell]',
    host: {
        class: 'sky-cell',
        role: 'gridcell',
    },
})
export class SkyCellDirective extends CdkCell {}
