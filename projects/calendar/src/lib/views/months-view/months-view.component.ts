import { CdkScrollable } from '@angular/cdk/scrolling';
import {
    Input,
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    AfterViewInit,
    ViewChild,
    HostListener,
    NgZone,
    OnInit,
} from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { SkyCalendarComponent, SkyDayMarker } from '../../calendar.component';
import { DateRange } from '../../models/date-range.model';
import { SkyDay } from '../../models/day.view-model';
import { SkyDayOfWeek } from '../../models/days-of-week.enum';
import { PeriodWithType, SpecialDateInput } from '../../models/special-dates.model';
import { CalendarViewRangeService } from '../../services/calendar-view-range.service';
import { RangeValidator } from '../../services/range-validator';
import { CALENDAR_ROWS_COUNT, SheetService } from '../../services/sheet.service';
import { DateDataSource } from './date-data-source';
import { Hex, SkyDestroyService } from '@sky-ui/core';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

const WEEK_ELEMENT_HEIGHT = 48;
const SELECTED_RANGE_TYPE = 'selected';

@Component({
    selector: 'sky-months-view',
    templateUrl: './months-view.component.html',
    styleUrls: ['./months-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SkyDestroyService],
})
export class SkyMonthsViewComponent implements OnInit, AfterViewInit {
    @Input()
    focusSelectedMonth: boolean = false;

    @Input()
    isRange!: boolean;

    @Input()
    selected: Date | DateRange<Date> | null = null;

    @Input()
    today: Date | null = null;

    @Input()
    specialDates: readonly SpecialDateInput<Date>[] | null = null;

    @Input()
    markers: SkyDayMarker[] | null = null;

    public specialRanges: Map<string, PeriodWithType<Date>[]> = new Map();

    public dayNames!: string[];

    public dataSource: DateDataSource;
    public itemSize = WEEK_ELEMENT_HEIGHT;

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
        sheetService: SheetService,
        private zone: NgZone,
        private destroy: SkyDestroyService,
        public calendar: SkyCalendarComponent,
        private rangeValidator: RangeValidator<Date>,
        private dateRangeService: CalendarViewRangeService,
        public dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>,
        private changeDetector: ChangeDetectorRef
    ) {
        this.dataSource = new DateDataSource(sheetService, dateRangeService, dateAdapter);
        this.dayNames = this.dateAdapter.getDayOfWeekNames('short');

        this.calendar.stateChanges.subscribe(() => this.handleUpdate());
    }

    ngOnInit(): void {
        this.specialDates?.forEach(date => {
            if (!this.rangeValidator.isValid(date)) {
                console.warn(`Special date of type "${date.type}" from: ${date.from}; to: ${date.to}; is invalid.`);
                return;
            }
            this.addOrUpdateMap(this.specialRanges, date);
        });

        if (this.selected && this.isRange) {
            const range = this.selected as DateRange<Date>;
            const selectedPeriod = new PeriodWithType<Date>({ from: range.from!, to: range.to! }, SELECTED_RANGE_TYPE);
            this.addOrUpdateMap(this.specialRanges, selectedPeriod);
        }
    }

    ngAfterViewInit(): void {
        const firstDayOfMonth = this.getFirstDayOfMonth(this.calendar.viewDate);
        this.scrollToDate(firstDayOfMonth);

        this.scrollable
            .elementScrolled()
            .pipe(
                takeUntil(this.destroy),
                filter(_ => this.hover)
            )
            .subscribe(_ => {
                const offset = this.scrollable.measureScrollOffset('top');
                const index = Math.floor((offset + (this.itemSize * CALENDAR_ROWS_COUNT) / 2) / this.itemSize);
                const week = this.dataSource.getItemByIndex(index);
                if (!week) {
                    return;
                }

                const monthesToAdd = week.months - this.dateAdapter.getMonth(this.calendar.viewDate);
                const yearsToAdd = week.year - this.dateAdapter.getYear(this.calendar.viewDate);

                this.calendar.viewDate = this.dateAdapter.addCalendarMonths(this.calendar.viewDate, monthesToAdd);
                this.calendar.viewDate = this.dateAdapter.addCalendarYears(this.calendar.viewDate, yearsToAdd);

                this.zone.run(() => this.calendar.update());
            });
    }

    public dayClick(day: SkyDay): void {
        this.calendar.handleDayClick(day);

        if (!this.isRange && this.focusSelectedMonth) {
            this.scrollToDate(day.date, 'smooth');
        }
    }

    public isActive(day: SkyDay): boolean {
        return this.dateAdapter.sameMonth(day.date, this.calendar.viewDate) || this.isRange;
    }

    public isToday(day: SkyDay): boolean {
        return this.dateAdapter.sameDate(this.today, day.date);
    }

    public getDotColor(day: SkyDay): Hex | undefined {
        return this.markers?.find(marker => this.dateAdapter.sameDate(marker.date, day.date))?.color;
    }

    public isSelectedStart(day: SkyDay): boolean {
        if (!this.selected) {
            return false;
        }

        if (!this.isRange) {
            return this.dateAdapter.sameDate(this.selected as Date, day.date);
        }
        return this.dateAdapter.sameDate((this.selected as DateRange<Date>).from, day.date);
    }

    public isSelectedEnd(day: SkyDay): boolean {
        if (!this.selected) {
            return false;
        }

        if (!this.isRange) {
            return this.dateAdapter.sameDate(this.selected as Date, day.date);
        }

        return this.dateAdapter.sameDate((this.selected as DateRange<Date>).to, day.date);
    }

    private scrollToDate(date: Date, behavior: ScrollBehavior = 'auto'): void {
        const firstDayOfMonth = this.getFirstDayOfMonth(date);
        const weeksNumber = this.dateRangeService.getNumberOfWeek(firstDayOfMonth);
        const top = this.itemSize * weeksNumber;
        setTimeout(() => this.scrollable.scrollTo({ top, behavior }), 0);
    }

    private handleUpdate(): void {
        this.changeDetector.detectChanges();

        if (this.hover) {
            return;
        }

        this.scrollToDate(this.calendar.viewDate, 'smooth');
    }

    private getFirstDayOfMonth(date: Date): Date {
        const firstDayOfMonth = new Date(date);
        firstDayOfMonth.setDate(1);

        return firstDayOfMonth;
    }

    private addOrUpdateMap<T extends { type: string }>(map: Map<string, T[]>, value: T): void {
        if (map.has(value.type)) {
            map.get(value.type)?.push(value);
        } else {
            map.set(value.type, [value]);
        }
    }
}
