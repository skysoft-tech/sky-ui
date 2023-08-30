import { Component, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractSkyDataList, SkyDestroyService } from '@sky-ui/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'sky-select-trigger',
    template: '<ng-content></ng-content>',
})
export class SkySelectTriggerComponent {}

@Directive({
    selector: '[skySelectValueAccessor]',
})
export class SkySelectValueAccessorDirective implements OnInit {
    constructor(
        private template: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        public dataList: AbstractSkyDataList<unknown>,
        private destroy: SkyDestroyService
    ) {}

    ngOnInit(): void {
        this.dataList.valueChange.pipe(takeUntil(this.destroy)).subscribe(value => {
            this.rerenderView(value);
        });

        this.rerenderView(this.dataList.value);
    }

    private rerenderView(value: unknown) {
        this.viewContainer.clear();

        this.viewContainer.createEmbeddedView(this.template, {
            $implicit: value,
        });
    }
}
