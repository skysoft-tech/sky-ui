/* eslint-disable @angular-eslint/no-output-rename */
import { CdkTable } from '@angular/cdk/table';
import { Directive, OnChanges, OnDestroy, SimpleChanges, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { ISort, SkySortableHeader } from './sort-header.component';
import { BaseDisabled, CanDisable, SkyDestroyService, Sort, SortDirection } from '@sky-ui/core';

export interface SkySortable {
    stateChanges: EventEmitter<void>;
    sortChange: EventEmitter<Sort>;
}

@Directive({
    selector: '[skySort]',
    exportAs: 'skySort',
    host: { class: 'sky-sort' },
    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
    inputs: ['disabled: skySortDisabled'],
    providers: [SkyDestroyService],
})
export class SkySortDirective extends BaseDisabled implements CanDisable, SkySortable, OnInit, OnChanges, OnDestroy {
    private get _sortDirectionCycle(): SortDirection[] {
        if (this.start === 'asc') {
            return ['asc', 'desc', ''];
        }

        return ['desc', 'asc', ''];
    }
    public readonly stateChanges: EventEmitter<void> = new EventEmitter();

    @Input('skySortActive') active?: string;
    @Input('skySortStart') start: SortDirection = 'asc';

    private _direction: SortDirection = '';
    @Input('skySortDirection')
    set direction(value: SortDirection) {
        this._direction = value;
    }
    get direction(): SortDirection {
        return this._direction;
    }

    @Output('skySortChange') sortChange: EventEmitter<Sort> = new EventEmitter();

    constructor(private table: CdkTable<unknown>, private destroyService: SkyDestroyService) {
        super();
    }

    ngOnInit(): void {
        (this.table.dataSource as unknown as ISort)
            ?.getSortConfig()
            .pipe(filter(c => !!c))
            .pipe(filter(v => v.active !== this.active || v.direction !== this.direction))
            .pipe(takeUntil(this.destroyService))
            .subscribe(config => {
                this.sort({ id: config.active, start: config.direction });
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.stateChanges.next();
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }

    public sort(sortable: SkySortableHeader): void {
        if (this.active !== sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
            this.sortChange.emit({ active: this.active!, direction: this.direction });
        } else {
            this.direction = this._getNextSortDirection();
        }
        (this.table.dataSource as unknown as ISort).setSort({
            active: this.active,
            direction: this.direction,
        });
        this.sortChange.emit({ active: this.active!, direction: this.direction });
    }

    private _getNextSortDirection(): SortDirection {
        const curentIndex = this._sortDirectionCycle.indexOf(this.direction);
        let nextIndex = curentIndex + 1;

        if (nextIndex > this._sortDirectionCycle.length - 1) {
            nextIndex = nextIndex % this._sortDirectionCycle.length;
        }

        return this._sortDirectionCycle[nextIndex];
    }
}
