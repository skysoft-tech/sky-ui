import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { SkyValuePickerOrientation } from './value-picker/value-picker.component';
import { ColorConverter, Hex, Rgb, Rgba } from '@sky-ui/core';

export type SkyColorPickerOrientation = SkyValuePickerOrientation;

@Component({
    selector: 'sky-gradient-view',
    templateUrl: './gradient-view.component.html',
    styleUrls: ['./gradient-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-gradient-view',
    },
})
export class SkyGradientViewComponent implements OnInit, OnChanges {
    colorInRgba!: Rgba;

    get alpha(): number {
        return this.colorInRgba[3];
    }
    set alpha(value: number) {
        this.colorInRgba[3] = value;
    }

    @Input()
    color: Hex | null = null;

    @HostBinding('style.--current-color')
    get currentColor(): Hex {
        return ColorConverter.rgb2hex(this.colorInRgb);
    }

    get colorInRgb(): Rgb {
        const [r, g, b] = this.colorInRgba ?? [0, 0, 0];
        return [r, g, b];
    }

    @Output()
    colorChange: EventEmitter<Hex> = new EventEmitter<Hex>();

    ngOnInit(): void {
        this.colorInRgba = ColorConverter.hex2rgba(this.color ?? '#000');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['color']) {
            this.colorInRgba = ColorConverter.hex2rgba(this.color ?? '#000');
        }
    }

    colorChanged(color: Rgb): void {
        this.colorInRgba = [...color, this.colorInRgba[3]];
        this.notifyAboutChange();
    }

    alphaChanged(alpha: number): void {
        this.alpha = alpha;
        this.notifyAboutChange();
    }

    private notifyAboutChange(): void {
        const hex = ColorConverter.rgba2hex(this.colorInRgba);
        this.color = hex;
        this.colorChange.emit(hex);
    }
}
