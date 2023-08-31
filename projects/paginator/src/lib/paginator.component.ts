import { OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IPagination, Pagination, skyClamp } from '@sky-ui/core';

export enum PageRenderType {
    None = 0,
    Page = 1,
    Dots = 2,
}

interface ItemToRendering<T> {
    value: T;
    type: PageRenderType;
}

const PAGES_TO_DISPLAY = 7;
const ITEMS_IN_RANGE = 3;
const DEFAULT_PAGE_SIZE = 10;

@Component({
    selector: 'sky-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sky-paginator',
    },
})
export class SkyPaginatorComponent implements OnInit {
    private _pageSize: number = DEFAULT_PAGE_SIZE;
    private _itemsNumber: number = 0;
    private _pageIndex: number = 0;

    @Input()
    set pageSize(value: number) {
        this._pageSize = skyClamp(value, 0, Number.MAX_VALUE);
        this.pageIndex = 0;
    }
    get pageSize(): number {
        return this._pageSize;
    }

    @Input()
    set itemsNumber(value: number) {
        this._itemsNumber = skyClamp(value, 0, Number.MAX_VALUE);
        this.pageIndex = 0;
    }
    get itemsNumber(): number {
        return this._itemsNumber;
    }

    @Input()
    set pageIndex(value: number) {
        let val = 0;
        if (this.numberOfPages > 0) {
            val = skyClamp(value, 0, this.numberOfPages - 1);
        }

        this._pageIndex = val;
    }
    get pageIndex(): number {
        return this._pageIndex;
    }

    @Input()
    dataSource?: IPagination;

    @Output()
    paginationChanged: EventEmitter<Pagination> = new EventEmitter<Pagination>();

    public get numberOfPages(): number {
        if (this.itemsNumber < this.pageSize) {
            return 1;
        }
        return Math.ceil(this.itemsNumber / this.pageSize);
    }

    public pageRenderType = PageRenderType;

    public itemsToRendering: ItemToRendering<number>[] = new Array(PAGES_TO_DISPLAY);

    constructor(private cdr: ChangeDetectorRef) {
        for (let i = 0; i < PAGES_TO_DISPLAY; i++) {
            if (!this.itemsToRendering[i]) {
                this.itemsToRendering[i] = { type: PageRenderType.None, value: i };
            }
        }
    }

    ngOnInit(): void {
        this.dataSource?.getPaginationConfig().subscribe(config => {
            this.pageSize = config.pageSize;
            this.itemsNumber = config.totalCount;
            this.pageIndex = config.currentPage;

            this.preparePagesToRendering();
            this.cdr.markForCheck();
        });
        this.preparePagesToRendering();
    }

    public selectPrevPage(): void {
        this.selectPage(this.pageIndex - 1);
    }

    public selectNextPage(): void {
        this.selectPage(this.pageIndex + 1);
    }

    public selectPage(page: number): void {
        this.pageIndex = page;
        this.onPageChange();
    }

    private onPageChange() {
        this.preparePagesToRendering();
        const pagination = { pageSize: this.pageSize, currentPage: this.pageIndex };
        this.paginationChanged.emit(pagination);
        this.dataSource?.setPagination(pagination);
    }

    private preparePagesToRendering(): void {
        const dotsOffset = 2;
        const [startIndex, endIndex] = this.getSelectionRange();
        const [enoughOnStart, enoughOnEnd] = this.checkAvailableSpace(startIndex, endIndex);

        if (enoughOnStart && !enoughOnEnd) {
            for (let i = 0; i < PAGES_TO_DISPLAY - dotsOffset; i++) {
                this.setPageValue(i, i);
            }
        }

        if (!enoughOnStart && enoughOnEnd) {
            for (let i = dotsOffset; i < PAGES_TO_DISPLAY; i++) {
                this.setPageValue(i, this.numberOfPages - PAGES_TO_DISPLAY + i);
            }
        }

        if (!enoughOnStart && !enoughOnEnd) {
            for (let i = dotsOffset; i < PAGES_TO_DISPLAY - dotsOffset; i++) {
                this.setPageValue(i, startIndex + i - dotsOffset);
            }
        }

        if (enoughOnStart && enoughOnEnd) {
            for (let i = 0; i < PAGES_TO_DISPLAY; i++) {
                if (i < this.numberOfPages) {
                    this.setPageValue(i, i);
                } else {
                    this.hidePage(i);
                }
            }
        }

        const offset = ITEMS_IN_RANGE - 1;

        if (!enoughOnEnd) {
            this.setDotsValue(PAGES_TO_DISPLAY - dotsOffset, endIndex + offset);
            this.setPageValue(PAGES_TO_DISPLAY - 1, this.numberOfPages - 1);
        }

        if (!enoughOnStart) {
            this.setDotsValue(dotsOffset - 1, startIndex - offset);
            this.setPageValue(0, 0);
        }
    }

    private getSelectionRange(): Readonly<[number, number]> {
        const pagesAroundSelected = Math.floor(ITEMS_IN_RANGE / 2);
        const start = Math.max(this.pageIndex - pagesAroundSelected, 0);
        const end = Math.min(this.pageIndex + pagesAroundSelected, this.numberOfPages);

        return [start, end];
    }

    private checkAvailableSpace(startIndex: number, endIndex: number): Readonly<[boolean, boolean]> {
        if (this.numberOfPages <= PAGES_TO_DISPLAY) {
            return [true, true];
        }

        const isEnoughSpaceBeforeRange = PAGES_TO_DISPLAY - 2 - endIndex > 0;
        const correctedStart = isEnoughSpaceBeforeRange ? 0 : startIndex;
        const pagesToEnd = this.numberOfPages - 1 - correctedStart;
        const isEnoughSpaceAfterRange = PAGES_TO_DISPLAY - 2 - pagesToEnd > 0;
        return [isEnoughSpaceBeforeRange, isEnoughSpaceAfterRange];
    }

    private setPageValue(viewIndex: number, value: number) {
        const item = this.itemsToRendering[viewIndex];
        item.type = PageRenderType.Page;
        item.value = value;
    }

    private setDotsValue(viewIndex: number, value: number) {
        const item = this.itemsToRendering[viewIndex];
        item.type = PageRenderType.Dots;
        item.value = value;
    }

    private hidePage(viewIndex: number) {
        this.itemsToRendering[viewIndex].type = PageRenderType.None;
    }
}
