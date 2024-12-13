import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyCheckboxModule } from '@sky-ui/checkbox';

@Component({
    selector: 'app-checkbox-demo',
    standalone: true,
    imports: [SkyCheckboxModule, FormsModule, ReactiveFormsModule],
    templateUrl: './checkbox-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDemoComponent {
    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
