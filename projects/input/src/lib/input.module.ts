import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInputComponent } from './input.component';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';
import { SkyPrimitiveInputModule } from '@sky-ui/primitive-input';
import { SkyTextfieldDirective } from './input.directive';

@NgModule({
    declarations: [SkyInputComponent, SkyTextfieldDirective],
    imports: [CommonModule, SkyIconsModule, SkyFieldErrorDescriptionModule, SkyPrimitiveInputModule],
    exports: [SkyInputComponent, SkyTextfieldDirective],
})
export class SkyInputModule {}
