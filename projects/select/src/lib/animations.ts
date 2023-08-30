import {
    animate,
    animateChild,
    AnimationTriggerMetadata,
    query,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const skySelectAnimations: {
    readonly transformPanelWrap: AnimationTriggerMetadata;
    readonly transformPanel: AnimationTriggerMetadata;
} = {
    transformPanelWrap: trigger('transformPanelWrap', [
        transition('* => void', query('@transformPanel', [animateChild()], { optional: true })),
    ]),

    transformPanel: trigger('transformPanel', [
        state(
            'void',
            style({
                transform: 'scaleY(0.8)',
                minWidth: '100%',
                opacity: 0,
            })
        ),
        state('show', style({ opacity: 1, transform: 'scaleY(1)' })),
        transition('void => *', animate('200ms cubic-bezier(0, 0, 0.2, 1)')),
        transition('* => void', animate('200ms 25ms linear', style({ opacity: 0 }))),
    ]),
};
