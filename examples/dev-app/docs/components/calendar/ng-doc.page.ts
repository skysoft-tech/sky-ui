import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { CalendarMonthViewDemoComponent } from './demos/month-view/calendar-month-view-demo.component';
import { CalendarRangeDemoComponent } from './demos/range/calendar-range-demo.component';
import { CalendarSimpleDemoComponent } from './demos/simple/calendar-simple-demo.component';
import { CalendarSpecialDatesDemoComponent } from './demos/special-dates/calendar-special-dates-demo.component';

const CalendarPage: NgDocPage = {
    title: 'Calendar',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        CalendarMonthViewDemoComponent,
        CalendarRangeDemoComponent,
        CalendarSimpleDemoComponent,
        CalendarSpecialDatesDemoComponent,
    },
    route: {
        children: [
            {
                path: 'calendar-month-view-demo',
                component: CalendarMonthViewDemoComponent,
            },
            {
                path: 'calendar-range-demo',
                component: CalendarRangeDemoComponent,
            },
            {
                path: 'calendar-simple-demo',
                component: CalendarSimpleDemoComponent,
            },
            {
                path: 'calendar-special-dates-demo',
                component: CalendarSpecialDatesDemoComponent,
            },
        ],
    },
};

export default CalendarPage;
