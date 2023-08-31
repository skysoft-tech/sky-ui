import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDrawerComponent } from './drawer.component';
import { SkyDrawerContainerComponent } from './container/drawer-container.component';
import { SkyDrawerContentComponent } from './content/content.component';

const EXPORTED_DECLARATIONS = [SkyDrawerComponent, SkyDrawerContainerComponent, SkyDrawerContentComponent];

@NgModule({
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    imports: [CommonModule],
})
export class SkyDrawerModule {}
