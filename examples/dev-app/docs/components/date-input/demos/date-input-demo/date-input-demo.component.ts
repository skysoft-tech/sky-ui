import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyDateInputModule } from '@sky-ui/date-input';

@Component({
    selector: 'app-date-input-demo',
    standalone: true,
    imports: [SkyDateInputModule, FormsModule, ReactiveFormsModule],
    templateUrl: './date-input-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputDemoComponent {
    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
