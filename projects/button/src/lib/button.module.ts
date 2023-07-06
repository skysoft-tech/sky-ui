import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyLoaderModule } from '@sky-ui/loader';
import { SkyButtonComponent } from './button.component';

@NgModule({
    declarations: [SkyButtonComponent],
    exports: [SkyButtonComponent],
    imports: [SkyLoaderModule, CommonModule],
})
export class SkyButtonModule {}
