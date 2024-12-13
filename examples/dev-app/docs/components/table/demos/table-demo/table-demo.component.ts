import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyTableModule } from '@sky-ui/table';

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [SkyTableModule],
    templateUrl: './table-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {
    demoData = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
        { id: 3, name: 'Test 3' },
    ];
}
