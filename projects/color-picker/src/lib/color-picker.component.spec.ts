import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
    let component: SkyColorPickerComponent;
    let fixture: ComponentFixture<SkyColorPickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyColorPickerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyColorPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
