import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyGradientViewComponent } from './gradient-view.component';

describe('GradientViewComponent', () => {
    let component: SkyGradientViewComponent;
    let fixture: ComponentFixture<SkyGradientViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyGradientViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyGradientViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
