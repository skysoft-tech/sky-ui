import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyIconComponent } from './icon.component';

describe('SkyIconComponent', () => {
    let component: SkyIconComponent;
    let fixture: ComponentFixture<SkyIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyIconComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
