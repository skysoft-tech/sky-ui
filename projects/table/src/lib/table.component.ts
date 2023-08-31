/* eslint-disable @angular-eslint/no-host-metadata-property */

import {
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    IterableDiffers,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    SkipSelf,
    ViewEncapsulation,
} from '@angular/core';
import {
    CdkTable,
    CDK_TABLE,
    CDK_TABLE_TEMPLATE,
    RenderRow,
    RowContext,
    StickyPositioningListener,
    STICKY_POSITIONING_LISTENER,
    _CoalescedStyleScheduler,
    _COALESCED_STYLE_SCHEDULER,
} from '@angular/cdk/table';
import { _DisposeViewRepeaterStrategy, _ViewRepeater, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { SkyRowComponent } from './row';
import { map, takeUntil } from 'rxjs';
import { SkyDestroyService } from '@sky-ui/core';
import { SelectionService } from '@sky-ui/selection';

@Component({
    selector: 'sky-table, table[sky-table]',
    exportAs: 'skyTable',
    template: CDK_TABLE_TEMPLATE,
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        SkyDestroyService,
        { provide: CdkTable, useExisting: SkyTableComponent },
        { provide: CDK_TABLE, useExisting: SkyTableComponent },
        { provide: STICKY_POSITIONING_LISTENER, useValue: null },
        { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
    ],
    host: {
        class: 'sky-table',
        '[class.sky-table-fixed-layout]': 'fixedLayout',
    },
})
export class SkyTableComponent<T> extends CdkTable<T> implements AfterViewInit, OnDestroy {
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    protected override stickyCssClass = 'sky-table-sticky';

    /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
    protected override needsPositionStickyOnElement = true;

    @ContentChildren(SkyRowComponent) private rows?: QueryList<SkyRowComponent>;

    @Input()
    allowSelection: boolean = false;

    @Output()
    selectionChanged: EventEmitter<T[]> = new EventEmitter<T[]>();

    constructor(
        private destroy: SkyDestroyService,
        private selectionService: SelectionService,
        _differs: IterableDiffers,
        _changeDetectorRef: ChangeDetectorRef,
        _elementRef: ElementRef,
        @Attribute('role') role: string,
        @Optional() _dir: Directionality,
        @Inject(DOCUMENT) _document: Document,
        _platform: Platform,
        @Inject(_VIEW_REPEATER_STRATEGY)
        _viewRepeater: _ViewRepeater<T, RenderRow<T>, RowContext<T>>,
        @Inject(_COALESCED_STYLE_SCHEDULER)
        _coalescedStyleScheduler: _CoalescedStyleScheduler,
        _viewportRuler: ViewportRuler,
        @Optional()
        @SkipSelf()
        @Inject(STICKY_POSITIONING_LISTENER)
        _stickyPositioningListener: StickyPositioningListener,
        @Optional()
        _ngZone?: NgZone
    ) {
        super(
            _differs,
            _changeDetectorRef,
            _elementRef,
            role,
            _dir,
            _document,
            _platform,
            _viewRepeater,
            _coalescedStyleScheduler,
            _viewportRuler,
            _stickyPositioningListener,
            _ngZone
        );
    }

    ngAfterViewInit(): void {
        if (!this.allowSelection) {
            return;
        }

        this.rows?.changes
            .pipe(takeUntil(this.destroy))
            .subscribe((s: QueryList<SkyRowComponent>) => this.selectionService.watch(s.toArray()));

        this.selectionService.selectionChanged
            .pipe(
                takeUntil(this.destroy),
                map(selections =>
                    selections.map(s => {
                        const rowsArr = this.rows?.toArray();
                        const i = rowsArr!.indexOf(s as SkyRowComponent);
                        return this._data[i];
                    })
                )
            )
            .subscribe(selections => this.selectionChanged.next(selections));
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();

        this.selectionService.stopWatching();
    }
}
