import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PeriodWithType, SkyCalendarInput, SkyCalendarModule, SkyCalendarSpecialDatesInput } from '@sky-ui/calendar';

@Component({
    selector: 'app-docs-calendar-special-dates-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-special-dates-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSpecialDatesDemoComponent {
    selectedDate: SkyCalendarInput<Date> = new Date();

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
        this.selectedDate = value;
    }
}
