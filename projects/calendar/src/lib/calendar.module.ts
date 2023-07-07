import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyCalendarComponent } from './calendar.component';
import { SkyMonthsViewComponent } from './views/months-view/months-view.component';
import { SkyYearsViewComponent } from './views/years-view/years-view.component';
import { SkyCalendarHeaderComponent } from './header/calendar-header.component';
import { SkyYearsListComponent } from './views/years-view/years-list/years-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SkyMonthsListComponent } from './views/years-view/months-list/months-list.component';
import { CalendarViewRangeService } from './services/calendar-view-range.service';
import { SkyCalendarSpecialCellDirective } from './views/months-view/calendar-special-cell.directive';
import { RangeValidator } from './services/range-validator';
import { Ranges, SUPORTED_RANGES } from './models/special-dates.model';
import { RangeColorService } from './services/range-color.service';
import { DEFAULT_RANGES } from './constants';
import { SkyIconsModule } from '@sky-ui/icons';
import { SkyButtonModule } from '@sky-ui/button';
import { SkyDateAdapterModule } from '@sky-ui/date-adapter';

@NgModule({
    declarations: [
        SkyCalendarComponent,
        SkyMonthsViewComponent,
        SkyCalendarHeaderComponent,
        SkyYearsViewComponent,
        SkyYearsListComponent,
        SkyMonthsListComponent,
        SkyCalendarSpecialCellDirective,
    ],
    imports: [CommonModule, ScrollingModule, SkyIconsModule, SkyDateAdapterModule, SkyButtonModule],
    providers: [CalendarViewRangeService, RangeValidator, RangeColorService],
    exports: [SkyCalendarComponent],
})
export class SkyCalendarModule {
    public static forChild(ranges: Ranges): ModuleWithProviders<SkyCalendarModule> {
        const computedRanges = Object.assign(DEFAULT_RANGES, ranges);
        return {
            ngModule: SkyCalendarModule,
            providers: [
                {
                    provide: SUPORTED_RANGES,
                    useValue: computedRanges,
                },
            ],
        };
    }
}
