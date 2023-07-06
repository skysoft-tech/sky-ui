import { NgModule } from '@angular/core';
import { SkyIconComponent } from './icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [SkyIconComponent],
    imports: [HttpClientModule],
    providers: [],
    exports: [SkyIconComponent],
})
export class SkyIconsModule {}
