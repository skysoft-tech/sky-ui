import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { CheckboxDemoComponent } from './demos/checkbox-demo/checkbox-demo.component';

const CheckboxPage: NgDocPage = {
    title: 'Checkbox',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        CheckboxDemoComponent,
    },
    route: {
        children: [
            {
                path: 'checkbox-demo',
                component: CheckboxDemoComponent,
            },
        ],
    },
};

export default CheckboxPage;
