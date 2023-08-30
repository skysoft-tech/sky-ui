import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    Optional,
    Self,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import {
    AbstractInputAccessor,
    AbstractSkyControl,
    ErrorStateMatcher,
    Hex,
    SkyInputNameController,
} from '@sky-ui/core';
import { SkyPrimitiveInputComponent } from '@sky-ui/primitive-input';

@Component({
    selector: 'sky-color-input',
    templateUrl: './color-input.component.html',
    styleUrls: ['./color-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        SkyInputNameController,
        {
            provide: AbstractSkyControl,
            useExisting: SkyColorInputComponent,
        },
    ],
    host: {
        class: 'sky-color-input',
    },
})
export class SkyColorInputComponent extends AbstractSkyControl<Hex> implements AfterViewInit {
    @Input()
    inline: boolean = false;

    @ViewChild(AbstractInputAccessor)
    control?: AbstractInputAccessor<SkyColorInputComponent>;

    @ViewChild(SkyPrimitiveInputComponent)
    colorInput: SkyPrimitiveInputComponent | null = null;

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

    // override onValueChange(color: Hex | null): void {
    //     super.onValueChange(color);
    //     this.close();
    // }

    toggle(): void {
        this.isOverlayOpened ? this.close() : this.open();
    }

    open(): void {
        this.isOverlayOpened = true;
    }

    close(): void {
        this.isOverlayOpened = false;
        this.colorInput?.blur();
    }

    clickOutsideOverlay(event: Event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }
}
