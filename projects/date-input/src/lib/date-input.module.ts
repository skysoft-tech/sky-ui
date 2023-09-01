import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDateInputComponent } from './date-input.component';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyCalendarModule } from '@sky-ui/calendar';
import { SkyPrimitiveInputModule } from '@sky-ui/primitive-input';
import { IMaskModule } from 'angular-imask';
import { SkyDateFieldDirective } from './date-field.directive';
import { SkyDateAdapterModule } from '@sky-ui/date-adapter';
import { OverlayModule } from '@angular/cdk/overlay';
import { SkyButtonModule } from '@sky-ui/button';

@NgModule({
    declarations: [SkyDateInputComponent, SkyDateFieldDirective],
    exports: [SkyDateInputComponent],
    imports: [
        CommonModule,
        SkyIconsModule,
        SkyButtonModule,
        SkyCalendarModule.forChild({}),
        SkyPrimitiveInputModule,
        SkyDateAdapterModule,
        IMaskModule,
        OverlayModule,
    ],
})
export class SkyDateInputModule {}
