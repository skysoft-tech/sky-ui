import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { Hex, SkyDestroyService, SkyMouseTracker, SkyPosition } from '@sky-ui/core';
import { Observable, tap, merge, of, map, BehaviorSubject } from 'rxjs';

export type SkyValuePickerMode = 'lineral' | 'flat';
export type SkyValuePickerOrientation = 'horizontal' | 'vertical';

interface SkySelectorPosition {
    x: string;
    y: string;
}

@Component({
    selector: 'sky-value-picker',
    templateUrl: './value-picker.component.html',
    styleUrls: ['./value-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SkyDestroyService],
    host: {
        class: 'sky-value-picker',
    },
})
export class SkyValuePickerComponent<T> extends SkyMouseTracker implements OnInit, OnChanges {
    @Input()
    mode: SkyValuePickerMode = 'lineral';

    @Input()
    @HostBinding('style.--pickerColor')
    pickerColor: Hex | 'transparent' = 'transparent';

    @Input()
    value: number | SkyPosition = 0;

    @Output()
    valueChanged: EventEmitter<T> = new EventEmitter<T>();

    selectorPosition!: Observable<SkySelectorPosition>;

    private get isFlat(): boolean {
        return this.mode === 'flat';
    }

    private positionChange: BehaviorSubject<SkyPosition> = new BehaviorSubject<SkyPosition>({ x: 0, y: 0 });

    constructor(private elementRef: ElementRef, @Inject(DOCUMENT) documentRef: Document, destroy: SkyDestroyService) {
        super(elementRef, documentRef, destroy);
    }

    ngOnInit(): void {
        const { width, height } = this.elementRef.nativeElement.getBoundingClientRect();
        this.positionChange.next(this.getInitialValue());
        const trackedEvent = this.trackEvent.pipe(
            map(e => ({ x: e.x / width, y: e.y / height })),
            tap(e => this.emitValueChanged(e))
        );

        this.selectorPosition = merge(this.positionChange, trackedEvent).pipe(
            map(p => this.position2selectorPosition(p))
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['value']) {
            this.positionChange.next(this.getInitialValue());
        }
    }

    private emitValueChanged(position: SkyPosition): void {
        let value: SkyPosition | number = position;

        if (!this.isFlat) {
            value = position.y;
        }

        this.valueChanged.emit(value as T);
    }

    private position2selectorPosition(position: SkyPosition): SkySelectorPosition {
        const selectorPosition = { x: `${position.x * 100}%`, y: `${position.y * 100}%` };

        if (!this.isFlat) {
            selectorPosition.x = '50%';
        }

        return selectorPosition;
    }

    private getInitialValue(): SkyPosition {
        if (this.isNumber(this.value)) {
            return { x: this.value, y: this.value };
        }

        return this.value;
    }

    private isNumber(value: unknown): value is number {
        return Number.isFinite(value);
    }
}
