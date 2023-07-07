import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SkyCalendarComponent } from '../../calendar.component';
import { SkyDayOfWeek } from '../../models/days-of-week.enum';
import { SkyDestroyService } from '@sky-ui/core';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

@Component({
    selector: 'sky-years-view',
    templateUrl: './years-view.component.html',
    styleUrls: ['./years-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SkyDestroyService],
})
export class SkyYearsViewComponent {
    selectedMonth!: number;
    selectedYear!: number;

    get calendarYear(): number {
        return this.dateAdapter.getYear(this.calendar.viewDate);
    }

    private _yearsScrolled: Subject<number> = new Subject();
    private _monthsScrolled: Subject<number> = new Subject();

    yearsScrolled: Observable<number> = this._yearsScrolled.asObservable();
    monthsScrolled: Observable<number> = this._monthsScrolled.asObservable();

    constructor(
        private cdr: ChangeDetectorRef,
        private destroy: SkyDestroyService,
        private calendar: SkyCalendarComponent,
        private dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>
    ) {
        this.init();
        calendar.stateChanges.pipe(takeUntil(this.destroy)).subscribe(() => this.init());
    }

    public scrollYear(yearsNumber: number): void {
        this._yearsScrolled.next(yearsNumber);
    }

    public scrollMonths(monthesNumber: number): void {
        this._monthsScrolled.next(monthesNumber);
    }

    public updateMonth(event: { year: number; month: number }): void {
        const monthsToAdd = event.month - this.selectedMonth;
        const yearsToAdd = event.year - this.calendarYear;

        this.calendar.viewDate = this.dateAdapter.addCalendarMonths(this.calendar.viewDate, monthsToAdd);
        this.calendar.viewDate = this.dateAdapter.addCalendarYears(this.calendar.viewDate, yearsToAdd);

        this.calendar.update();
        this.calendar.openMonthView();
    }

    public updateYear(year: number): void {
        this.selectedYear = year;
    }

    private init(): void {
        this.selectedMonth = this.dateAdapter.getMonth(this.calendar.viewDate);
        this.selectedYear = this.calendarYear;

        this.cdr.markForCheck();
    }
}
