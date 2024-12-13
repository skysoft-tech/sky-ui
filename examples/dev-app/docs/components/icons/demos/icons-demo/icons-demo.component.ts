import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyIconsModule } from '@sky-ui/icons';

@Component({
    selector: 'app-icons-demo',
    standalone: true,
    imports: [SkyIconsModule],
    templateUrl: './icons-demo.component.html',
    styleUrl: './icons-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {}
