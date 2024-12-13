import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { ColorInputDemoComponent } from './demos/color-input-demo/color-input-demo.component';

const ColorInputPage: NgDocPage = {
    title: 'Color Input',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        ColorInputDemoComponent,
    },
    route: {
        children: [
            {
                path: 'color-input-demo',
                component: ColorInputDemoComponent,
            },
        ],
    },
};

export default ColorInputPage;
