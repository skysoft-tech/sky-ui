import { ElementRef } from '@angular/core';
import { skyClamp } from './tools';
import { SkyDestroyService } from './tools';
import { Observable, filter, fromEvent, map, merge, of, switchMap, takeUntil, tap } from 'rxjs';

export interface SkyPosition {
    x: number;
    y: number;
}

export abstract class SkyMouseTracker {
    protected trackEvent: Observable<SkyPosition>;

    protected constructor(element: ElementRef<any>, documentRef: Document, destroy: SkyDestroyService) {
        this.trackEvent = fromEvent<MouseEvent>(element.nativeElement, 'mousedown').pipe(
            takeUntil(destroy),
            filter(e => this.shouldTrack(e, element.nativeElement.getBoundingClientRect())),
            tap(e => e.preventDefault),
            switchMap(({ clientX, clientY }: MouseEvent) => {
                const mouveEvent = fromEvent<MouseEvent>(documentRef, `mousemove`).pipe(
                    takeUntil(fromEvent(documentRef, 'mouseup')),
                    map(({ clientX, clientY }: MouseEvent) => {
                        const rect: DOMRect = element.nativeElement.getBoundingClientRect();
                        return this.getPosition(clientX, clientY, rect);
                    })
                );

                const rect: DOMRect = element.nativeElement.getBoundingClientRect();
                const currentPosition = this.getPosition(clientX, clientY, rect);

                return merge(of(currentPosition), mouveEvent);
            })
        );
    }

    protected getPosition(x: number, y: number, { left, top, width, height }: DOMRect): SkyPosition {
        return {
            x: skyClamp(x - left, 0, width),
            y: skyClamp(y - top, 0, height),
        };
    }

    protected shouldTrack(event: MouseEvent, { left, top, width, height }: DOMRect): boolean {
        return true;
    }
}
