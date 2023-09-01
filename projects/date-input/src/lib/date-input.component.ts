import { ConnectedPosition } from '@angular/cdk/overlay';
import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Optional,
    Self,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { AbstractInputAccessor, AbstractSkyControl, ErrorStateMatcher, SkyInputNameController } from '@sky-ui/core';
import { SkyCalendarSize, SkyCalendarSpecialDatesInput, SkyCalendarView, SkyDayMarker } from '@sky-ui/calendar';
import { SkyPrimitiveInputComponent } from '@sky-ui/primitive-input';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

@Component({
    selector: 'sky-date-picker',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [
        SkyInputNameController,
        {
            provide: AbstractSkyControl,
            useExisting: SkyDateInputComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyDateInputComponent extends AbstractSkyControl<Date> implements AfterViewInit {
    @Input()
    inline: boolean = false;

    @Input()
    monthViewOnly: boolean = false;

    @Input()
    size: SkyCalendarSize = 'medium';
    selectMonth: boolean = false;

    @Input()
    view: SkyCalendarView = 'months';

    @ViewChild(AbstractInputAccessor)
    control?: AbstractInputAccessor<SkyDateInputComponent>;

    @ViewChild(SkyPrimitiveInputComponent)
    dateInput: SkyPrimitiveInputComponent | null = null;

    @Input()
    specialDates: SkyCalendarSpecialDatesInput<Date> = null;

    @Input()
    markers: SkyDayMarker[] | null = null;

    @Output()
    selectDatePicker: EventEmitter<Date | null> = new EventEmitter<Date | null>();

    overlayPosition: ConnectedPosition[] = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: -15,
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: 23,
        },
    ];

    get overlayWidth(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }

    isOverlayOpened: boolean = false;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null,
        private nativeElement: ElementRef<HTMLElement>,
        private inputNameController: SkyInputNameController,
        private dateAdapter: SkyDateAdapter<Date>,
        private elementRef: ElementRef
    ) {
        super(changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);
    }

    ngAfterViewInit(): void {
        this.inputNameController.checkName(
            this.ngControl?.name,
            this.nativeElement,
            this.control?.nativeElementRef as ElementRef<HTMLInputElement>
        );
    }

    selectDate(date: Date | null): void {
        if (!this.dateAdapter.sameDate(this.value, date)) {
            this.value = date;
        }

        this.selectDatePicker.emit(date);

        this.close();
    }

    toggle(): void {
        this.isOverlayOpened ? this.close() : this.open();
    }

    open(): void {
        this.isOverlayOpened = true;
    }

    close(): void {
        this.isOverlayOpened = false;
        this.dateInput?.blur();
    }

    clickOutsideOverlay(event: Event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }
}
