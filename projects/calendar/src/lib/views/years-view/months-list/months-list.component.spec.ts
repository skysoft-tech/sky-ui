import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyMonthsListComponent } from './months-list.component';

describe('MonthsListComponent', () => {
    let component: SkyMonthsListComponent;
    let fixture: ComponentFixture<SkyMonthsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyMonthsListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyMonthsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
