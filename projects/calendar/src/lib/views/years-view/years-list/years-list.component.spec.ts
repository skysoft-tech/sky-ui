import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyYearsListComponent } from './years-list.component';

describe('YearsListComponent', () => {
    let component: SkyYearsListComponent;
    let fixture: ComponentFixture<SkyYearsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyYearsListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkyYearsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
