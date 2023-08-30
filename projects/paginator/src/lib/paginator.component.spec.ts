import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyPaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
    let component: SkyPaginatorComponent;
    let fixture: ComponentFixture<SkyPaginatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SkyPaginatorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SkyPaginatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
