import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyDrawerContentComponent } from './content.component';

describe('ContentComponent', () => {
    let component: SkyDrawerContentComponent;
    let fixture: ComponentFixture<SkyDrawerContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyDrawerContentComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyDrawerContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
