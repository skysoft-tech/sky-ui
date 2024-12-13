import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyPaginatorModule } from '@sky-ui/paginator';

@Component({
    selector: 'app-paginator-demo',
    standalone: true,
    imports: [SkyPaginatorModule],
    templateUrl: './paginator-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {}
