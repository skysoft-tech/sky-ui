import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { SkyTableComponent } from './table.component';
import {
    SkyCellDirective,
    SkyCellDefDirective,
    SkyColumnDefDirective,
    SkyFooterCellDirective,
    SkyHeaderCellDirective,
    SkyFooterCellDefDirective,
    SkyHeaderCellDefDirective,
} from './cell';
import {
    SkyFooterRowComponent,
    SkyFooterRowDefDirective,
    SkyHeaderRowComponent,
    SkyHeaderRowDefDirective,
    SkyNoDataRowDirective,
    SkyRowComponent,
    SkyRowDefDirective,
} from './row';
import { SelectionModule } from '@sky-ui/selection';

const EXPORTED_DECLARATIONS = [
    // Table
    SkyTableComponent,

    // Template defs
    SkyRowDefDirective,
    SkyCellDefDirective,
    SkyColumnDefDirective,
    SkyHeaderRowDefDirective,
    SkyFooterRowDefDirective,
    SkyHeaderCellDefDirective,
    SkyFooterCellDefDirective,

    // Cell
    SkyCellDirective,
    SkyHeaderCellDirective,
    SkyFooterCellDirective,

    // Row
    SkyRowComponent,
    SkyHeaderRowComponent,
    SkyFooterRowComponent,
    SkyNoDataRowDirective,
];

@NgModule({
    imports: [CdkTableModule, SelectionModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: [EXPORTED_DECLARATIONS],
})
export class SkyTableModule {}
