import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    Optional,
    QueryList,
    Self,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ConnectedOverlayPositionChange, ConnectedPosition } from '@angular/cdk/overlay';
import { skySelectAnimations } from './animations';
import { takeUntil } from 'rxjs';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SkySelectTriggerComponent } from './sky-select-trigger.directive';
import {
    AbstractSkyControl,
    AbstractSkyDataItem,
    AbstractSkyDataList,
    ErrorStateMatcher,
    SkyDestroyService,
} from '@sky-ui/core';
import { SkyIconComponent } from '@sky-ui/icons';
import { SkyPrimitiveInputComponent } from '@sky-ui/primitive-input';

@Component({
    selector: 'sky-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        SkyDestroyService,
        {
            provide: AbstractSkyDataList,
            useExisting: SkySelectComponent,
        },
        {
            provide: AbstractSkyControl,
            useExisting: AbstractSkyDataList,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [skySelectAnimations.transformPanelWrap, skySelectAnimations.transformPanel],
    host: {
        class: 'sky-select',
    },
})
export class SkySelectComponent<T> extends AbstractSkyDataList<T> implements AfterViewInit {
    private keyManager!: ActiveDescendantKeyManager<AbstractSkyDataItem<T>>;

    private _multiple: boolean = false;

    isShowTrigger: boolean = true;

    @HostBinding('class.is-unavaileble-options')
    public get isUnavailableOptions() {
        return !this.options;
    }
    @Input()
    showErrors = true;

    @HostBinding('class.is-focused')
    public get isFocused() {
        return !this.isShowTrigger;
    }

    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(value: boolean) {
        this._multiple = this.coerceBooleanProperty(value);
    }

    @Input()
    placeholder: string = 'Select one';

    @Input()
    isOpen: boolean = false;

    @ContentChildren(AbstractSkyDataItem) skyOptions!: QueryList<AbstractSkyDataItem<T>>;
    @ContentChild(SkySelectTriggerComponent) customTrigger!: SkySelectTriggerComponent;

    @ViewChild(SkyPrimitiveInputComponent) searchInput!: SkyPrimitiveInputComponent;
    @ViewChild(SkyIconComponent) skyIcon!: SkyIconComponent;

    get showNothingFoundMessage(): boolean {
        return !!this.options?.length && !this.filteredOptions?.length;
    }

    get triggerValue(): string {
        if (this.value === null) {
            return '';
        }
        return this.valueAccessor(this.value);
    }

    transformOrigin: string = 'top';

    readonly positions: ConnectedPosition[] = [
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
            offsetY: 25,
        },
    ];

    get overlayWidth(): number {
        return this._elRef.nativeElement.offsetWidth;
    }

    @HostListener('document:click', ['$event'])
    clickOutsideComponent(event: Event) {
        if (!this._elRef.nativeElement.contains(event.target)) {
            this.showTrigger();
        } else {
            this.hideTrigger();
        }
    }

    @HostListener('keydown.space', ['$event'])
    handleKeydownSpace(e: Event) {
        const manager = this.keyManager;
        const isTyping = manager.isTyping();
        if (!this.isOpen && !isTyping) {
            this.openOverlay();
        } else if (!isTyping && manager.activeItem && this.isOpen) {
            e.preventDefault();
            manager.activeItem.onClick();
        }
    }

    @HostBinding('class.sky-combo-box')
    isSkyCombobox = true;

    @HostListener('keydown.arrowDown', ['$event'])
    @HostListener('keydown.arrowUp', ['$event'])
    handleKeydownArrow(event: KeyboardEvent) {
        this.keyManager.onKeydown(event);
    }

    @HostListener('keydown.enter')
    handleKeydownEnter() {
        if (this.keyManager.activeItem) {
            this.setSelectedItem(this.keyManager.activeItem.value);
        }
    }

    @HostListener('keydown.esc')
    @HostListener('document:keydown.tab')
    @HostListener('document:keydown.Shift.tab')
    handleFocusOutByKeypress() {
        this.closeOverlay();
        this.showTrigger();
    }

    @HostListener('focusin')
    focusin() {
        this.hideTrigger();
    }

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() ngControl: NgControl | null,
        @Optional() parentForm: NgForm | null,
        @Optional() parentFormGroup: FormGroupDirective | null,
        private _elRef: ElementRef,
        private destroy: SkyDestroyService
    ) {
        super(changeDetectorRef, defaultErrorStateMatcher, ngControl, parentForm, parentFormGroup);
    }

    ngAfterViewInit() {
        this.searchInput.valueChange.pipe(takeUntil(this.destroy)).subscribe(search => {
            this.filterValue = search;
            this.changeDetectorRef.markForCheck();
        });
        this.keyManager = new ActiveDescendantKeyManager<AbstractSkyDataItem<T>>(this.skyOptions).withWrap();
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();

            if (this.ngControl.disabled !== this.disabled) {
                this.disabled = !!this.ngControl.disabled;
            }
        }
    }

    clickOverlayOutside(event: Event) {
        const clickedInside = this._elRef.nativeElement.contains(event.target);

        if (clickedInside) {
            this.hideTrigger();
            return;
        }
        this.showTrigger();
        this.closeOverlay();

        const option = this.options?.find(el => this.valueAccessor(el) === this.value) ?? null;

        this.value = option;
        this.searchInput.value = option as any;
    }

    setTransformOrigin(event: ConnectedOverlayPositionChange) {
        this.transformOrigin = event.connectionPair.overlayY;
    }

    disabledClick(event: Event) {
        event.stopPropagation();
    }

    override setSelectedItem(item: T | null) {
        super.setSelectedItem(item);

        if (item) {
            this.searchInput.value = this.valueAccessor(item);
        }

        this.closeOverlay();
        this.hideTrigger();
    }

    toggle() {
        this.filteredOptions = this.options;
        if (this.isOpen) {
            this.closeOverlay();
        } else {
            this.openOverlay();
        }
        this.hideTrigger();
    }

    showTrigger(): void {
        this.isShowTrigger = true;
        this.searchInput.blur();
    }

    hideTrigger() {
        this.isShowTrigger = false;
        this.searchInput.focus();
    }

    closeOverlay() {
        this.isOpen = false;
    }

    openOverlay() {
        this.isOpen = true;
    }

    coerceBooleanProperty(value: any): boolean {
        return value != null && `${value}` !== 'false';
    }
}
