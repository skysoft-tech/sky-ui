import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyToastComponent } from './toast.component';

describe('SkyToastComponent', () => {
    let component: SkyToastComponent;
    let fixture: ComponentFixture<SkyToastComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyToastComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyToastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
