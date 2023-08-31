import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDialogService } from './dialog.service';
import { PortalModule } from '@angular/cdk/portal';
import { SkyDialogHostService } from './dialog-host.service';

@NgModule({
    imports: [CommonModule, PortalModule],
    providers: [SkyDialogService],
})
export class SkyDialogModule {
    public static forRoot(): ModuleWithProviders<SkyDialogModule> {
        return {
            ngModule: SkyDialogModule,
            providers: [SkyDialogHostService],
        };
    }
}
