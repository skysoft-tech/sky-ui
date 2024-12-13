import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyCalendarInput, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-calendar-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDemoComponent {
    selectedDate: SkyCalendarInput<Date> = new Date();

    selectDate(value: Date): void {
        this.selectedDate = value;
    }
}
