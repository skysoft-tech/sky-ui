import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyValuePickerComponent } from './value-picker.component';

describe('ValuePickerComponent', () => {
    let component: SkyValuePickerComponent<unknown>;
    let fixture: ComponentFixture<SkyValuePickerComponent<unknown>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyValuePickerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyValuePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
