import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyCalendarHeaderComponent } from './calendar-header.component';

describe('CalendarHeaderComponent', () => {
    let component: SkyCalendarHeaderComponent;
    let fixture: ComponentFixture<SkyCalendarHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyCalendarHeaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyCalendarHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
