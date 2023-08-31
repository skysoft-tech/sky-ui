import { InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const DIALOG_REF = new InjectionToken<DialogRef<unknown>>('dialog.ref');
export const DIALOG_DATA = new InjectionToken('dialog.data');

export interface ModalHostContainer<T> {
    open(options?: T): void;
    close(): void;
}

export interface IStylesConfig {
    width?: number;
    minWidth?: number;
    maxWidth?: number;

    height?: number;
    minHeight?: number;
    maxHeight?: number;
}

export interface IClassConfig {
    class?: string;
    mode?: string;
}

export interface IDrawerConfig {
    mode?: string;
}

export type ContainerConfig = IStylesConfig & IClassConfig & IDrawerConfig;

export interface DialogConfig<T = unknown, R = unknown> extends ContainerConfig {
    data?: T;
    containerOptions?: R;
}

export class DialogRef<T, R = void> {
    private dialogResult: R | undefined;

    private _afterOpened: Subject<void> = new Subject();
    private _afterClosed: Subject<R | undefined> = new Subject();
    private _backdropClick: Subject<R | undefined> = new Subject();

    public afterOpened: Observable<void> = this._afterOpened.asObservable();
    public afterClosed: Observable<R | undefined> = this._afterClosed.asObservable();
    public backdropClick: Observable<R | undefined> = this._backdropClick.asObservable();

    constructor(private closeDialogCallback: () => void) {}

    public close(dialogResult?: R): void {
        this.closeDialogCallback();

        this.dialogResult = dialogResult;
        this._afterClosed.next(this.dialogResult);
    }

    public open() {
        this._afterOpened.next();
    }

    public backdropClicked() {
        this._backdropClick.next(this.dialogResult);
    }
}
