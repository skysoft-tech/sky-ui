import { CollectionViewer, DataSource, isDataSource, ListRange } from '@angular/cdk/collections';
import {
    Component,
    ChangeDetectionStrategy,
    Input,
    AfterContentInit,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    HostBinding,
} from '@angular/core';
import { BehaviorSubject, isObservable, Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { DateRange } from './models/date-range.model';
import { SkyDay } from './models/day.view-model';
import { SkyDayOfWeek } from './models/days-of-week.enum';
import { SpecialDateInput } from './models/special-dates.model';
import { SheetService } from './services/sheet.service';
import { viewTransitionAnimation } from './calendar.animations';
import { SkyDestroyService } from '@sky-ui/core';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

/**
 * Possible views for the calendar.
 */
export type SkyCalendarView = 'days' | 'months' | 'years';

export type SkyCalendarSize = 'large' | 'medium' | 'small';

/**
 * Possible types that can be set as the `selected` for a `SkyCalendar`.
 */
export type SkyCalendarInput<T> = T | DateRange<T>;

/**
 * Possible types that can be set as the `specialDates` for a `SkyCalendar`.
 */
export type SkyCalendarSpecialDatesInput<T> =
    | SpecialDateInput<T>[]
    | DataSource<SpecialDateInput<T>>
    | Observable<SpecialDateInput<T>[]>
    | null;

@Component({
    selector: 'sky-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SheetService, SkyDestroyService],
    animations: [viewTransitionAnimation],
    host: {
        class: 'sky-calendar',
    },
})
export class SkyCalendarComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy, CollectionViewer {
    public readonly currentDate: Date;
    public currentView?: SkyCalendarView;
    public viewDate!: Date;

    public get isRange(): boolean {
        return this.selected instanceof DateRange;
    }

    public stateChanges = new Subject<void>();

    @Input()
    @HostBinding('class')
    size: SkyCalendarSize = 'medium';

    @Input()
    startView: SkyCalendarView = 'months';

    @Input()
    selected: SkyCalendarInput<Date> | null = null;

    @Input()
    specialDates: SkyCalendarSpecialDatesInput<Date> = null;

    private specialDatesChangeSubscription: Subscription | null = null;

    private _specialDatesDataStream: BehaviorSubject<readonly SpecialDateInput<Date>[]> = new BehaviorSubject<
        readonly SpecialDateInput<Date>[]
    >([]);
    public specialDatesDataStream: Observable<readonly SpecialDateInput<Date>[]> =
        this._specialDatesDataStream.asObservable();

    @Output()
    selectDate: EventEmitter<Date> = new EventEmitter<Date>();

    viewChange!: BehaviorSubject<ListRange>;

    constructor(private destroy: SkyDestroyService, public dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>) {
        this.currentDate = dateAdapter.today();
    }

    ngOnInit(): void {
        this.viewDate = this.getViewDate() ?? this.currentDate;
        const currentYear = this.dateAdapter.getYear(this.viewDate);
        this.viewChange = new BehaviorSubject<ListRange>({ start: currentYear, end: currentYear });

        if (this.specialDates) {
            this.updateSpecialDatesStrem(this.specialDates, null);
        }
    }

    ngAfterContentInit() {
        this.currentView = this.startView;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const specialDatesChange = changes['specialDates'];
        if (specialDatesChange) {
            this.updateSpecialDatesStrem(specialDatesChange.currentValue, specialDatesChange.previousValue);
        }

        const viewDateChange = changes['viewDate'];
        if (viewDateChange) {
            this.handleViewDAteChange(viewDateChange.currentValue, viewDateChange.previousValue);
        }
    }

    handleDayClick(day: SkyDay): void {
        if (!this.isRange) {
            this.viewDate = day.date;
            this.update();
        }

        this.selectDate.emit(day.date);
    }

    update() {
        this.stateChanges.next();
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._specialDatesDataStream.complete();
    }

    openMonthView(): void {
        this.currentView = 'months';
    }

    openYearView(): void {
        this.currentView = 'years';
    }

    toggle(): void {
        if (this.currentView === 'months') {
            this.currentView = 'years';
        } else {
            this.currentView = 'months';
        }
    }

    private handleViewDAteChange(current: Date, previous: Date): void {
        if (!current) {
            return;
        }

        const currentYear = this.dateAdapter.getYear(current);
        if (previous === null || currentYear !== this.dateAdapter.getYear(previous)) {
            this.viewChange.next({ start: currentYear, end: currentYear });
        }
    }

    private getViewDate(): Date | null {
        if (this.selected instanceof DateRange) {
            return this.selected.from;
        }

        return this.selected as Date;
    }

    private updateSpecialDatesStrem(
        newSpecialDates: SkyCalendarSpecialDatesInput<Date>,
        oldSpecialDates: SkyCalendarSpecialDatesInput<Date>
    ): void {
        this._specialDatesDataStream.next([]);
        this.closePreviousStream(oldSpecialDates);
        const dataStream = this.getDataStrem(newSpecialDates);

        this.specialDatesChangeSubscription = dataStream.pipe(takeUntil(this.destroy)).subscribe(data => {
            this._specialDatesDataStream.next(data || []);
        });
    }

    private closePreviousStream(oldSpecialDates: SkyCalendarSpecialDatesInput<Date>): void {
        if (this.specialDatesChangeSubscription) {
            this.specialDatesChangeSubscription.unsubscribe();
            this.specialDatesChangeSubscription = null;
        }

        if (isDataSource(oldSpecialDates)) {
            oldSpecialDates.disconnect(this);
        }
    }

    private getDataStrem(
        newSpecialDates: SkyCalendarSpecialDatesInput<Date>
    ): Observable<readonly SpecialDateInput<Date>[] | null> {
        let dataStream: Observable<readonly SpecialDateInput<Date>[] | null>;

        if (isDataSource(newSpecialDates)) {
            dataStream = newSpecialDates.connect(this);
        } else if (isObservable(newSpecialDates)) {
            dataStream = newSpecialDates;
        } else {
            dataStream = of(newSpecialDates);
        }

        return dataStream;
    }
}
