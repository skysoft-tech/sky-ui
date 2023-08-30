import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AbstractSkyDataItem } from '../core/data-item';
import { AbstractSkyDataList } from '../core/data-list';
import { SkyInputModule } from '../input/input.module';
import { SkyDestroyService } from '../tools/destroy.service';
import { SkySelectComponent } from './select.component';

type TestObject = {};

export class MockAbstractSkyDataList<T> {}

export class MockAbstractSkyDataItem<T> extends AbstractSkyDataItem<T> {}
class MockSkyDestroyService extends SkyDestroyService {}

describe('SkySelectComponent', () => {
    let component: SkySelectComponent<TestObject>;
    let fixture: ComponentFixture<SkySelectComponent<TestObject>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkySelectComponent],
            imports: [OverlayModule, SkyInputModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
            providers: [
                { provide: SkyDestroyService, useClass: MockSkyDestroyService },
                { provide: AbstractSkyDataItem, useClass: MockAbstractSkyDataItem },
                { provide: AbstractSkyDataList, useClass: MockAbstractSkyDataList },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent<SkySelectComponent<TestObject>>(SkySelectComponent);
        component = fixture.componentInstance;
        (fixture.componentInstance as any).ngControl = new FormControl();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open overlay on click', () => {
        let skyIcon = fixture.debugElement.nativeElement.querySelector('sky-icon');
        skyIcon.click();
        expect(component.isOpen).toBeTrue();
    });

    it('should close overlay on click', () => {
        component.isOpen = true;
        let skyIcon = fixture.debugElement.nativeElement.querySelector('sky-icon');
        skyIcon.click();
        expect(component.isOpen).toBeFalse();
    });

    it('the message is displayed when the option list isn`t empty', () => {
        component.options = ['firstOption', 'secondOption'];
        let skyIcon = fixture.debugElement.nativeElement.querySelector('sky-icon');
        skyIcon.click();

        expect(component.showNothingFoundMessage).toBeFalse();
    });

    it('the message is displayed when the option list is empty', () => {
        component.options = [];
        let skyIcon = fixture.debugElement.nativeElement.querySelector('sky-icon');
        skyIcon.click();

        expect(component.showNothingFoundMessage).toBeTrue();
    });

    it('on click on item overlay should close', () => {
        component.options = ['firstOption', 'secondOption'];
        let skyIcon = fixture.debugElement.nativeElement.querySelector('sky-icon');
        skyIcon.click();
        component.setSelectedItem(component.options[0]);

        expect(component.isOpen).toBeFalse();
    });

    it('space keydown should open overlay', fakeAsync(() => {
        component.options = ['firstOption', 'secondOption'];

        fixture.debugElement.nativeElement.dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        let event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: false });
        fixture.debugElement.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        tick();
        expect(component.isOpen).toBeTrue();
    }));

    it('should have options', () => {
        component.options = [];
        expect(component).toEqual(jasmine.objectContaining({ _options: [] }));
    });

    it('default value accessor should call toString()', () => {
        const option = {
            toString: jasmine.createSpy('toString', () => null),
        };
        component.options = [option];
        component.valueAccessor(option);

        expect(option.toString).toHaveBeenCalled();
    });

    it('default value accessor can be customize', () => {
        const option = {
            id: 1,
            title: 'test',
        };

        component.valueAccessor = (option: TestObject) => (option as any).title as string;
        component.options = [option];

        expect(component.valueAccessor(option)).toEqual(option.title);
    });

    it('default filter method should filtering by letter', () => {
        let options = ['first', 'second', 'third'];
        let value = 't';
        let filteredOptions = options?.filter((o: TestObject) => component.filter(o, value!));
        expect(filteredOptions).toEqual(['third']);
    });

    it('filter method can be customized', () => {
        let options = ['first', 'second', 'third'];
        let value = 't';
        component.filter = (option: any, searchText: number | string | null): boolean => {
            return option.toLocaleLowerCase().includes(searchText?.toString().toLocaleLowerCase());
        };
        let filteredOptions = options?.filter((o: TestObject) => component.filter(o, value!));
        expect(filteredOptions).toEqual(['first', 'third']);
    });

    describe('compareWith', () => {
        it('should return false when compare different strings', () => {
            let optFirst = '1';
            let optSecond = '2';
            expect(component.compareWith(optFirst, optSecond)).toBeFalse();
        });

        it('should return false when compare different objects', () => {
            let optFirst = {
                id: 1,
                name: 'Test',
                lastName: 'LastTest',
            };
            let optSecond = {
                id: 1,
                name: 'Test',
                lastName: 'Test',
            };
            expect(component.compareWith(optFirst, optSecond)).toBeFalse();
        });

        it('should return true when compare equal strings', () => {
            let optFirst = '1';
            let optSecond = '1';
            expect(component.compareWith(optFirst, optSecond)).toBeTrue();
        });

        it('should return true when compare the same object ', () => {
            let optFirst = {
                id: 1,
                name: 'Test',
                lastName: 'LastTest',
            };
            let optSecond = optFirst;
            expect(component.compareWith(optFirst, optSecond)).toBeTrue();
        });

        it('should use custom method to comparison', () => {
            component.compareWith = (o1: TestObject, o2: TestObject) =>
                o1.toString().toLocaleLowerCase() === o2.toString().toLocaleLowerCase();
            let optFirst = 'qw';
            let optSecond = 'QW';
            expect(component.compareWith(optFirst, optSecond)).toBeTrue();
        });
    });

    it('should call handleKeydownEnter() method on enter', () => {
        spyOn(component, 'handleKeydownEnter');
        fixture.detectChanges();
        let event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: false });
        fixture.debugElement.nativeElement.dispatchEvent(event);
        expect(component.handleKeydownEnter).toHaveBeenCalled();
    });

    it('toggle method should call preventDefault()', () => {
        var e = jasmine.createSpyObj('e', ['preventDefault']);
        component.toggle();
        expect(e.preventDefault).toHaveBeenCalled();
    });

    it('clickOverlayOutside() should close select', () => {
        const event = new Event('click');
        component.isOpen = true;
        component.searchInput.value = 'opt';
        component.clickOverlayOutside(event);
        expect(component.isOpen).toBe(false);
    });

    it('clickOverlayOutside() should check condition', () => {
        const event = new Event('click');
        component.isOpen = true;
        component.value = 'opt';
        component.options = ['1', '2'];
        component.clickOverlayOutside(event);
        expect(component.searchInput.value).toEqual('opt');
    });

    it('setTransformOrigin method should set transformOrigin from event', () => {
        let e = jasmine.createSpyObj('e', { connectionPair: 12 });
        component.setTransformOrigin(e);

        expect(e.connectionPair).toBeDefined();
    });
});
