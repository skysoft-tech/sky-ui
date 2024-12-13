import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyButtonModule } from '@sky-ui/button';

@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [SkyButtonModule],
    templateUrl: './button-demo.component.html',
    styleUrl: './button-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {}
