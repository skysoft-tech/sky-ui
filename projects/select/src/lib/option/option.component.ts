/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Component, forwardRef } from '@angular/core';
import { AbstractSkyDataItem } from '@sky-ui/core';

@Component({
    selector: 'sky-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    providers: [{ provide: AbstractSkyDataItem, useExisting: forwardRef(() => SkyOptionComponent) }],
    host: {
        class: 'sky-option',
        '[class.selected]': 'selected',
        '[class.active]': 'isActive',
        '(click)': 'onClick()',
        '[attr.selected]': 'selected',
    },
})
export class SkyOptionComponent<T> extends AbstractSkyDataItem<T> {}
