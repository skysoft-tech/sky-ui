import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { CalendarMonthViewDemoComponent } from './demos/calendar-month-view-demo/calendar-month-view-demo.component';
import { CalendarRangeDemoComponent } from './demos/calendar-range-demo/calendar-range-demo.component';
import { CalendarDemoComponent } from './demos/calendar-demo/calendar-demo.component';
import { CalendarSpecialDatesDemoComponent } from './demos/calendar-special-dates-demo/calendar-special-dates-demo.component';

const CalendarPage: NgDocPage = {
    title: 'Calendar',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        CalendarDemoComponent,
        CalendarMonthViewDemoComponent,
        CalendarRangeDemoComponent,
        CalendarSpecialDatesDemoComponent,
    },
    route: {
        children: [
            {
                path: 'calendar-demo',
                component: CalendarDemoComponent,
            },
            {
                path: 'calendar-month-view-demo',
                component: CalendarMonthViewDemoComponent,
            },
            {
                path: 'calendar-range-demo',
                component: CalendarRangeDemoComponent,
            },
            {
                path: 'calendar-special-dates-demo',
                component: CalendarSpecialDatesDemoComponent,
            },
        ],
    },
};

export default CalendarPage;
