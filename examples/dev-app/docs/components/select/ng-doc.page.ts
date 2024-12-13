import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { SelectDemoComponent } from './demos/select-demo/select-demo.component';

const SelectPage: NgDocPage = {
    title: 'Select',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        SelectDemoComponent,
    },
    route: {
        children: [
            {
                path: 'select-demo',
                component: SelectDemoComponent,
            },
        ],
    },
};

export default SelectPage;
