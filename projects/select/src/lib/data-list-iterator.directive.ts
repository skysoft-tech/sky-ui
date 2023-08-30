import { Directive, NgIterable, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractSkyDataList, SkyDestroyService } from '@sky-ui/core';
import { filter, takeUntil } from 'rxjs';

@Directive({
    selector: '[skyDataListIterator]',
    providers: [SkyDestroyService],
})
export class SkyDataListIteratorDirective<T, U extends NgIterable<T> = NgIterable<T>> implements OnInit {
    constructor(
        private template: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        @Optional() public dataList: AbstractSkyDataList<T>,
        private destroy: SkyDestroyService
    ) {}

    ngOnInit(): void {
        this.dataList.optionsChange
            .pipe(
                takeUntil(this.destroy),
                filter(options => options !== null)
            )
            .subscribe(options => {
                this.rerenderView(options!);
            });

        if (this.dataList.filteredOptions !== null) {
            this.rerenderView(this.dataList.filteredOptions);
        }
    }

    private rerenderView(options: T[]) {
        this.viewContainer.clear();

        options?.forEach((option, index) => {
            this.viewContainer.createEmbeddedView(this.template, {
                $implicit: option,
                index,
            });
        });
    }
}
