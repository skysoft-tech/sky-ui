/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/no-host-metadata-property */

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit,
    Optional,
    ViewEncapsulation,
} from '@angular/core';
import { merge, Observable, takeUntil } from 'rxjs';
import { SkySortDirective } from './sort.directive';
import { BaseDisabled, CanDisable, SkyDestroyService, Sort, SortDirection } from '@sky-ui/core';
import { SkySortHeaderColumnDef } from '@sky-ui/table';

interface MatSortHeaderColumnDef {
    name: string;
}

export interface SkySortableHeader {
    id: string;
    start?: SortDirection;
}

export interface SortConfig {
    active: string;
    direction: SortDirection;
}

export interface ISort {
    getSortConfig(): Observable<SortConfig>;
    setSort(sort: Sort): Observable<void>;
}

@Component({
    selector: 'sky-sort-header, [sky-sort-header]',
    exportAs: 'skySortHeader',
    templateUrl: 'sort-header.component.html',
    styleUrls: ['sort-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sky-sort-header',
        '(click)': 'handleClick($event)',
        '(keydown.space)': 'handleSpaceEvent($event)',
        '[attr.tabindex]': 'isSortingDisabled ? null : 0',
    },
    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
    inputs: ['disabled'],
    providers: [SkyDestroyService],
})
export class SkySortHeaderComponent extends BaseDisabled implements CanDisable, SkySortableHeader, OnInit {
    public sortDirection: SortDirection = '';

    public get isSortingDisabled(): boolean {
        return this._skySort.disabled && this.disabled;
    }

    public get isSorted(): boolean {
        return (
            this._skySort.active === this.id &&
            (this._skySort.direction === 'asc' || this._skySort.direction === 'desc')
        );
    }

    @Input('sky-sort-header') id!: string;
    @Input('skyStartDirection') start?: SortDirection;

    constructor(
        private readonly _skySort: SkySortDirective,
        @Inject(SkySortHeaderColumnDef)
        @Optional()
        private readonly _columnDef: MatSortHeaderColumnDef,
        private readonly _destroyService: SkyDestroyService,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {
        super();

        this._handleStateChange();
    }

    ngOnInit(): void {
        if (!this.id && this._columnDef) {
            this.id = this._columnDef.name;
        }
        this._updateDirection();
    }

    public handleClick(event: Event): void {
        this._sort();
    }

    public handleSpaceEvent(event: KeyboardEvent): void {
        this._sort();
    }

    private _sort(): void {
        if (!this.isSortingDisabled) {
            this._skySort.sort(this);
        }
    }

    private _handleStateChange(): void {
        merge(this._skySort.sortChange, this._skySort.stateChanges)
            .pipe(takeUntil(this._destroyService))
            .subscribe(e => {
                this._updateDirection();
                this._changeDetectorRef.markForCheck();
            });
    }

    private _updateDirection() {
        this.sortDirection = this.isSorted ? this._skySort.direction : '';
    }
}
