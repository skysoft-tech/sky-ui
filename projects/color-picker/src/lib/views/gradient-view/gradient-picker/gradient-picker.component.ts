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
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { SkyTriangleTrackerDirective } from './triangle-tracker.directive';
import { ColorAnalyzer, ColorComparer, ColorConverter, Hex, Rgb } from '@sky-ui/core';

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
export class SkyGradientPickerComponent implements OnInit, AfterViewInit, OnChanges {
    hue: number = 0;
    saturation: number = 0;
    value: number = 0;

    @Input()
    color!: Rgb;

    get colorInHex(): Hex {
        return ColorConverter.rgb2hex(this.color);
    }

    get puusreColor(): Hex {
        return ColorConverter.hsv2hex([this.hue, 1, 1]);
    }

    get selectorBorder(): Hex {
        const color = ColorAnalyzer.pickReadableColor(this.color);
        return ColorConverter.rgb2hex(color);
    }

    @Output()
    colorChange: EventEmitter<Rgb> = new EventEmitter<Rgb>();

    @ViewChild(SkyTriangleTrackerDirective) triangle?: SkyTriangleTrackerDirective;
    @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;
    @ViewChild('origin') origin?: ElementRef<HTMLElement>;

    ngOnInit(): void {
        const [h, s, v] = ColorConverter.rgb2hsv(this.color);
        this.hue = h;
        this.value = v;
        this.saturation = s;
    }

    ngAfterViewInit(): void {
        this.drawTriangle(this.puusreColor);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['color'] && !changes['color'].firstChange) {
            const [h, s, v] = ColorConverter.rgb2hsv(this.color);
            const prevColor = ColorConverter.hsv2rgb([this.hue, this.saturation, this.value]);
            if (!ColorComparer.compare(prevColor, this.color)) {
                this.hue = h;
                this.value = v;
                this.saturation = s;
            }

            this.drawTriangle(this.puusreColor);
        }
    }

    hueChanged(hue: number): void {
        this.hue = hue;
        this.notifyAboutChange();
    }

    saturationValueChange([saturation, value]: [number, number]): void {
        this.saturation = saturation;
        this.value = value;

        this.notifyAboutChange();
    }

    private notifyAboutChange(): void {
        const rgb = ColorConverter.hsv2rgb([this.hue, this.saturation, this.value]);
        this.colorChange.emit(rgb);
    }

    private drawTriangle(color: Hex): void {
        const ctx = this.canvas?.nativeElement.getContext('2d');

        if (!ctx) {
            return;
        }
        const { width, height } = this.origin!.nativeElement.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        const a = { x: 0, y: 0 };
        const b = { x: width, y: height / 2 };
        const c = { x: 0, y: height };

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();

        ctx.strokeStyle = '#d8d0d0bf';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'transparent';
        ctx.fill();

        // set blend mode
        ctx.globalCompositeOperation = 'color-burn';
        const radius = 140;

        const grd1 = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, radius);
        grd1.addColorStop(0, '#000000FF');
        grd1.addColorStop(1, '#00000000');

        const grd2 = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        grd2.addColorStop(0, color + 'FF');
        grd2.addColorStop(1, color + '00');

        const grd3 = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, radius);
        grd3.addColorStop(0, '#FFFFFFFF');
        grd3.addColorStop(1, '#FFFFFF00');

        ctx.fillStyle = grd1;
        ctx.fill();

        ctx.fillStyle = grd2;
        ctx.fill();

        ctx.fillStyle = grd3;
        ctx.fill();

        // if you need to draw something else, don't forget to reset the gCO
        ctx.globalCompositeOperation = 'source-over';
    }
}
