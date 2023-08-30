import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyColorInputComponent } from './color-input.component';

describe('ColorInputComponent', () => {
    let component: SkyColorInputComponent;
    let fixture: ComponentFixture<SkyColorInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyColorInputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyColorInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
