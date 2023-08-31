import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const drawerAnimation: AnimationTriggerMetadata = trigger('transform', [
    state(
        'open',
        style({
            transform: 'none',
            visibility: 'visible',
        })
    ),
    state(
        'close',
        style({
            'box-shadow': 'none',
            visibility: 'hidden',
        })
    ),
    transition('close <=> open', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
]);
