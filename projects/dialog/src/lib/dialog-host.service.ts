import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SkyDialogHostService<T> {
    public backdropEvent: Subject<void> = new Subject();

    private _openCommand: Subject<T | undefined> = new Subject();
    public openCommand: Observable<T | undefined> = this._openCommand.asObservable();

    private _closeCommand: Subject<void> = new Subject();
    public closeCommand: Observable<void> = this._closeCommand.asObservable();

    private _container: HTMLElement | null = null;
    public get container(): HTMLElement | null {
        return this._container;
    }

    public provideContainer(container: HTMLElement): void {
        this._container = container;
    }

    public open(options?: T): void {
        this._openCommand.next(options);
    }

    public close(): void {
        this._closeCommand.next();
    }
}
