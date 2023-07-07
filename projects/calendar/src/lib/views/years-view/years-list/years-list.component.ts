import { CdkScrollable } from '@angular/cdk/scrolling';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    AfterViewInit,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
    ViewChild,
    HostListener,
    NgZone,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SkyYearsViewComponent } from '../years-view.component';
import { SkyDestroyService } from '@sky-ui/core';
import { CalendarViewRangeService } from '../../../services/calendar-view-range.service';

@Component({
    selector: 'sky-years-list',
    templateUrl: './years-list.component.html',
    styleUrls: ['./years-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SkyDestroyService],
})
export class SkyYearsListComponent implements AfterViewInit, OnChanges {
    years: number[] = [];

    @Input()
    selectedYear!: number;

    @Input()
    calendarYear!: number;

    @Output()
    yearSelected: EventEmitter<number> = new EventEmitter();

    @ViewChild('scrollable') scrollable!: CdkScrollable;
    itemSize: number = 41.6;

    private hover: boolean = false;
    @HostListener('mouseenter')
    public mouseenterListener(): void {
        this.hover = true;
    }

    @HostListener('mouseleave')
    public mouseleaveListener(): void {
        this.hover = false;
    }

    constructor(
        private zone: NgZone,
        private destroy: SkyDestroyService,
        private dateRangeService: CalendarViewRangeService,
        private yearsViewComponent: SkyYearsViewComponent
    ) {
        this.years = this.generateYears();
    }

    ngAfterViewInit(): void {
        const index = this.years.indexOf(this.selectedYear);
        this.scrollToIndex(index);

        this.zone.runOutsideAngular(() => {
            this.yearsViewComponent.monthsScrolled
                .pipe(
                    takeUntil(this.destroy),
                    filter(() => !this.hover)
                )
                .subscribe((months: number) => {
                    this.scrollToIndex(months + 3);
                });

            this.scrollable
                .elementScrolled()
                .pipe(
                    takeUntil(this.destroy),
                    filter(_ => this.hover)
                )
                .subscribe(_ => {
                    const offset = this.scrollable.measureScrollOffset('top');
                    const yearsNumber = offset / this.itemSize;
                    this.yearsViewComponent.scrollYear(yearsNumber);
                });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedYear'] && !changes['selectedYear'].firstChange) {
            const index = this.years.indexOf(changes['selectedYear'].currentValue);
            this.scrollToIndex(index, 'smooth');
        }
    }

    selectYear(year: number, index: number): void {
        this.scrollToIndex(index, 'smooth');
        this.yearSelected.emit(year);
    }

    private scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
        const top =
            this.itemSize * index -
            this.scrollable.getElementRef().nativeElement.getBoundingClientRect().height / 2 +
            this.itemSize / 2;

        setTimeout(() => this.scrollable.scrollTo({ top, behavior }), 0);
    }

    private generateYears(): number[] {
        const years: number[] = [];
        for (let i = this.dateRangeService.startYear; i < this.dateRangeService.endYear; i++) {
            years.push(i);
        }

        years.push(...new Array(3));
        years.unshift(...new Array(3));

        return years;
    }
}
