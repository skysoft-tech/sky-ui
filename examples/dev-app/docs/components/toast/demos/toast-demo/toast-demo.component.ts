import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyToastModule, SkyToastService } from '@sky-ui/toast';

@Component({
    selector: 'app-toast-demo',
    standalone: true,
    imports: [SkyToastModule],
    templateUrl: './toast-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemoComponent {
    constructor(private readonly service: SkyToastService) {
        service.showInfo('test');
    }
}
