import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Hex } from '@sky-ui/core';

export type SkyColorPickerView = 'gradient' | 'palette';

@Component({
    selector: 'sky-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-color-picker',
    },
})
export class SkyColorPickerComponent {
    @Input()
    startView: SkyColorPickerView = 'gradient';

    @Input()
    value: Hex | null = null;

    @Output()
    valueChange: EventEmitter<Hex> = new EventEmitter<Hex>();

    currentView: SkyColorPickerView = this.startView;

    colorChange(color: Hex): void {
        this.valueChange.emit(color);
    }
}
