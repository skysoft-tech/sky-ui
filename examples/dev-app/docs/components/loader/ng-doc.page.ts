import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { LoaderDemoComponent } from './demos/loader-demo/loader-demo.component';

const LoaderPage: NgDocPage = {
    title: 'Loader',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        LoaderDemoComponent,
    },
    route: {
        children: [
            {
                path: 'loader-demo',
                component: LoaderDemoComponent,
            },
        ],
    },
};

export default LoaderPage;
