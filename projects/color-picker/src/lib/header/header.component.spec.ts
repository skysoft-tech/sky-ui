import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyColorPickerHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: SkyColorPickerHeaderComponent;
    let fixture: ComponentFixture<SkyColorPickerHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyColorPickerHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyColorPickerHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
