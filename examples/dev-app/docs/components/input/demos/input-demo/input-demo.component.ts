import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyInputModule } from '@sky-ui/input';

@Component({
    selector: 'app-input-demo',
    standalone: true,
    imports: [SkyInputModule, FormsModule, ReactiveFormsModule],
    templateUrl: './input-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
