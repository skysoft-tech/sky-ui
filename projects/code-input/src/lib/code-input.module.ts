import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyCodeInputComponent } from './code-input.component';
import { SkyFieldErrorDescriptionModule } from '@sky-ui/field-error';
import { AutofillExtentionService } from '@sky-ui/core';

@NgModule({
    declarations: [SkyCodeInputComponent],
    imports: [CommonModule, SkyFieldErrorDescriptionModule],
    exports: [SkyCodeInputComponent],
    providers: [AutofillExtentionService],
})
export class SkyCodeInputModule {}
