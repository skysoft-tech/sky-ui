import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyFormErrorComponent } from './form-error.component';

describe('FormErrorComponent', () => {
    let component: SkyFormErrorComponent;
    let fixture: ComponentFixture<SkyFormErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyFormErrorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyFormErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
