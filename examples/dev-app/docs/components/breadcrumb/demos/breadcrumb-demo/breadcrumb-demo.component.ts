import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyBreadcrumbModule, SkyBreadcrumbData } from '@sky-ui/breadcrumb';

@Component({
    selector: 'app-breadcrumb-demo',
    standalone: true,
    imports: [SkyBreadcrumbModule],
    templateUrl: './breadcrumb-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
    breadcrumbs: SkyBreadcrumbData[] = [
        {
            label: 'components',
            url: '/components',
        },
        {
            label: 'breadcrumb',
            url: '/components/breadcrumb',
        },
    ];
}
