import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyDrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
    let component: SkyDrawerComponent;
    let fixture: ComponentFixture<SkyDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyDrawerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
