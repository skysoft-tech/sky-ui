import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyFormErrorComponent } from './form-error.component';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';

@NgModule({
    declarations: [SkyFormErrorComponent],
    imports: [CommonModule, SkyFieldErrorDescriptionModule],
    exports: [SkyFormErrorComponent],
})
export class SkyFormErrorModule {}
