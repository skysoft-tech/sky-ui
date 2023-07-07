import { CdkScrollable } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    Component,
    Input,
    ViewChild,
    ChangeDetectionStrategy,
    HostListener,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    NgZone,
} from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { SkyYearsViewComponent } from '../years-view.component';
import { SkyDestroyService } from '@sky-ui/core';
import { SkyDateAdapter, SkyDayOfWeek } from '@sky-ui/date-adapter';
import { CalendarViewRangeService } from '../../../services/calendar-view-range.service';

interface YearMonthes {
    year: number;
    months: string[];
}

@Component({
    selector: 'sky-months-list',
    templateUrl: './months-list.component.html',
    styleUrls: ['./months-list.component.scss'],
    providers: [SkyDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyMonthsListComponent implements AfterViewInit, OnChanges {
    @Input()
    selectedYear!: number;

    @Input()
    calendarYear!: number;

    @Input()
    selectedMonth!: number;

    @Output()
    monthSelected: EventEmitter<{ year: number; month: number }> = new EventEmitter();

    yearsWithMonths: YearMonthes[];
    itemSize: number = 204;

    @ViewChild('scrollable') scrollable!: CdkScrollable;

    private hover: boolean = false;
    @HostListener('mouseenter')
    public mouseenterListener(): void {
        this.hover = true;
    }

    @HostListener('mouseleave')
    public mouseleaveListener(): void {
        this.hover = false;
    }

    constructor(
        private zone: NgZone,
        private destroy: SkyDestroyService,
        private dateRangeService: CalendarViewRangeService,
        private yearsViewComponent: SkyYearsViewComponent,
        private dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>
    ) {
        this.yearsWithMonths = this.generateYears();
    }

    ngAfterViewInit(): void {
        const index = this.yearsWithMonths.findIndex(y => y.year === this.selectedYear);
        this.scrollToIndex(index);

        this.zone.runOutsideAngular(() => {
            this.yearsViewComponent.yearsScrolled
                .pipe(
                    takeUntil(this.destroy),
                    filter(() => !this.hover)
                )
                .subscribe((years: number) => {
                    this.scrollToIndex(years);
                });

            this.scrollable
                .elementScrolled()
                .pipe(
                    takeUntil(this.destroy),
                    filter(_ => this.hover)
                )
                .subscribe(_ => {
                    const offset = this.scrollable.measureScrollOffset('top');
                    const monthsNumber = offset / this.itemSize;
                    this.yearsViewComponent.scrollMonths(monthsNumber);
                });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedYear'] && !changes['selectedYear'].firstChange) {
            const index = this.yearsWithMonths.findIndex(e => e.year === changes['selectedYear'].currentValue);
            this.scrollToIndex(index, 'smooth');
        }
    }

    public selectMonth(year: number, month: number): void {
        this.monthSelected.emit({ year, month });
    }

    private scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
        const top = this.itemSize * index + 25;

        setTimeout(() => this.scrollable.scrollTo({ top, behavior }), 0);
    }

    private generateYears(): YearMonthes[] {
        const months = this.dateAdapter.getMonthNames('short');
        const yearsWithMonths: YearMonthes[] = [];

        for (let year = this.dateRangeService.startYear; year < this.dateRangeService.endYear; year++) {
            yearsWithMonths.push({ year, months });
        }

        return yearsWithMonths;
    }
}
