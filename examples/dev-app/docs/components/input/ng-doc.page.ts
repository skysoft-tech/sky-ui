import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { InputDemoComponent } from './demos/input-demo/input-demo.component';

const InputPage: NgDocPage = {
    title: 'Input',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        InputDemoComponent,
    },
    route: {
        children: [
            {
                path: 'input-demo',
                component: InputDemoComponent,
            },
        ],
    },
};

export default InputPage;
