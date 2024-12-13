import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkySelectModule } from '@sky-ui/select';

@Component({
    selector: 'app-select-demo',
    standalone: true,
    imports: [SkySelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './select-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemoComponent {
    options = [
        { label: 'Test 1', value: 1 },
        { label: 'Test 2', value: 2 },
        { label: 'Test 3', value: 3 },
    ];

    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
