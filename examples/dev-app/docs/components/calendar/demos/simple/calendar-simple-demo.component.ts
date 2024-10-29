import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkyCalendarInput, SkyCalendarModule } from '@sky-ui/calendar';

@Component({
    selector: 'app-docs-calendar-simple-demo',
    standalone: true,
    imports: [SkyCalendarModule],
    templateUrl: './calendar-simple-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSimpleDemoComponent {
    selectedDate: SkyCalendarInput<Date> = new Date();

    selectDate(value: Date): void {
        this.selectedDate = value;
    }
}
