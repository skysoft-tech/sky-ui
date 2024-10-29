import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SkyCalendarComponent, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-docs-calendar-simple-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-simple-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSimpleDemoComponent {
    @ViewChild('calendar') calendar: SkyCalendarComponent | undefined;

    selectDate(value: Date): void {
        if (this.calendar) {
            this.calendar.selected = value;
        }
    }
}
