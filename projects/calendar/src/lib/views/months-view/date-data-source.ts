import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SkyDayOfWeek } from '../../models/days-of-week.enum';
import { SkyWeek } from '../../models/week.view-model';
import { CalendarViewRangeService } from '../../services/calendar-view-range.service';
import { SheetService } from '../../services/sheet.service';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

export class DateDataSource extends DataSource<SkyWeek> {
    private subscription = new Subscription();
    private dataStream: BehaviorSubject<SkyWeek[]>;
    private cache: SkyWeek[];

    constructor(
        private sheetService: SheetService,
        private dateRangeService: CalendarViewRangeService,
        private dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>
    ) {
        super();

        const weeksNumber = dateRangeService.getNumberOfWeeks();
        this.cache = Array.from<SkyWeek>({ length: weeksNumber });
        this.dataStream = new BehaviorSubject(this.cache);
    }

    connect(collectionViewer: CollectionViewer): Observable<readonly SkyWeek[]> {
        const subscription = collectionViewer.viewChange.subscribe(range => {
            if (!this.shouldLoad(range)) {
                return;
            }

            this.loadWeeks({ start: range.start, end: range.end - 1 });
        });
        this.subscription.add(subscription);

        return this.dataStream.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subscription.unsubscribe();
    }

    getItemByIndex(index: number): SkyWeek {
        return this.cache[index];
    }

    private loadWeeks(range: { start: number; end: number }): void {
        const loaded = new Map<number, SkyWeek>();
        let currentDate = this.dateRangeService.getDateByWeekIndex(range.start);

        while (loaded.size < range.end - range.start) {
            let weeks = this.sheetService.generateDaysSheet(currentDate).weeks;

            if (!loaded.size) {
                weeks = weeks.filter(w => this.getEndOfWeek(w) > currentDate.getTime());
            }

            weeks.forEach(w => loaded.set(this.getEndOfWeek(w), w));
            currentDate = this.dateAdapter.addCalendarMonths(currentDate, 1);
        }

        this.cache.splice(range.start, loaded.size, ...loaded.values());
        this.dataStream.next(this.cache);
    }

    private getEndOfWeek(week: SkyWeek): number {
        return week.days[6].date.getTime();
    }

    private shouldLoad(range: { start: number; end: number }): boolean {
        return this.cache.slice(range.start, range.end).some(w => !w);
    }
}
