import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyNotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
    let component: SkyNotificationComponent;
    let fixture: ComponentFixture<SkyNotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyNotificationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyNotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
