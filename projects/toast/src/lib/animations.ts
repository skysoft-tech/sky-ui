import { animate, style, transition, trigger } from '@angular/animations';

const TRANSITION = `{{duration}}ms ease-in-out`;
const DURATION = { params: { duration: 300 } };

export const skyFadeIn = trigger(`skyFadeIn`, [
    transition(`* => vissible`, [style({ opacity: 0 }), animate(TRANSITION, style({ opacity: 1 }))], DURATION),
    transition(`* => hidden`, [style({ opacity: 1 }), animate(TRANSITION, style({ opacity: 0 }))], DURATION),
]);

export const skySlideInRight = trigger(`skySlideInRight`, [
    transition(
        `* => vissible`,
        [style({ transform: `translateX(100%)` }), animate(TRANSITION, style({ transform: `translateX(0)` }))],
        DURATION
    ),
    transition(
        `* => hidden`,
        [style({ transform: `translateX(0)` }), animate(TRANSITION, style({ transform: `translateX(100%)` }))],
        DURATION
    ),
]);

export const skyHeightCollapse = trigger(`skyHeightCollapse`, [
    transition(`* => vissible`, [style({ height: 0 }), animate(TRANSITION, style({ height: `*` }))], DURATION),
    transition(`* => hidden`, [style({ height: `*` }), animate(TRANSITION, style({ height: 0 }))], DURATION),
]);
