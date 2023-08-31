/* eslint-disable @angular-eslint/no-host-metadata-property */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

export interface ContentMagings {
    left: number | null;
    right: number | null;
}

@Component({
    selector: 'sky-drawer-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-drawer-content',
        '[style.margin-left.px]': 'contentMargins.left',
        '[style.margin-right.px]': 'contentMargins.right',
    },
})
export class SkyDrawerContentComponent {
    readonly contentMargins: ContentMagings = { left: null, right: null };

    constructor(private cdr: ChangeDetectorRef) {}

    public setContentMargings(margings: ContentMagings) {
        this.contentMargins.left = margings.left;
        this.contentMargins.right = margings.right;
        this.cdr.markForCheck();
    }
}
