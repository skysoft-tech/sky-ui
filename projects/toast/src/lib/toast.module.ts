import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastComponent } from './toast.component';
import { SkyToastService } from './toast.service';
import { PortalModule } from '@angular/cdk/portal';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyToastPosition, TOAST_POSITION } from './toast.model';
import { SkyNotificationComponent } from './notification/notification.component';

@NgModule({
    declarations: [SkyToastComponent, SkyNotificationComponent],
    imports: [CommonModule, PortalModule, SkyIconsModule],
    providers: [SkyToastService],
    exports: [SkyToastComponent],
})
export class SkyToastModule {
    public static forRoot(position: SkyToastPosition = 'top-right'): ModuleWithProviders<SkyToastModule> {
        return {
            ngModule: SkyToastModule,
            providers: [
                {
                    provide: TOAST_POSITION,
                    useValue: position,
                },
            ],
        };
    }
}
