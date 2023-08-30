import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { ColorConverter, Hex, Hsv } from '@sky-ui/core';

const defaultColors: Hsv[] = [
    [0, 0, 1],
    [0, 1, 1],
    [36, 1, 1],
    [60, 1, 1],
    [120, 1, 1],
    [180, 1, 1],
    [240, 1, 1],
    [217, 0.68, 0.91],
    [276, 1, 1],
    [300, 1, 1],
    // [1, 0.89, 0.88],
    // [219, 0.66, 0.77],
    // [24, 0.79, 0.93],
    // [300, 0.06, 0.65],
    // [45, 0.98, 1],
    // [208, 0.58, 0.84],
    // [96, 0.59, 0.68],
];

@Component({
    selector: 'sky-pallet-view',
    templateUrl: './pallet-view.component.html',
    styleUrls: ['./pallet-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-pallet-view',
    },
})
export class SkyPalletViewComponent implements OnInit {
    @Input()
    colors?: Hex[];

    @Output()
    colorChange: EventEmitter<Hex> = new EventEmitter<Hex>();

    ngOnInit(): void {
        if (this.colors) {
            return;
        }

        for (let i = 0; i < 6; i++) {
            this.colors = [
                ...(this.colors ?? []),
                ...defaultColors.map(([h, s, v]: Hsv, index: number) => {
                    if (i > 0) {
                        v = 1 - (index === 0 ? 0.2 : 0.06) * i;
                        if (s !== 0) {
                            s = 0.2 + 0.1 * i;
                        }
                    }

                    return ColorConverter.hsv2hex([h, s, v]);
                }),
            ];
        }
    }

    selectColor(color: Hex): void {
        this.colorChange.emit(color);
    }
}
