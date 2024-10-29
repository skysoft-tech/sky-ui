import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyCalendarInput, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-range-calendar-month-view-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-month-view-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthViewDemoComponent {
    selectedDate: SkyCalendarInput<Date> = new Date();

    selectDate(value: Date): void {
        this.selectedDate = value;
    }
}
