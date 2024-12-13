import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { ColorPickerDemoComponent } from './demos/color-picker-demo/color-picker-demo.component';

const ColorPickerPage: NgDocPage = {
    title: 'Color Picker',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        ColorPickerDemoComponent,
    },
    route: {
        children: [
            {
                path: 'color-picker-demo',
                component: ColorPickerDemoComponent,
            },
        ],
    },
};

export default ColorPickerPage;
