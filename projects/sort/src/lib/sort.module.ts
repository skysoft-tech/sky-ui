import { NgModule } from '@angular/core';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkySortHeaderComponent } from './sort-header.component';
import { SkySortDirective } from './sort.directive';

const EXPORTED_DECLARATIONS = [SkySortDirective, SkySortHeaderComponent];

@NgModule({
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    imports: [SkyIconsModule],
})
export class SkySortModule {}
