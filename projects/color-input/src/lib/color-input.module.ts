import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyColorInputComponent } from './color-input.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { IMaskModule } from 'angular-imask';
import { SkyColorFieldDirective } from './color-field.directive';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyButtonModule } from '@sky-ui/button';
import { SkyPrimitiveInputModule } from '@sky-ui/primitive-input';
import { SkyColorPickerModule } from '@sky-ui/color-picker';

@NgModule({
    declarations: [SkyColorInputComponent, SkyColorFieldDirective],
    imports: [
        CommonModule,
        SkyIconsModule,
        SkyButtonModule,
        SkyPrimitiveInputModule,
        SkyColorPickerModule,
        IMaskModule,
        OverlayModule,
    ],
    exports: [SkyColorInputComponent],
})
export class SkyColorInputModule {}
