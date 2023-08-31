import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DoCheck,
    NgZone,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ContentMagings, SkyDrawerContentComponent } from '../content/content.component';
import { SkyDrawerComponent, SkyDrawerState } from '../drawer.component';
import { SkyDestroyService } from '@sky-ui/core';

@Component({
    selector: 'sky-drawer-container',
    templateUrl: './drawer-container.component.html',
    styleUrls: ['./drawer-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SkyDestroyService],
    host: {
        class: 'sky-drawer-container',
    },
})
export class SkyDrawerContainerComponent implements AfterViewInit, DoCheck {
    @ContentChild(SkyDrawerContentComponent) content?: SkyDrawerContentComponent;
    @ViewChild(SkyDrawerContentComponent) userContent?: SkyDrawerContentComponent;

    private drawerContent!: SkyDrawerContentComponent;

    @ContentChild(SkyDrawerComponent) drawer?: SkyDrawerComponent;

    backdropClick(event: Event) {
        this.drawer?.close();
        event.stopPropagation();
    }

    doCheckSubject: Subject<void> = new Subject();

    constructor(
        private readonly destroy: SkyDestroyService,
        private viewPortRuler: ViewportRuler,
        private cdr: ChangeDetectorRef,
        private zone: NgZone
    ) {}

    ngDoCheck(): void {
        this.zone.runOutsideAngular(() => this.doCheckSubject.next());
    }

    ngAfterViewInit(): void {
        this.drawerContent = this.content || this.userContent!;

        this.drawer?.stateChanged.pipe(takeUntil(this.destroy)).subscribe(state => {
            this.rerender(state);
            this.cdr.markForCheck();
        });

        this.zone.runOutsideAngular(() => {
            this.doCheckSubject
                .pipe(
                    debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
                    takeUntil(this.destroy)
                )
                .subscribe(() => this.drawer && this.rerender(this.drawer.state));
        });

        this.viewPortRuler
            .change()
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
                this.drawer && this.rerender(this.drawer.state);
            });
    }

    private rerender(state: SkyDrawerState): void {
        const margings: ContentMagings = { left: null, right: null };

        if (state === 'open' && this.drawer!.mode !== 'over') {
            margings[this.drawer!.side] = this.drawer!.width;
        }

        this.zone.run(() => this.drawerContent.setContentMargings(margings));
    }
}
