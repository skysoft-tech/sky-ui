import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyPrimitiveInputComponent } from './primitive-input.component';

describe('PrimitiveInputComponent', () => {
    let component: SkyPrimitiveInputComponent;
    let fixture: ComponentFixture<SkyPrimitiveInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyPrimitiveInputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyPrimitiveInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
