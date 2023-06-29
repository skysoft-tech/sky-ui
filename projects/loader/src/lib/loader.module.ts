import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SkyLoaderComponent } from './loader.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SkyLoaderComponent],
    exports: [SkyLoaderComponent],
})
export class SkyLoaderModule {}
