import { Injectable, NgZone } from '@angular/core';
import { filter, interval, map, Observable, pairwise } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AutofillExtentionService {
    constructor(private ngZone: NgZone) {}

    observeExtentionValue(elem: any) {
        return this.ngZone.runOutsideAngular<Observable<string>>(() => {
            return interval(200).pipe(
                map(_ => elem.value),
                pairwise(),
                filter(([prev, current]) => prev !== current),
                map(([_, current]) => current)
            );
        });
    }
}
