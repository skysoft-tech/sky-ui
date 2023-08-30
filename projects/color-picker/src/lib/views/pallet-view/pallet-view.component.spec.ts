import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyPalletViewComponent } from './pallet-view.component';

describe('PalletViewComponent', () => {
    let component: SkyPalletViewComponent;
    let fixture: ComponentFixture<SkyPalletViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyPalletViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyPalletViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
