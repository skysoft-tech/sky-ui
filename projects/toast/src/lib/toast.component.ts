import { ComponentPortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { takeUntil } from 'rxjs';
import { SkyDestroyService } from '@sky-ui/core';
import { ToastWithConfiguration, SkyToastService } from './toast.service';
import { SkyToastPosition, TOAST_POSITION } from './toast.model';
import { skyFadeIn, skyHeightCollapse, skySlideInRight } from './animations';

@Component({
    selector: 'sky-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    providers: [SkyDestroyService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [skyFadeIn, skySlideInRight, skyHeightCollapse],
    host: {
        class: 'sky-toast',
    },
})
export class SkyToastComponent implements OnDestroy {
    toasts: { data: ToastWithConfiguration; state: string }[] = [];

    @HostBinding('class')
    get positionClass(): string {
        return this.position
            .split('-')
            .map(p => `sky-toast-${p}`)
            .join(' ');
    }

    constructor(
        private cd: ChangeDetectorRef,
        private destroy: SkyDestroyService,
        private messageServise: SkyToastService,
        @Inject(TOAST_POSITION) private position: SkyToastPosition
    ) {
        this.messageServise.openEvent.pipe(takeUntil(this.destroy)).subscribe(params => this.handleOpen(params));
        this.messageServise.closeEvent.pipe(takeUntil(this.destroy)).subscribe(portal => this.handleClose(portal));
    }
    ngOnDestroy(): void {
        console.log('ngOnDestroy');
    }

    overToast(toast: ToastWithConfiguration): void {
        toast.disableAutoclose();
    }

    outToast(toast: ToastWithConfiguration): void {
        toast.enableAutoclose();
    }

    fadeInDone(event: AnimationEvent, toast: ToastWithConfiguration): void {
        if (event.toState !== 'hidden') {
            return;
        }

        toast.portal.detach();
        const index = this.toasts.findIndex(t => t.data.portal === toast.portal);
        this.toasts.splice(index, 1);
        this.cd.markForCheck();
    }

    private handleOpen(toast: ToastWithConfiguration): void {
        this.toasts.push({ data: toast, state: 'vissible' });
        this.cd.markForCheck();
    }

    private handleClose(portal: ComponentPortal<unknown>): void {
        const index = this.toasts.findIndex(toast => toast.data.portal === portal);
        this.toasts[index].state = 'hidden';
        this.cd.markForCheck();
    }
}
