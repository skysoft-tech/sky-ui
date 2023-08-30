import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    SkipSelf,
} from '@angular/core';
import { SkyDestroyService, SkyMouseTracker, SkyPosition, skyClamp } from '@sky-ui/core';

@Directive({
    selector: '[skyTriangleTracker]',
    providers: [SkyDestroyService],
})
export class SkyTriangleTrackerDirective extends SkyMouseTracker implements AfterViewInit, OnChanges {
    @Input()
    angle: number = 0;

    @Input()
    parentContainer!: HTMLElement;

    @Input()
    origin!: HTMLElement;

    @Input()
    initialPosition: SkyPosition = { x: 0, y: 0 };

    cursorPosition!: SkyPosition;

    @Output()
    valueChange: EventEmitter<SkyPosition> = new EventEmitter<SkyPosition>();

    constructor(
        @SkipSelf() private cdr: ChangeDetectorRef,
        private elementRef: ElementRef<HTMLElement>,
        @Inject(DOCUMENT) documentRef: Document,
        destroy: SkyDestroyService
    ) {
        super(elementRef, documentRef, destroy);
        this.trackEvent.subscribe((p: SkyPosition) => {
            const rect = this.origin.getBoundingClientRect();
            const position = super.getPosition(p.x, p.y, rect);
            this.cursorPosition = this.getCurrentPosition(position, rect);
            this.valueChange.emit({
                x: this.cursorPosition.x / rect.width,
                y: this.cursorPosition.y / rect.height,
            });
        });
    }

    ngAfterViewInit(): void {
        if (!this.origin) {
            this.origin = this.elementRef.nativeElement;
        }

        if (!this.parentContainer) {
            this.parentContainer = this.elementRef.nativeElement.parentElement!;
        }

        // const rect = this.origin.getBoundingClientRect();
        // const position = {
        //     x: rect.width * this.initialPosition.x,
        //     y: rect.height * (this.initialPosition.y === 1 ? 0.5 : this.initialPosition.y),
        // };

        // this.cursorPosition = this.getCurrentPosition(position, rect);
        // this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // TODO: fix initial position changing
        // if (changes['initialPosition']) {
        //     const rect = this.origin.getBoundingClientRect();
        //     const position = {
        //         x: rect.width * (1 / (this.initialPosition.x + this.initialPosition.y)) * this.initialPosition.x,
        //         y: rect.height * (1 / (this.initialPosition.x + this.initialPosition.y)) * this.initialPosition.y,
        //     };
        //     this.cursorPosition = this.getCurrentPosition(position, rect);
        // }
    }

    protected override getPosition(x: number, y: number, { left, top, width, height }: DOMRect): SkyPosition {
        const parentRect = this.parentContainer.getBoundingClientRect();
        const position = super.getPosition(x, y, parentRect);
        const rotatedPoint = this.rotate(-this.angle, position);
        rotatedPoint.x = rotatedPoint.x + parentRect.left;
        rotatedPoint.y = rotatedPoint.y + parentRect.top;

        return rotatedPoint;
    }

    private rotate(angle: number, position: SkyPosition): SkyPosition {
        const parentRect = this.parentContainer.getBoundingClientRect();
        const center = { x: parentRect.width / 2, y: parentRect.height / 2 };
        const radians = angle * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const normalX = center.x - position.x;
        const normalY = center.y - position.y;

        const newX = normalX * cos - normalY * sin;
        const newY = normalX * sin + normalY * cos;

        return { x: center.x - newX, y: center.y - newY };
    }

    private getCurrentPosition({ x, y }: SkyPosition, rect: DOMRect): SkyPosition {
        const a = y < rect.height / 2 ? y : rect.height - y;
        const xMax = Math.sqrt(Math.pow(a * 2, 2) - Math.pow(a, 2));
        x = skyClamp(x, 0, xMax);
        return { x, y };
    }
}
