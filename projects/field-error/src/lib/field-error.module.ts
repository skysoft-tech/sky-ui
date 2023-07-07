import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorDescriptionComponent } from './field-error.component';

export interface FieldErrorModuleConfig {
    messages?: Provider;
}

@NgModule({
    declarations: [FieldErrorDescriptionComponent],
    imports: [CommonModule],
    exports: [FieldErrorDescriptionComponent],
})
export class SkyFieldErrorDescriptionModule {}
