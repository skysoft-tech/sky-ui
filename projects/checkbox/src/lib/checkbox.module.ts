import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyCheckboxComponent } from './checkbox.component';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';

@NgModule({
    declarations: [SkyCheckboxComponent],
    imports: [CommonModule, SkyIconsModule, SkyFieldErrorDescriptionModule],
    exports: [SkyCheckboxComponent],
})
export class SkyCheckboxModule {}
