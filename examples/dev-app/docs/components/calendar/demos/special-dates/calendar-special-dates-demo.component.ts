import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
    PeriodWithType,
    SkyCalendarComponent,
    SkyCalendarModule,
    SkyCalendarSpecialDatesInput,
} from '@sky-ui/calendar';

@Component({
    selector: 'app-docs-calendar-special-dates-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-special-dates-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSpecialDatesDemoComponent {
    @ViewChild('calendar') calendar: SkyCalendarComponent | undefined;

    specialDates: SkyCalendarSpecialDatesInput<Date>;

    constructor() {
        const currentDate = new Date();

        this.specialDates = [
            new PeriodWithType<Date>(
                {
                    from: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
                    to: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
                },
                ''
            ),
            new PeriodWithType<Date>(
                {
                    from: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
                },
                ''
            ),
        ];
    }

    selectDate(value: Date): void {
        if (this.calendar) {
            this.calendar.selected = value;
        }
    }
}
