import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyCalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
    let component: SkyCalendarComponent;
    let fixture: ComponentFixture<SkyCalendarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyCalendarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyCalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
