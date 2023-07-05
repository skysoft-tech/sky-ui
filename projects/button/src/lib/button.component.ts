import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ColoredComponent } from '@sky-ui/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[sky-button]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class SkyButtonComponent extends ColoredComponent {
    @HostBinding('class.sky-button')
    public skyButtonClass = true;

    @Input() loading: boolean = false;

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
