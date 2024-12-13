import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { TableDemoComponent } from './demos/table-demo/table-demo.component';

const TablePage: NgDocPage = {
    title: 'Table',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        TableDemoComponent,
    },
    route: {
        children: [
            {
                path: 'table-demo',
                component: TableDemoComponent,
            },
        ],
    },
};

export default TablePage;
