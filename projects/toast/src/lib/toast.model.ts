import { EventEmitter, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const TOAST_DATA = new InjectionToken('toast.data');
export const TOAST_REF = new InjectionToken<SkyToastRef<unknown>>('toast.ref');
export const TOAST_POSITION = new InjectionToken<SkyToastPosition>('toast.position');

/**
 * The position of toast.
 */
export type SkyToastPosition =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
    | 'left-center'
    | 'right-center';

/**
 * Configuration used when opening a toast.
 */
export interface SkyToastConfig<TData = unknown> {
    /**
     * Data that will be injected to the toast component.
     */
    data?: TData;

    /**
     * The length of time in milliseconds to wait before automatically dismissing the toast.
     * If `undefined` or `0` toast never will close automatically.
     */
    duration?: number;

    /**
     * Extra CSS classes to be added to the toast container.
     */
    panelClass?: string;
}

/**
 *
 */
export class SkyToastRef<TComponent, TResult = void> {
    private _durationTimeoutId?: number;

    private _afterOpened: EventEmitter<void> = new EventEmitter();
    private _afterClosed: EventEmitter<TResult | undefined> = new EventEmitter();

    /**
     * An observable that is notified when the toast is finished opening.
     */
    public afterOpened: Observable<void> = this._afterOpened.asObservable();

    /**
     * An observable that is notified when the toast is finished closing.
     */
    public afterClosed: Observable<TResult | undefined> = this._afterClosed.asObservable();

    /**
     *
     * @param _close callback that will be called when close is requested.
     * @param duration The length of time in milliseconds to wait before automatically dismissing the toast.
     * If `undefined` or `0` toast never will close automatically.
     */
    constructor(private _close: () => void, private _duration?: number) {
        this._setupAutoClose(_duration ?? 0);
    }

    /**
     * Close the toast
     * @param toastResult Optional result to return to the toast opener.
     */
    public close(toastResult?: TResult): void {
        this._close();

        this._afterClosed.emit(toastResult);
        clearTimeout(this._durationTimeoutId);
    }

    /**
     * Enable the toast autoclose,  witth duration specified in constructor.
     */
    public enableAutoClose(): void {
        this._setupAutoClose(this._duration ?? 0);
    }

    /**
     * Disable the toast autoclose.
     */
    public disableAutoClose(): void {
        clearTimeout(this._durationTimeoutId);
    }

    private _setupAutoClose(duration: number): void {
        if (duration > 0) {
            this._durationTimeoutId = setTimeout(() => this.close(), duration);
        }
    }
}
