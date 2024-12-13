import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkySlideToggleModule } from '@sky-ui/slide-toggle';

@Component({
    selector: 'app-slide-toggle-demo',
    standalone: true,
    imports: [SkySlideToggleModule, FormsModule, ReactiveFormsModule],
    templateUrl: './slide-toggle-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleDemoComponent {
    demoFormGroup = new FormGroup({
        demoControl: new FormControl(),
    });
}
