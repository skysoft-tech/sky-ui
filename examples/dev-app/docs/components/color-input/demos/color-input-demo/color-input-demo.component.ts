import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyColorInputModule } from '@sky-ui/color-input';

@Component({
    selector: 'app-color-input-demo',
    standalone: true,
    imports: [SkyColorInputModule, FormsModule, ReactiveFormsModule],
    templateUrl: './color-input-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputDemoComponent {
    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
