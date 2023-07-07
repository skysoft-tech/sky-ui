import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { SkyCalendarComponent } from '../calendar.component';
import { SkyDayOfWeek } from '../models/days-of-week.enum';
import { SkyDestroyService } from '@sky-ui/core';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

@Component({
    selector: 'sky-calendar-header',
    templateUrl: './calendar-header.component.html',
    styleUrls: ['./calendar-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SkyDestroyService],
})
export class SkyCalendarHeaderComponent implements OnInit {
    public monthName!: string;
    public year!: number;

    constructor(
        private cdr: ChangeDetectorRef,
        private destroy: SkyDestroyService,
        private calendar: SkyCalendarComponent,
        private dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>
    ) {}

    ngOnInit(): void {
        this.init();

        this.calendar.stateChanges.pipe(takeUntil(this.destroy)).subscribe(() => this.init());
    }

    init() {
        this.year = this.calendar.viewDate.getFullYear();
        this.monthName = this.dateAdapter.getMonthName(this.calendar.viewDate, 'long');

        this.cdr.markForCheck();
    }

    prevMonth(): void {
        this.calendar.viewDate = this.dateAdapter.addCalendarMonths(this.calendar.viewDate, -1);
        this.init();
        this.calendar.update();
    }

    nextMonth(): void {
        this.calendar.viewDate = this.dateAdapter.addCalendarMonths(this.calendar.viewDate, 1);
        this.init();
        this.calendar.update();
    }

    changeView(): void {
        this.calendar.toggle();
    }
}
