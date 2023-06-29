import { ComponentType } from '@angular/cdk/portal';
import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

export interface DynamicRenderComponent<T = unknown> {
    incomingValue: T;
}

@Directive({
    selector: '[skyComponentRenderer]',
})
export class SkyComponentRendererDirective<T extends DynamicRenderComponent<R>, R> implements OnInit {
    @Input('skyComponentRenderer')
    componentType?: ComponentType<T>;

    @Input()
    componentValue?: R;

    constructor(private readonly _viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {
        if (!this.componentType) {
            return;
        }

        const component = this._viewContainerRef.createComponent(this.componentType);

        if (this.componentValue) {
            component.instance.incomingValue = this.componentValue;
        }
    }
}
