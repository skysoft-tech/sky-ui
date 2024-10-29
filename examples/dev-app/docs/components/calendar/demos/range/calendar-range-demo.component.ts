import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DateRange, SkyCalendarComponent, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-range-calendar-range-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-range-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarRangeDemoComponent {
    @ViewChild('calendar') calendar: SkyCalendarComponent | undefined;

    private selectedDate: Date | undefined;

    selectDate(value: Date): void {
        if (this.calendar) {
            if (!this.selectedDate) {
                this.selectedDate = value;
                this.calendar.selected = value;
            } else {
                this.calendar.selected = new DateRange(this.selectedDate, value);
                this.selectedDate = undefined;
            }
            console.log(this.calendar);
        }
    }
}
