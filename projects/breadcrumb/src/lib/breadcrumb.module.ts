import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyBreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';
import { SkyBreadcrumbTracker } from './breadcrumb-tracker-service';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [SkyBreadcrumbComponent],
    exports: [SkyBreadcrumbComponent],
})
export class SkyBreadcrumbModule {
    public static forRoot(autoTracking: boolean = false): ModuleWithProviders<SkyBreadcrumbModule> {
        const providers = autoTracking ? [SkyBreadcrumbTracker] : [];
        return {
            ngModule: SkyBreadcrumbModule,
            providers,
        };
    }
}
