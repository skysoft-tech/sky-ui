import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyPrimitiveInputComponent } from './primitive-input.component';
import { SkyButtonModule } from '@sky-ui/button';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyFieldDirective } from './primitive-field.directive';

@NgModule({
    declarations: [SkyPrimitiveInputComponent, SkyFieldDirective],
    exports: [SkyPrimitiveInputComponent, SkyFieldDirective],
    imports: [CommonModule, SkyIconsModule, SkyButtonModule],
})
export class SkyPrimitiveInputModule {}
