import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateRange, SkyCalendarInput, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-calendar-range-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-range-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarRangeDemoComponent {
    selectedDate: SkyCalendarInput<Date> | null = null;

    selectDate(value: Date): void {
        if (this.selectedDate instanceof Date) {
            this.selectedDate = new DateRange(this.selectedDate as Date, value);
        } else {
            this.selectedDate = value;
        }
    }
}
