import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SkyColorPickerView } from '../color-picker.component';

@Component({
    selector: 'sky-color-picker-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-color-picker-header',
    },
})
export class SkyColorPickerHeaderComponent {
    @Input()
    activeView!: SkyColorPickerView;

    @Output()
    activeViewChange: EventEmitter<SkyColorPickerView> = new EventEmitter<SkyColorPickerView>();

    constructor() {}

    public setActiveView(view: SkyColorPickerView): void {
        this.activeView = view;
        this.activeViewChange.emit(view);
    }
}
