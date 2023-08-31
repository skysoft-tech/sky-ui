import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { EventEmitter, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { SkyToastRef, TOAST_DATA, TOAST_REF, SkyToastConfig } from './toast.model';
import { Message } from './notification/message';
import { SkyNotificationComponent } from './notification/notification.component';

export interface ToastWithConfiguration<Tcomponent = unknown> {
    configuration?: SkyToastConfig;
    portal: ComponentPortal<Tcomponent>;
    enableAutoclose: () => void;
    disableAutoclose: () => void;
}

@Injectable()
export class SkyToastService {
    private _openEvent: EventEmitter<ToastWithConfiguration> = new EventEmitter();
    private _closeEvent: EventEmitter<ComponentPortal<unknown>> = new EventEmitter();

    public openEvent: Observable<ToastWithConfiguration> = this._openEvent.asObservable();
    public closeEvent: Observable<ComponentPortal<unknown>> = this._closeEvent.asObservable();

    public showInfo(message: string, config?: Omit<SkyToastConfig, 'data'>): SkyToastRef<SkyNotificationComponent> {
        return this.show<SkyNotificationComponent, Message>(SkyNotificationComponent, {
            ...config,
            data: {
                text: message,
                type: 'info',
                title: 'Information',
            },
        });
    }

    public showSuccses(message: string, config?: Omit<SkyToastConfig, 'data'>): SkyToastRef<SkyNotificationComponent> {
        return this.show<SkyNotificationComponent, Message>(SkyNotificationComponent, {
            ...config,
            data: {
                text: message,
                type: 'success',
                title: 'Succses',
            },
        });
    }

    public showError(message: string, config?: Omit<SkyToastConfig, 'data'>): SkyToastRef<SkyNotificationComponent> {
        return this.show<SkyNotificationComponent, Message>(SkyNotificationComponent, {
            ...config,
            data: {
                text: message,
                type: 'error',
                title: 'Error',
            },
        });
    }

    public show<TComponent, TData>(component: ComponentType<TComponent>, configuration?: SkyToastConfig<TData>) {
        const toastRef: SkyToastRef<TComponent> = new SkyToastRef<TComponent>(
            () => this._close(portal),
            configuration?.duration
        );

        const injector = Injector.create({
            providers: [
                {
                    provide: TOAST_REF,
                    useValue: toastRef,
                },
                {
                    provide: TOAST_DATA,
                    useValue: configuration?.data,
                },
            ],
        });

        const portal = new ComponentPortal<TComponent>(component, null, injector);
        this._openEvent.emit({
            portal,
            configuration,
            enableAutoclose: () => toastRef.enableAutoClose(),
            disableAutoclose: () => toastRef.disableAutoClose(),
        });

        return toastRef;
    }

    private _close(portal: ComponentPortal<unknown>) {
        this._closeEvent.next(portal);
    }
}
