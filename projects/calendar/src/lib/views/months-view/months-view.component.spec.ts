import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyMonthsViewComponent } from './months-view.component';

describe('MonthsViewComponent', () => {
    let component: SkyMonthsViewComponent;
    let fixture: ComponentFixture<SkyMonthsViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyMonthsViewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyMonthsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
