import { Component, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { SkyBreadcrumbData, SkyBreadcrumbInput } from './breadcrumb.models';
import { Subscription, isObservable, takeUntil } from 'rxjs';
import { SkyDestroyService } from '@sky-ui/core';
import { SkyBreadcrumbTracker } from './breadcrumb-tracker-service';

@Component({
    selector: 'sky-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    providers: [SkyDestroyService],
    host: {
        class: 'sky-breadcrumb',
    },
})
export class SkyBreadcrumbComponent implements OnInit, OnChanges {
    private subscription: Subscription | null = null;

    breadcrumbsToRender: SkyBreadcrumbData[] = [];

    @Input()
    breadcrumbs: SkyBreadcrumbInput | null = null;
    constructor(private destroy: SkyDestroyService, @Optional() tracker: SkyBreadcrumbTracker) {
        tracker?.breadcrumbs.pipe(takeUntil(destroy)).subscribe(b => (this.breadcrumbsToRender = b));
    }

    ngOnInit(): void {
        this.update();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['breadcrumbs']) {
            this.update();
        }
    }

    private update(): void {
        this.subscription?.unsubscribe();
        this.subscription = null;

        if (!isObservable(this.breadcrumbs)) {
            this.breadcrumbsToRender = (this.breadcrumbs as SkyBreadcrumbData[]) ?? [];

            return;
        }

        this.subscription = this.breadcrumbs
            .pipe(takeUntil(this.destroy))
            .subscribe(b => (this.breadcrumbsToRender = b));
    }
}
