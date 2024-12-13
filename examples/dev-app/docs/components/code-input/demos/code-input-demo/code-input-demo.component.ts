import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyCodeInputModule } from '@sky-ui/code-input';

@Component({
    selector: 'app-code-input-demo',
    standalone: true,
    imports: [SkyCodeInputModule, FormsModule, ReactiveFormsModule],
    templateUrl: './code-input-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeInputDemoComponent {
    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
