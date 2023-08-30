import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'sky-form-error',
    templateUrl: './form-error.component.html',
    styleUrls: ['./form-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-form-error',
    },
})
export class SkyFormErrorComponent {}
