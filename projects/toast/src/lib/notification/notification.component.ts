import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from '@angular/core';
import { SkyToastRef, TOAST_DATA, TOAST_REF } from '../toast.model';
import { Message } from './message';
import { SkyDestroyService } from '@sky-ui/core';

@Component({
    selector: 'sky-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    providers: [SkyDestroyService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sky-notification',
    },
})
export class SkyNotificationComponent {
    @HostBinding('class')
    get type(): string {
        return `sky-${this.data.type}-notification`;
    }

    constructor(
        @Inject(TOAST_REF) private toastRef: SkyToastRef<SkyNotificationComponent>,
        @Inject(TOAST_DATA) public data: Message
    ) {}

    close(): void {
        this.toastRef.close();
    }
}
