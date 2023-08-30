import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkySlideToggleComponent } from './slide-toggle.component';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';

@NgModule({
    declarations: [SkySlideToggleComponent],
    imports: [CommonModule, SkyIconsModule, SkyFieldErrorDescriptionModule],
    exports: [SkySlideToggleComponent],
})
export class SkySlideToggleModule {}
