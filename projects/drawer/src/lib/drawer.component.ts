/* eslint-disable @angular-eslint/no-host-metadata-property */

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { ModalHostContainer } from '@sky-ui/core';
import { drawerAnimation } from './animation';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type SkyDrawerMode = 'push' | 'over';
export type SkyDrawerState = 'open' | 'close';
export type SkyDrawerSide = 'left' | 'right';

export interface SkyDrawerConfig {
    side?: SkyDrawerSide;
    mode?: SkyDrawerMode;
    hasBackdrop?: boolean;
}

@Component({
    selector: 'sky-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'sky-drawer',
        '[attr.side]': 'side',
        '[@transform]': 'state',
        '(@transform.done)': 'animationEnd.emit()',
    },
    animations: [drawerAnimation],
})
export class SkyDrawerComponent implements ModalHostContainer<SkyDrawerConfig> {
    @Input() mode: SkyDrawerMode = 'push';
    @Input() side: SkyDrawerSide = 'left';
    @Input() hasBackdrop: boolean | null = true;

    get showBackdrop(): boolean {
        return this.opened && !!this.hasBackdrop;
    }

    private _opened: boolean = false;
    @Input()
    get opened(): boolean {
        return this._opened;
    }
    set opened(value: boolean | null) {
        this._opened = coerceBooleanProperty(value);
        this.stateChanged.emit(this.state);
    }

    public get width(): number {
        return this._elementRef.nativeElement ? this._elementRef.nativeElement.offsetWidth || 0 : 0;
    }

    public get state(): SkyDrawerState {
        return this.opened ? 'open' : 'close';
    }

    @Output()
    stateChanged: EventEmitter<SkyDrawerState> = new EventEmitter();

    @Output()
    animationEnd: EventEmitter<void> = new EventEmitter();

    @Output()
    backdropClick: EventEmitter<SkyDrawerState> = new EventEmitter();

    constructor(private readonly _elementRef: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {}

    public toggle(): void {
        this.opened = !this.opened;
    }

    public open(options?: SkyDrawerConfig): void {
        this.mode = options?.mode || this.mode;
        this.side = options?.side || this.side;
        this.hasBackdrop = options?.hasBackdrop ?? this.hasBackdrop;
        this.cdr.detectChanges();
        this.opened = true;
    }

    public close(): void {
        this.opened = false;

        if (this.hasBackdrop) {
            this.backdropClick.emit(this.state);
        }
    }

    public update(): void {
        this.stateChanged.emit(this.state);
    }
}
