import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyColorPickerComponent } from './color-picker.component';
import { SkyPalletViewComponent } from './views/pallet-view/pallet-view.component';
import { SkyGradientViewComponent } from './views/gradient-view/gradient-view.component';
import { SkyValuePickerComponent } from './views/gradient-view/value-picker/value-picker.component';
import { SkyColorPickerHeaderComponent } from './header/header.component';
import { SkyGradientPickerComponent } from './views/gradient-view/gradient-picker/gradient-picker.component';
import { SkyCircleTrackerDirective } from './views/gradient-view/gradient-picker/circle-tracker.directive';
import { SkyTriangleTrackerDirective } from './views/gradient-view/gradient-picker/triangle-tracker.directive';
import { SkyButtonModule } from '@sky-ui/button';
import { SkyIconsModule } from '@sky-ui/icons';

@NgModule({
    declarations: [
        SkyColorPickerComponent,
        SkyPalletViewComponent,
        SkyGradientViewComponent,
        SkyValuePickerComponent,
        SkyColorPickerHeaderComponent,
        SkyGradientPickerComponent,
        SkyCircleTrackerDirective,
        SkyTriangleTrackerDirective,
    ],
    imports: [CommonModule, SkyButtonModule, SkyIconsModule],
    exports: [SkyColorPickerComponent],
})
export class SkyColorPickerModule {}
