import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { ToastDemoComponent } from './demos/toast-demo/toast-demo.component';

const ToastPage: NgDocPage = {
    title: 'Toast',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        ToastDemoComponent,
    },
    route: {
        children: [
            {
                path: 'toast-demo',
                component: ToastDemoComponent,
            },
        ],
    },
};

export default ToastPage;
