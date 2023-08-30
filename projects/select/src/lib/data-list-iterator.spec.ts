import { EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AbstractSkyDataList } from '../core/data-list';
import { SkyDestroyService } from '../tools/destroy.service';

import { SkyDataListIteratorDirective } from './data-list-iterator.directive';

type TestObject = {};

describe('SkyNgForDirective', () => {
    const spyVcRef = jasmine.createSpyObj<ViewContainerRef>('ViewContainerRef', ['clear', 'createEmbeddedView']);

    let templateRef: TemplateRef<any>;

    let abstractDataList!: AbstractSkyDataList<any>;
    let viewContainer!: ViewContainerRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AbstractSkyDataList,
                    useValue: { optionsToRender: null as unknown } as Partial<AbstractSkyDataList<TestObject>>,
                },
                { provide: ViewContainerRef, useValue: spyVcRef },
            ],
        });

        abstractDataList = TestBed.inject(AbstractSkyDataList);
        viewContainer = TestBed.inject(ViewContainerRef);
    });

    afterEach(() => {
        spyVcRef.clear.calls.reset();
        spyVcRef.createEmbeddedView.calls.reset();
    });

    it('should create an instance', () => {
        const directive = new SkyDataListIteratorDirective(
            templateRef,
            viewContainer,
            abstractDataList,
            new SkyDestroyService()
        );
        expect(directive).toBeTruthy();
    });

    it('should call viewContainer methods if array of options not empty', () => {
        const optionsCng = new EventEmitter<TestObject[] | null>();
        abstractDataList.optionsChange = optionsCng;

        const direcive = new SkyDataListIteratorDirective(
            templateRef,
            viewContainer,
            abstractDataList,
            new SkyDestroyService()
        );

        direcive.ngOnInit();
        optionsCng.emit(['aaa']);

        expect(spyVcRef.clear).toHaveBeenCalled();
        expect(spyVcRef.createEmbeddedView).toHaveBeenCalled();
    });

    it('should not call createEmbeddedView() methods if value in array of options not correctly', () => {
        const optionsCng = new EventEmitter<TestObject[] | null>();
        abstractDataList.optionsChange = optionsCng;

        const direcive = new SkyDataListIteratorDirective(
            templateRef,
            viewContainer,
            abstractDataList,
            new SkyDestroyService()
        );

        direcive.ngOnInit();
        optionsCng.emit(undefined);

        expect(spyVcRef.clear).toHaveBeenCalled();
        expect(spyVcRef.createEmbeddedView).not.toHaveBeenCalled();
    });

    it('should not call createEmbeddedView() methods if  array of options is empty', () => {
        const optionsCng = new EventEmitter<TestObject[] | null>();
        abstractDataList.optionsChange = optionsCng;

        const direcive = new SkyDataListIteratorDirective(
            templateRef,
            viewContainer,
            abstractDataList,
            new SkyDestroyService()
        );

        direcive.ngOnInit();
        optionsCng.emit([]);

        expect(spyVcRef.clear).toHaveBeenCalled();
        expect(spyVcRef.createEmbeddedView).not.toHaveBeenCalled();
    });

    it('createEmbeddedView() methods should call the same times like option items', () => {
        const optionsCng = new EventEmitter<TestObject[] | null>();
        abstractDataList.optionsChange = optionsCng;

        const direcive = new SkyDataListIteratorDirective(
            templateRef,
            viewContainer,
            abstractDataList,
            new SkyDestroyService()
        );

        direcive.ngOnInit();
        optionsCng.emit(['option1', 'option2', 'option3']);

        expect(spyVcRef.clear).toHaveBeenCalled();
        expect(spyVcRef.createEmbeddedView).toHaveBeenCalledTimes(3);
    });

    it('components rerender after change options', () => {
        const optionsCng = new EventEmitter<TestObject[] | null>();
        abstractDataList.optionsChange = optionsCng;

        const direcive = new SkyDataListIteratorDirective(
            templateRef,
            viewContainer,
            abstractDataList,
            new SkyDestroyService()
        );

        direcive.ngOnInit();
        optionsCng.emit(['option1', 'option2', 'option3']);

        expect(spyVcRef.clear).toHaveBeenCalled();
        expect(spyVcRef.createEmbeddedView).toHaveBeenCalled();

        optionsCng.emit(['option1', 'option2', 'option3', 'option4', 'option5', 'option6']);

        expect(spyVcRef.clear).toHaveBeenCalled();
        expect(spyVcRef.createEmbeddedView).toHaveBeenCalled();
    });
});
