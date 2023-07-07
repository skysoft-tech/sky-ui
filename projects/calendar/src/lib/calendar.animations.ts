import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const viewTransitionAnimation = [
    trigger('changeViewAnimation', [
        transition('months => years', [
            group([
                query(':leave', [
                    style({ opacity: 1, transform: 'scale(1)' }),
                    animate('100ms', style({ opacity: 0, transform: 'scale(0.7)' })),
                ]),
                query(':enter', [
                    style({ opacity: 0, transform: 'scale(1.1)' }),
                    animate('100ms 80ms', style({ opacity: 1, transform: 'scale(1)' })),
                ]),
            ]),
        ]),
        transition('years => months', [
            group([
                query(':leave', [
                    style({ opacity: 1, transform: 'scale(0.7)' }),
                    animate('100ms', style({ opacity: 0, transform: 'scale(1.1)' })),
                ]),
                query(':enter', [
                    style({ opacity: 0, transform: 'scale(0.7)' }),
                    animate('100ms 80ms', style({ opacity: 1, transform: 'scale(1)' })),
                ]),
            ]),
        ]),
    ]),
];
