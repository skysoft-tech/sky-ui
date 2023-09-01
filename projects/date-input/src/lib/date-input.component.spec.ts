import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyDateInputComponent } from './date-input.component';

describe('DatePickerComponent', () => {
    let component: SkyDateInputComponent;
    let fixture: ComponentFixture<SkyDateInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyDateInputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyDateInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
