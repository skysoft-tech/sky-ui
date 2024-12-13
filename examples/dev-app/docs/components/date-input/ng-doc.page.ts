import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { DateInputDemoComponent } from './demos/date-input-demo/date-input-demo.component';

const ColorPickerPage: NgDocPage = {
    title: 'Date Input',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        DateInputDemoComponent,
    },
    route: {
        children: [
            {
                path: 'date-input-demo',
                component: DateInputDemoComponent,
            },
        ],
    },
};

export default ColorPickerPage;
