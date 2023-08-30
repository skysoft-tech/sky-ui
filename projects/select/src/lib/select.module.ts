import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkySelectComponent } from './select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SkyOptionComponent } from './option/option.component';
import { SkyDataListIteratorDirective } from './data-list-iterator.directive';
import { SkySelectValueAccessorDirective, SkySelectTriggerComponent } from './sky-select-trigger.directive';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyPrimitiveInputModule } from '@sky-ui/primitive-input';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';

@NgModule({
    declarations: [
        SkySelectComponent,
        SkyOptionComponent,
        SkyDataListIteratorDirective,
        SkySelectValueAccessorDirective,
        SkySelectTriggerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SkyIconsModule,
        OverlayModule,
        ScrollingModule,
        SkyPrimitiveInputModule,
        SkyFieldErrorDescriptionModule,
    ],
    exports: [
        SkySelectComponent,
        SkyOptionComponent,
        SkyDataListIteratorDirective,
        SkySelectValueAccessorDirective,
        SkySelectTriggerComponent,
    ],
})
export class SkySelectModule {}
