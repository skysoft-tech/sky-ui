import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkySlideToggleComponent } from './slide-toggle.component';

describe('SkySlideToggleComponent', () => {
    let component: SkySlideToggleComponent;
    let fixture: ComponentFixture<SkySlideToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkySlideToggleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkySlideToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
