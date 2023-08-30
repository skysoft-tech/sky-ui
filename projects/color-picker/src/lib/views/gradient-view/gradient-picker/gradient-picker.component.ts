import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnChanges,
    ViewChild,
    ViewEncapsulation,
    SimpleChanges,
} from '@angular/core';
import { SkyTriangleTrackerDirective } from './triangle-tracker.directive';
import { ColorConverter, Hex, Rgb, SkyPosition, skyClamp } from '@sky-ui/core';

@Component({
    selector: 'sky-gradient-picker',
    templateUrl: './gradient-picker.component.html',
    styleUrls: ['./gradient-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-gradient-picker',
    },
})
export class SkyGradientPickerComponent implements OnInit, OnChanges {
    hue: number = 0;
    value: number = 0;
    saturation: number = 0;

    @Input()
    color!: Rgb;

    get colorInHex(): Hex {
        return ColorConverter.rgb2hex(this.color);
    }

    get pureColor(): Hex {
        return ColorConverter.hsv2hex([this.hue, 1, 1]);
    }

    positionTest: SkyPosition = { x: 0, y: 0 };

    @Output()
    colorChange: EventEmitter<Rgb> = new EventEmitter<Rgb>();

    @ViewChild(SkyTriangleTrackerDirective) triangle?: SkyTriangleTrackerDirective;

    ngOnInit(): void {
        const [h, s, v] = ColorConverter.rgb2hsv(this.color);
        this.hue = h;
        this.value = v;
        this.saturation = s;

        this.positionTest = {
            x: this.saturation,
            y: this.value === 1 ? this.value * 0.5 : this.value,
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['color']) {
            const [h, s, v] = ColorConverter.rgb2hsv(this.color);
            this.hue = h;
            this.value = v;
            this.saturation = s;
            // this.cdr.detectChanges();
            this.positionTest = {
                x: this.saturation,
                y: skyClamp(this.saturation - this.value, 0, 1),
            };
        }
    }

    hueChanged(hue: number): void {
        this.hue = hue;
        this.notifyAboutChange();
    }

    saturationValueChange(position: SkyPosition): void {
        const { x, y } = position;
        this.saturation = x;
        this.value = skyClamp(y + x, 0, 1);

        this.notifyAboutChange();
    }

    private notifyAboutChange(): void {
        const rgb = ColorConverter.hsv2rgb([this.hue, this.saturation, this.value]);
        this.color = rgb;
        this.colorChange.emit(rgb);
    }
}
