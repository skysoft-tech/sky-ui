import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { SkyDestroyService, SkyMouseTracker, SkyPosition } from '@sky-ui/core';
import { takeUntil } from 'rxjs';

@Directive({
    selector: '[skyCircleTracker]',
    providers: [SkyDestroyService],
})
export class SkyCircleTrackerDirective extends SkyMouseTracker {
    @Input()
    ringwidth: number = 0;

    @Output()
    angleChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        elementRef: ElementRef<HTMLElement>,
        @Inject(DOCUMENT) documentRef: Document,
        destroy: SkyDestroyService
    ) {
        super(elementRef, documentRef, destroy);

        this.trackEvent.pipe(takeUntil(destroy)).subscribe(({ x, y }: SkyPosition) => {
            let angle = Math.atan2(y, x) * (180 / Math.PI);
            if (angle < 0) {
                angle += 360;
            }

            this.angleChange.emit(angle);
        });
    }

    protected override getPosition(x: number, y: number, { left, top, width, height }: DOMRect): SkyPosition {
        return {
            x: x - left - width / 2,
            y: y - top - height / 2,
        };
    }

    protected override shouldTrack(event: MouseEvent, { left, top, width, height }: DOMRect): boolean {
        const radius = width / 2;
        const circleCenter: SkyPosition = { x: width / 2, y: height / 2 };
        const { clientX, clientY } = event;
        const position = super.getPosition(clientX, clientY, { left, top, width, height } as DOMRect);
        const distance = Math.sqrt(Math.pow(position.x - circleCenter.x, 2) + Math.pow(position.y - circleCenter.y, 2));
        const inCircle = distance < radius;
        const inRing = distance > radius - this.ringwidth;

        return this.ringwidth > 0 ? inCircle && inRing : inCircle;
    }
}
