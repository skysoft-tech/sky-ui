import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyBreadcrumbModule, SkyBreadcrumbData } from '@sky-ui/breadcrumb';

@Component({
    selector: 'app-breadcrumb-divider-demo',
    standalone: true,
    imports: [SkyBreadcrumbModule],
    templateUrl: './breadcrumb-divider-demo.component.html',
    styleUrl: './breadcrumb-divider-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDividerDemoComponent {
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
