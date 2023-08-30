import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyPaginatorComponent } from './paginator.component';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyButtonModule } from '@sky-ui/button';

@NgModule({
    declarations: [SkyPaginatorComponent],
    exports: [SkyPaginatorComponent],
    imports: [CommonModule, SkyIconsModule, SkyButtonModule],
})
export class SkyPaginatorModule {}
