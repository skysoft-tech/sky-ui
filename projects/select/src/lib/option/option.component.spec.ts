/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { forwardRef } from '@angular/core';

import { SkyOptionComponent } from './option.component';
import { AbstractSkyDataList } from 'app/components/core/data-list';
import { AbstractSkyDataItem } from 'app/components/core/data-item';

type TestObject = {};

abstract class MockAbstractdataList {
    isSelected() {
        return false;
    }
}

describe('SkyOptionComponent', () => {
    let component: SkyOptionComponent<TestObject>;
    let fixture: ComponentFixture<SkyOptionComponent<TestObject>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyOptionComponent],
            providers: [
                { provide: AbstractSkyDataList, useClass: MockAbstractdataList },
                { provide: AbstractSkyDataItem, useExisting: forwardRef(() => SkyOptionComponent) },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent<SkyOptionComponent<TestObject>>(SkyOptionComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('initial selected value should be false', () => {
        expect(component.selected).toBeFalse();
    });

    it('initial active value should be false', () => {
        expect(component.isActive).toBeFalse();
    });

    it('onClick() method should call on click', () => {
        spyOn(component, 'onClick');
        let event = new Event('click');
        fixture.debugElement.nativeElement.dispatchEvent(event);
        expect(component.onClick).toHaveBeenCalled();
    });
});
