import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { IconsDemoComponent } from './demos/icons-demo/icons-demo.component';

const IconsPage: NgDocPage = {
    title: 'Icons',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        IconsDemoComponent,
    },
    route: {
        children: [
            {
                path: 'icons-demo',
                component: IconsDemoComponent,
            },
        ],
    },
};

export default IconsPage;
