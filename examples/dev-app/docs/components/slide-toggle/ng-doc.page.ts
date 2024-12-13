import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { SlideToggleDemoComponent } from './demos/slide-toggle-demo/slide-toggle-demo.component';

const SlideTogglePage: NgDocPage = {
    title: 'SlideToggle',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        SlideToggleDemoComponent,
    },
    route: {
        children: [
            {
                path: 'slide-toggle-demo',
                component: SlideToggleDemoComponent,
            },
        ],
    },
};

export default SlideTogglePage;
