import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyYearsViewComponent } from './years-view.component';

describe('SkyYearsViewComponent', () => {
    let component: SkyYearsViewComponent;
    let fixture: ComponentFixture<SkyYearsViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyYearsViewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyYearsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
