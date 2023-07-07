import { Directive, ElementRef, Renderer2, OnInit, Input, HostBinding } from '@angular/core';
import { SkyDay } from '../../models/day.view-model';
import { PeriodWithType } from '../../models/special-dates.model';
import { RangeColorService } from '../../services/range-color.service';
import { SkyMonthsViewComponent } from './months-view.component';
import { Hex } from '@sky-ui/core';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

interface Property {
    type: string;
    isMiddle: boolean;
    isStart: boolean;
    isEnd: boolean;
}

interface CellColors {
    endColor: Hex[] | null;
    startColor: Hex[] | null;
    middleColor: Hex[] | null;
}

interface CellGradients {
    gradientMiddle: Hex | string | null;
    gradiendBoundary: Hex | null;
}

@Directive({
    selector: '[skyCalendarSpecialCell]',
})
export class SkyCalendarSpecialCellDirective implements OnInit {
    @Input('skyCalendarSpecialCell')
    day!: SkyDay;

    private _boundaryBackground: Hex | null = null;
    @HostBinding('style.--boundary-background')
    get startBackground(): Hex | null {
        return this._boundaryBackground;
    }

    private _middleBackground: Hex | string | null = null;
    @HostBinding('style.--middle-background')
    get middleBackground(): Hex | string | null {
        return this._middleBackground;
    }

    constructor(
        private renderer: Renderer2,
        private dateAdapter: SkyDateAdapter<Date>,
        private monthsView: SkyMonthsViewComponent,
        private elementRef: ElementRef<HTMLElement>,
        private colorService: RangeColorService
    ) {}

    ngOnInit(): void {
        const dayProperties = this.getDayProperties(this.monthsView.specialRanges, this.day);

        if (dayProperties.length === 0) {
            return;
        }

        const cellColors = this.getCellColors(dayProperties);

        const { gradientMiddle, gradiendBoundary } = this.getCellGradients(cellColors);

        this.setClasses(cellColors);
        this._middleBackground = gradientMiddle;
        this._boundaryBackground = gradiendBoundary;
    }

    private setClasses(colors: CellColors): void {
        if (colors.endColor !== null) {
            this.renderer.addClass(this.elementRef.nativeElement, 'special-range-end');
        }
        if (colors.middleColor !== null) {
            this.renderer.addClass(this.elementRef.nativeElement, 'special-range-middle');
        }
        if (colors.startColor !== null) {
            this.renderer.addClass(this.elementRef.nativeElement, 'special-range-start');
        }
        if (colors.startColor || colors.endColor || colors.middleColor) {
            this.renderer.addClass(this.elementRef.nativeElement, 'special-range');
        }
    }

    private getCellColors(dayProperties: Property[]): CellColors {
        let startColor: Hex[] | null = null;
        const startProperties = dayProperties.filter(p => p.isStart);
        if (startProperties.length !== 0) {
            startColor = this.colorService.getColorByType(startProperties.map(p => p.type));
        }

        let endColor: Hex[] | null = null;
        const endProperties = dayProperties.filter(p => p.isEnd);
        if (endProperties.length !== 0) {
            endColor = this.colorService.getColorByType(endProperties.map(p => p.type));
        }

        let middleColor: Hex[] | null = null;
        const middleRanges = dayProperties.filter(p => p.isMiddle);
        if (middleRanges.length !== 0) {
            middleColor = this.colorService.getColorByType(middleRanges.map(p => p.type));
        }

        return { startColor: startColor, endColor: endColor, middleColor: middleColor };
    }

    private getCellGradients(colors: CellColors): CellGradients {
        const cellColor: Hex[] = [];
        if (colors.startColor !== null) {
            colors.startColor.forEach(el => cellColor.push(el));
        }

        if (colors.middleColor !== null) {
            colors.middleColor.forEach(el => cellColor.push(el));
        }

        if (colors.endColor !== null) {
            colors.endColor.forEach(el => cellColor.push(el));
        }

        let gradientStart: Hex | null = colors.startColor && this.colorService.mixColorArray(colors.startColor);
        const gradientEnd: Hex | null =
            colors.endColor &&
            colors.middleColor &&
            this.colorService.mixColorArray(colors.endColor.concat(colors.middleColor));

        let gradientMiddle: Hex | string | null =
            colors.middleColor && this.colorService.mixColorArray(colors.middleColor!);

        const gradiendBoundary = this.colorService.mixColorArray(cellColor);

        if (colors.startColor !== null && colors.endColor !== null) {
            if (colors.middleColor) {
                gradientStart =
                    colors.startColor && this.colorService.mixColorArray(colors.startColor?.concat(colors.middleColor));
                gradientEnd;
                colors.endColor && this.colorService.mixColorArray(colors.endColor.concat(colors.middleColor));
            }

            gradientMiddle = `linear-gradient(to left, ${gradientStart} 1.5rem, ${gradientEnd} 1.5rem)`;
        }

        return { gradiendBoundary, gradientMiddle };
    }

    private getDayProperties(rangesMap: Map<string, PeriodWithType<Date>[]>, day: SkyDay): Property[] {
        const dayProperties: Property[] = [];

        for (const [type, ranges] of rangesMap.entries()) {
            const selectedRanges = ranges.filter(range => this.inRange(range, this.day.date));

            if (selectedRanges.length === 0) {
                continue;
            }
            const isMiddle = selectedRanges.some(range => this.isMiddleOfRange(range, this.day.date));
            const isStart = selectedRanges.some(range => this.dateAdapter.sameDate(range.from, this.day.date));
            const isEnd = selectedRanges.some(range => this.dateAdapter.sameDate(range.to, this.day.date));

            dayProperties.push({ type, isMiddle, isStart, isEnd });
        }

        return dayProperties;
    }

    private inRange(range: PeriodWithType<Date>, day: Date): boolean {
        return this.dateAdapter.compareDate(range.from, day) <= 0 && this.dateAdapter.compareDate(range.to, day) >= 0;
    }

    private isMiddleOfRange(range: PeriodWithType<Date>, day: Date): boolean {
        return this.dateAdapter.compareDate(range.from, day) < 0 && this.dateAdapter.compareDate(range.to, day) > 0;
    }
}
