import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from './selection.service';
import { DefaultSelectionService } from './default-selection.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        {
            provide: SelectionService,
            useClass: DefaultSelectionService,
        },
    ],
})
export class SelectionModule {}
