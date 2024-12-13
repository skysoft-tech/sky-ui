import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyColorPickerModule } from '@sky-ui/color-picker';

@Component({
    selector: 'app-color-picker-demo',
    standalone: true,
    imports: [SkyColorPickerModule],
    templateUrl: './color-picker-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerDemoComponent {}
