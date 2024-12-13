import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { PaginatorDemoComponent } from './demos/paginator-demo/paginator-demo.component';

const PaginatorPage: NgDocPage = {
    title: 'Paginator',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        PaginatorDemoComponent,
    },
    route: {
        children: [
            {
                path: 'paginator-demo',
                component: PaginatorDemoComponent,
            },
        ],
    },
};

export default PaginatorPage;
