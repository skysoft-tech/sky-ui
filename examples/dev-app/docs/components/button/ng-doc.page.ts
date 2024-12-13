import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { ButtonDemoComponent } from './demos/button-demo/button-demo.component';
import { ButtonDisabledDemoComponent } from './demos/button-disabled-demo/button-disabled-demo.component';

const ButtonPage: NgDocPage = {
    title: 'Button',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        ButtonDemoComponent,
        ButtonDisabledDemoComponent,
    },
    route: {
        children: [
            {
                path: 'button-demo',
                component: ButtonDemoComponent,
            },
            {
                path: 'button-disabled-demo',
                component: ButtonDisabledDemoComponent,
            },
        ],
    },
};

export default ButtonPage;
