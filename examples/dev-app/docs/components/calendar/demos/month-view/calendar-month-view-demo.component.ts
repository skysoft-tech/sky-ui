import { ChangeDetectionStrategy, Component,ViewChild } from '@angular/core';
import { DateRange, SkyCalendarComponent, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-range-calendar-month-view-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-month-view-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthViewDemoComponent {
    @ViewChild('calendar') calendar: SkyCalendarComponent | undefined;

    selectDate(value: Date): void {
        if (this.calendar) {
            this.calendar.selected = value;
        }
    }
}
