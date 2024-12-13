import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { BreadcrumbDemoComponent } from './demos/breadcrumb-demo/breadcrumb-demo.component';
import { BreadcrumbDividerDemoComponent } from './demos/breadcrumb-divider-demo/breadcrumb-divider-demo.component';

const BreadcrumbPage: NgDocPage = {
    title: 'Breadcrumb',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        BreadcrumbDemoComponent,
        BreadcrumbDividerDemoComponent,
    },
    route: {
        children: [
            {
                path: 'breadcrumb-demo',
                component: BreadcrumbDemoComponent,
            },
            {
                path: 'breadcrumb-divider-demo',
                component: BreadcrumbDividerDemoComponent,
            },
        ],
    },
};

export default BreadcrumbPage;
