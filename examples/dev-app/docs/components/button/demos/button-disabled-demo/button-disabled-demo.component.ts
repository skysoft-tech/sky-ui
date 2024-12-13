import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyButtonModule } from '@sky-ui/button';

@Component({
    selector: 'app-button-disabled-demo',
    standalone: true,
    imports: [SkyButtonModule],
    templateUrl: './button-disabled-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDisabledDemoComponent {}
