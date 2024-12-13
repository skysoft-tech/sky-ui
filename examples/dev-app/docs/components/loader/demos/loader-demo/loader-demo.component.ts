import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyLoaderModule } from '@sky-ui/loader';

@Component({
    selector: 'app-loader-demo',
    standalone: true,
    imports: [SkyLoaderModule],
    templateUrl: './loader-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderDemoComponent {}
