import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Data } from '@angular/router';
import { BehaviorSubject, filter, distinctUntilChanged } from 'rxjs';
import { SkyBreadcrumbData } from './breadcrumb.models';

@Injectable()
export class SkyBreadcrumbTracker {
    private _breadcrumbs = new BehaviorSubject<SkyBreadcrumbData[]>([]);
    readonly breadcrumbs = this._breadcrumbs.asObservable();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.addRouteData(this.activatedRoute.root);
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this.addRouteData(this.activatedRoute.root);
            });
    }

    private addRouteData(route: ActivatedRoute, parentUrl: string = '', breadcrumbs: SkyBreadcrumbData[] = []) {
        if (!route) {
            return;
        }

        const path = route.routeConfig ? route.routeConfig.path : '';
        const url = `${parentUrl}/${path}`;
        const label = this.getLabel(route.snapshot.data);

        if (route.routeConfig?.data) {
            breadcrumbs.push({ label, url });
        }

        if (route.firstChild) {
            this.addRouteData(route.firstChild, url, breadcrumbs);
            return;
        }

        this._breadcrumbs.next(breadcrumbs);
    }

    private getLabel(data: Data) {
        return this.isFunction(data['breadcrumb']) ? data['breadcrumb'](data) : data['breadcrumb'];
    }

    private isFunction(value: unknown): boolean {
        return typeof value === 'function';
    }
}
