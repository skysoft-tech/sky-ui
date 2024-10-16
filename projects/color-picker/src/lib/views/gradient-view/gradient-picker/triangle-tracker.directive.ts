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
import { SkyDestroyService, SkyMouseTracker, SkyPosition } from '@sky-ui/core';

type Triangle = [SkyPosition, SkyPosition, SkyPosition];
type Vector = [number, number];

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
    value: [number, number] = [0, 0];

    @Output()
    valueChange: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

    cursorPosition!: SkyPosition;

    private originalTriangle!: Triangle;

    constructor(
        @SkipSelf() private cdr: ChangeDetectorRef,
        private elementRef: ElementRef<HTMLElement>,
        @Inject(DOCUMENT) documentRef: Document,
        destroy: SkyDestroyService
    ) {
        super(elementRef, documentRef, destroy);
        this.trackEvent.subscribe((p: SkyPosition) => {
            const [a, b, c] = this.originalTriangle;
            let point: SkyPosition | null = null;
            const inTriangle = this.isInTriangle(p, this.originalTriangle);

            if (inTriangle) {
                this.emitValueChange(p);
                return;
            }

            if (this.isInSector(p, c, a, b)) {
                point = this.getPointProjection(p, c, b);
            }

            if (this.isInSector(p, a, b, c)) {
                point = this.getPointProjection(p, a, c);
            }

            if (this.isInSector(p, b, c, a)) {
                point = this.getPointProjection(p, a, b);
            }

            if (point) {
                this.emitValueChange(point);
            }
        });
    }

    ngAfterViewInit(): void {
        if (!this.origin) {
            this.origin = this.elementRef.nativeElement;
        }

        if (!this.parentContainer) {
            this.parentContainer = this.elementRef.nativeElement.parentElement!;
        }

        const { width, height } = this.origin.getBoundingClientRect();
        const a = { x: 0, y: 0 };
        const b = { x: width, y: height / 2 };
        const c = { x: 0, y: height };
        this.originalTriangle = [a, b, c];

        const [s, v] = this.value;
        const saturation = s * height;
        const value = v * width;
        this.cursorPosition = this.getTrianglePosition(saturation, value);

        this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['value'] && !changes['value'].firstChange) {
            const { width, height } = this.origin.getBoundingClientRect();
            const [s, v] = this.value;
            const saturation = s * height;
            const value = v * width;
            this.cursorPosition = this.getTrianglePosition(saturation, value);
            this.cdr.detectChanges();
        }
    }

    protected override getPosition(x: number, y: number, _: DOMRect): SkyPosition {
        const { top, left } = this.origin.getBoundingClientRect();
        const { top: pTop, left: pLeft, width: pWidth, height: pHeight } = this.parentContainer.getBoundingClientRect();
        const origin = {
            x: pWidth / 2 + pLeft,
            y: pHeight / 2 + pTop,
        };

        const rotatedPoint = this.rotate({ x, y }, -this.angle, origin);

        return {
            x: rotatedPoint.x - left,
            y: rotatedPoint.y - top,
        };
    }

    protected override shouldTrack(event: MouseEvent, rect: DOMRect): boolean {
        const p = this.getPosition(event.clientX, event.clientY, rect);
        return this.isInTriangle(p, this.originalTriangle);
    }

    // https://blackpawn.com/texts/pointinpoly/default.html#:~:text=Barycentric%20Technique
    private isInTriangle(p: SkyPosition, [a, b, c]: Triangle): boolean {
        const v0 = this.calculateVector(c, a);
        const v1 = this.calculateVector(b, a);
        const v2 = this.calculateVector(p, a);

        const dot00 = this.dotProduct(v0, v0);
        const dot01 = this.dotProduct(v0, v1);
        const dot02 = this.dotProduct(v0, v2);
        const dot11 = this.dotProduct(v1, v1);
        const dot12 = this.dotProduct(v1, v2);

        const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        return u >= 0 && v >= 0 && u + v < 1;
    }

    // https://stackoverflow.com/a/13675772
    private isInSector(p: SkyPosition, a: SkyPosition, b: SkyPosition, c: SkyPosition): boolean {
        const ba = this.calculateVector(b, a);
        const bc = this.calculateVector(b, c);
        const bp = this.calculateVector(b, p);

        return !this.areClockwise(bc, bp) && this.areClockwise(ba, bp);
    }

    private calculateVector(p1: SkyPosition, p2: SkyPosition): Vector {
        return [p2.x - p1.x, p2.y - p1.y];
    }

    private dotProduct([x1, y1]: Vector, [x2, y2]: Vector): number {
        return x1 * x2 + y1 * y2;
    }

    private areClockwise([x1, y1]: Vector, [x2, y2]: Vector): boolean {
        return -x1 * y2 + y1 * x2 > 0;
    }

    // http://www.sunshine2k.de/coding/java/PointOnLine/PointOnLine.html
    private getPointProjection(p: SkyPosition, a: SkyPosition, b: SkyPosition): SkyPosition | null {
        const ab = this.calculateVector(a, b);
        const ap = this.calculateVector(a, p);

        const area = this.dotProduct(ab, ab);
        const val = this.dotProduct(ab, ap);
        const len = ab[0] * ab[0] + ab[1] * ab[1];

        if (val < 0) {
            return a;
        }

        if (val > area) {
            return b;
        }

        return {
            x: a.x + (val * ab[0]) / len,
            y: a.y + (val * ab[1]) / len,
        };
    }

    private rotate(position: SkyPosition, angle: number, origin: SkyPosition): SkyPosition {
        const radians = angle * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const normalX = position.x - origin.x;
        const normalY = position.y - origin.y;

        const newX = normalX * cos - normalY * sin;
        const newY = normalX * sin + normalY * cos;

        return { x: newX + origin.x, y: newY + origin.y };
    }

    private getTrianglePosition(s: number, v: number): SkyPosition {
        const { height, width } = this.origin.getBoundingClientRect();
        const sqrt3 = Math.sqrt(3);

        const x = (s * v * height * sqrt3) / (2 * height * width);
        const y = (v * height * sqrt3 - x * width) / (width * sqrt3);

        return { x, y };
    }

    private getDataFromPosition({ x, y }: SkyPosition): [number, number] {
        const { height, width } = this.origin.getBoundingClientRect();
        const sqrt3 = Math.sqrt(3);

        const s = y + x / sqrt3 === 0 ? 0 : (x * 2 * height) / (y * sqrt3 + x);
        const v = ((y + x / sqrt3) * width) / height;

        return [s, v];
    }

    private emitValueChange(p: SkyPosition): void {
        const { height, width } = this.origin.getBoundingClientRect();
        const [saturation, value] = this.getDataFromPosition(p);

        const s = saturation / height;
        const v = value / width;

        this.valueChange.emit([s, v]);
    }
}
