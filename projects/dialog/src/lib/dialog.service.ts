import { ComponentPortal, ComponentType, DomPortalOutlet } from '@angular/cdk/portal';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    Injectable,
    Injector,
    Renderer2,
    RendererFactory2,
} from '@angular/core';

import { SkyDialogHostService } from './dialog-host.service';
import { ContainerConfig, DialogConfig, DialogRef, DIALOG_DATA, DIALOG_REF } from './dialog.models';

@Injectable()
export class SkyDialogService {
    private host!: DomPortalOutlet;
    private renderer: Renderer2;

    constructor(
        private injector: Injector,
        private appRef: ApplicationRef,
        private cfr: ComponentFactoryResolver,
        private skyDialogHostService: SkyDialogHostService<unknown>,
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public open<TComponent, TContainerOptions, TData = void, TResult = void>(
        component: ComponentType<TComponent>,
        config?: DialogConfig<TData, TContainerOptions>
    ): DialogRef<TComponent, TResult> {
        const dialogRef = new DialogRef<TComponent, TResult>(() => this._close());

        const injector = this.createInjector(config!, dialogRef);

        if (!this.host) {
            this.createDomPortalOutlet();
        }

        this.host.detach();

        this.applyConfigToContainer(this.skyDialogHostService.container!, config);
        const portal = new ComponentPortal<TComponent>(component, null, injector);
        this.host.attach(portal);
        setTimeout(() => {
            dialogRef.open();
            this.skyDialogHostService.open(config?.containerOptions);
        });

        this.skyDialogHostService.backdropEvent.subscribe(_ => dialogRef.backdropClicked());

        return dialogRef;
    }

    private _close(): void {
        this.host.detach();
        this.skyDialogHostService.close();
    }

    createInjector(config: DialogConfig, dialogRef: any) {
        return Injector.create({
            providers: [
                {
                    provide: DIALOG_REF,
                    useValue: dialogRef,
                },
                {
                    provide: DIALOG_DATA,
                    useValue: config?.data,
                },
            ],
        });
    }

    createDomPortalOutlet() {
        if (!this.skyDialogHostService.container) {
            throw new Error('Container is not provided. Please use `SkyDialogHostService` to provide container.');
        }
        this.host = new DomPortalOutlet(this.skyDialogHostService.container, this.cfr, this.appRef, this.injector);
    }

    private applyConfigToContainer(container: HTMLElement, config?: ContainerConfig): void {
        if (!config) {
            return;
        }

        Object.keys(config).forEach((key: string) => {
            const value = this.coerceCssPixelValue((config as any)[key]);

            if (key === 'class') {
                this.renderer.addClass(container, value);
                return;
            }
            this.renderer.setStyle(container, key, value);
        });
    }

    private coerceCssPixelValue(value: any): string {
        if (value == null) {
            return '';
        }

        return typeof value === 'string' ? value : `${value}px`;
    }
}
