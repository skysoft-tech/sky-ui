import { NgDocPage } from '@ng-doc/core';
import GuidesCategory from '../ng-doc.category';
import { CodeInputDemoComponent } from './demos/code-input-demo/code-input-demo.component';

const CodeInputPage: NgDocPage = {
    title: 'Code Input',
    mdFile: './index.md',
    category: GuidesCategory,
    demos: {
        CodeInputDemoComponent,
    },
    route: {
        children: [
            {
                path: 'code-input-demo',
                component: CodeInputDemoComponent,
            },
        ],
    },
};

export default CodeInputPage;
